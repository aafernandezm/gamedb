'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider.state('games', {
    url: '/games',
    template: require('./games.html'),
    controller: 'GamesController',
    controllerAs: 'games',
    authenticate: 'games'});
}
