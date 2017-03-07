'use strict';

describe('Controller: GamesController', function() {
  // load the controller's module
  beforeEach(module('gamedb2App.games'));

  var GamesController;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    GamesController = $controller('GamesController', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
