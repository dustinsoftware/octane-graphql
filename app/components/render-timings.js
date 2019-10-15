import Component from '@ember/component';
import { set, computed } from '@ember/object';

export default class RenderTimingsComponent extends Component {
  didInsertElement() {
    if ('performance' in window) {
      set(this, 'timings', window.performance.getEntries());
    }
  }

  @computed('timings')
  get renderedTimings() {
    return JSON.stringify(this.timings, null, 2);
  }

  timings = '';
}
