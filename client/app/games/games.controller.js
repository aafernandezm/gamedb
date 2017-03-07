'use strict';
const angular = require('angular');

export default class GamesController {
  games = [];
  originalGames = [];
  newGame = {
    name: '',
    platform: '',
    genre: ''
  };

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('games');
    });
  }

  $onInit() {
    this.$http.get('/api/games')
      .then(response => {
        this.games = response.data;
        this.originalGames = response.data;
        this.socket.syncUpdates('games', this.games);
      });
  }

  addGame() {
    if(this.newGame) {
      this.$http.post('/api/games', {
        name: this.newGame.name,
        platform: this.newGame.platform,
        genre: this.newGame.genre
      });
      this.newGame = '';
    }
  }

  saveGame(index) {
    this.$http.put('/api/games/' + this.games[index]._id, this.games[index]).success(function () {
      this.games[index].edit = false;
    })
    .error(function(err) {
      alert('Error! Something went wrong');
    });
  }

  deleteGame(game) {
    this.$http.delete(`/api/games/${game._id}`);
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

}
