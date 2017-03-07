'use strict';

import angular from 'angular';
import {
  UtilService
} from './util.service';

export default angular.module('gamedb2App.util', [])
  .factory('Util', UtilService)
  .name;
