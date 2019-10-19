import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | threejs', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:threejs');
    assert.ok(route);
  });
});
