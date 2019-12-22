import Component from "@ember/component";
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import searchartist from 'my-app/queries/searchartist';

export default class GraphqlDemoComponent extends Component {
  @service
  apollo;

  didInsertElement() {
    this.fetchData();
  }

  fetchData() {
    this.apollo.query({ query: searchartist, variables: { search: "Courtney Barnett" } }).then(graphqlResult => {
      this.result = JSON.stringify(graphqlResult);
    })
  }

  @tracked
  result = '';
}
