'use strict';

describe('Component: GamesComponent', function() {
  // load the controller's module
  beforeEach(module('gamedb2App.games'));

  var GamesComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    GamesComponent = $componentController('games', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
