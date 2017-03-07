'use strict';

import angular from 'angular';
import routes from './games.routes';
import GamesController from './games.controller';

export default angular.module('gamedb2App.games', ['gamedb2App.auth', 'ui.router'])
  .config(routes)
  .controller('GamesController', GamesController)
  .name;
