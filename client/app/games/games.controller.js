'use strict';
const angular = require('angular');

export default class GamesController {
  games = [];
  originalGames = [];

  newGame = {
    name: '',
    platform: '',
    genre: '',
    postedBy: ''
  };

  /*@ngInject*/
  constructor($http, $scope, socket, Auth) {
    this.$http = $http;
    this.$scope = $scope;
    this.socket = socket;
    this.auth = Auth;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('games');
    });
  }

  $onInit() {
    this.updateView();
  }

  addGame() {
    if(this.newGame) {
      let currUser = this.auth.getCurrentUserSync();
      this.$http.post('/api/games', {
        name: this.newGame.name,
        platform: this.newGame.platform,
        genre: this.newGame.genre,
        postedBy: currUser._id
      }).then(response => {
        console.log(response);
        this.newGame.name = '';
        this.newGame.platform = '';
        this.newGame.genre = '';
        this.newGame.postedBy = '';
        this.updateView();
      });
    }
  }

  saveGame(index) {
    this.$http.put('/api/games/' + this.games[index]._id, this.games[index])
    .then(response => {
      console.log(response);
      this.games[index].edit = false;
      this.updateView();
    });
  }

  deleteGame(game) {
    if(game) {
      this.$http.delete(`/api/games/${game._id}`).then(response => {
        console.log(response);
        this.updateView();
      });
    }
  }

  toggleEdit($index) {
    this.games[$index].edit = !this.games[$index].edit;
  }

  resetGames() {
    this.games = this.originalGames;
    this.filter = 'none';
  }

  filterByGenre(genre) {
    this.resetGames();
    this.games = this.games.filter(function(game) {
      return game.genre === genre;
    });
    this.filter = 'Genre: ' + genre;
  }

  filterByPlatform(platform) {
    this.resetGames();
    this.games = this.games.filter(function(game) {
      return game.platform === platform;
    });
    this.filter = 'Platform: ' + platform;
  }

  updateView() {
    let endpoint = '';

    if(this.auth.isAdminSync()) {
      endpoint = '/api/games';
    } else {
      endpoint = '/api/users/me/games';
    }

    this.$http.get(endpoint)
      .then(response => {
        this.games = response.data;
        this.originalGames = response.data;
        this.socket.syncUpdates('games', this.games);
      });
  }
}
