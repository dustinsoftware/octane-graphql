export default function() {
  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    https://www.ember-cli-mirage.com/docs/route-handlers/shorthands
  */

  this.post("https://graphbrainz.herokuapp.com/graphql", () => {
    return {
      data: {
        search: {
          artists: {
            edges: [
              {
                node: {
                  name: "Hi Hi Hi",
                  country: null,
                  releases: {
                    edges: [
                      {
                        node: {
                          title: "2008-08-02: 40 Watt Club, Athens, GA, USA",
                          date: null,
                          media: [
                            {
                              format: "Digital Media",
                              trackCount: 11,
                              tracks: []
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              }
            ]
          }
        }
      }
    };
  });
}
