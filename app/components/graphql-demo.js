import Component from "@ember/component";
import { createClient, createRequest } from "urql/core";
import gql from "graphql-tag";
import { pipe, subscribe } from "wonka";
import { tracked } from '@glimmer/tracking';

export default class GraphqlDemoComponent extends Component {
  didInsertElement() {
    this.fetchData();
  }
  fetchData() {
    const client = createClient({
      url: "https://graphbrainz.herokuapp.com/graphql"
    });

    const query = gql`
      query SearchArtist($search: String!) {
        search {
          artists(query: $search, first: 1) {
            edges {
              node {
                name
                country
                releases(first: 10) {
                  edges {
                    node {
                      title
                      date
                      media {
                        format
                        trackCount
                        tracks {
                          title
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const request = createRequest(query, { search: "Courtney Barnett" });

    pipe(
      client.executeQuery(request),
      subscribe(({ data, error }) => {
        if (error) {
          this.result = JSON.stringify(error);
        } else {
          this.result = JSON.stringify(data);
        }
      })
    );
  }

  @tracked
  result = '';
}
