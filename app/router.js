import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('threejs');
  this.route('not-found', { path: '/*path' });
  this.route('grid-demo');
});
