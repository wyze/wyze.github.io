open Jest;
open JestDom;
open ReactTestingLibrary;

let contributions = GitHubList.[
  {
    description: "A repo.",
    name: "a/repo",
    stars: 1,
    url: "//site.local/a/repo"
  }
];

let projects = GitHubList.[
  {
    description: "Another repo.",
    name: "another/repo",
    stars: 1000,
    url: "//site.local/another/repo"
  }
];

describe("index page", () => {
  test("renders", () =>
    <Index contributions projects resume="/resume.pdf" />
    |> render
    |> container
    |> expect
    |> toBeInTheDocument
  );

  test("renders with graphql data", () => {
    module Default = {
      let props = {
        "data": {
          "githubGraphQl": {
            "viewer": {
              "contributions1": {
                "nodes": [|
                  {
                    "repository": {
                      "isPrivate": false,
                      "shortDescriptionHTML": "Description 1.",
                      "nameWithOwner": "repo/1",
                      "owner": {
                        "login": "repo"
                      },
                      "stargazers": {
                        "totalCount": 1
                      },
                      "url": "//site.local/repo/1"
                    }
                  },
                  {
                    "repository": {
                      "isPrivate": true,
                      "shortDescriptionHTML": "Description 2.",
                      "nameWithOwner": "repo/2",
                      "owner": {
                        "login": "repo"
                      },
                      "stargazers": {
                        "totalCount": 2
                      },
                      "url": "//site.local/repo/2"
                    }
                  },
                  {
                    "repository": {
                      "isPrivate": false,
                      "shortDescriptionHTML": "Description 6.",
                      "nameWithOwner": "repo/6",
                      "owner": {
                        "login": "repo"
                      },
                      "stargazers": {
                        "totalCount": 6
                      },
                      "url": "//site.local/repo/6"
                    }
                  }
                |]
              },
              "contributions2": {
                "nodes": [|
                  {
                    "repository": {
                      "isPrivate": false,
                      "shortDescriptionHTML": "Description 1.",
                      "nameWithOwner": "repo/1",
                      "owner": {
                        "login": "repo"
                      },
                      "stargazers": {
                        "totalCount": 1
                      },
                      "url": "//site.local/repo/1"
                    }
                  },
                  {
                    "repository": {
                      "isPrivate": false,
                      "shortDescriptionHTML": "Description for wyze.",
                      "nameWithOwner": "wyze/3",
                      "owner": {
                        "login": "wyze"
                      },
                      "stargazers": {
                        "totalCount": 3
                      },
                      "url": "//site.local/wyze/3"
                    }
                  },
                |]
              },
              "projects": {
                "nodes": [|
                  {
                    "isPrivate": false,
                    "shortDescriptionHTML": "Description repo4.",
                    "name": "repo4",
                    "stargazers": {
                      "totalCount": 4
                    },
                    "url": "//site.local/wyze/repo4"
                  },
                  {
                    "isPrivate": true,
                    "shortDescriptionHTML": "Description repo5.",
                    "name": "repo5",
                    "stargazers": {
                      "totalCount": 5
                    },
                    "url": "//site.local/wyze/repo5"
                  }
                |]
              }
            }
          },
          "resume": {
            "publicURL": "/resume.pdf"
          },
        },
      };

      let make = (_) =>
        ReasonReact.wrapJsForReason(
          ~reactClass=Index.default,
          ~props,
          [||]
        );
    };

    <Default />
    |> render
    |> container
    |> expect
    |> toBeInTheDocument;
  });
});
