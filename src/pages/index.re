[%%raw "import { graphql } from 'gatsby';"];

let component = ReasonReact.statelessComponent("index");

let jobs = Employment.([
  { name: "Juristat", start: "April 2017", end_: None },
  { name: "Monsanto", start: "September 2015", end_: Some("April 2017") },
  { name: "Safety National", start: "December 2013", end_: Some("September 2015") },
  { name: "SteadyRain", start: "February 2012", end_: Some("December 2013") },
  { name: "CSC", start: "April 2011", end_: Some("February 2012") },
  { name: "Panera Bread", start: "March 2007", end_: Some("March 2011") },
]);

let profiles = IconList.([
  { href: "//github.com/wyze", image: GitHub, title: "GitHub" },
  { href: "//twitter.com/wyze", image: Twitter, title: "Twitter" },
  { href: "//linkedin.com/in/neilkistner", image: LinkedIn, title: "LinkedIn" },
  {
    href: "//stackoverflow.com/users/1507905/neil-kistner",
    image: StackOverflow,
    title: "StackOverflow",
  },
]);

let teams = IconList.([
  { href: "//yarnpkg.com", image: Yarn, title: "Yarn" },
  { href: "//tessel.io", image: Tessel, title: "Tessel" },
]);

let className = Css.(Styles.(
  style([
    padding2(~v=em(2.), ~h=em(1.)),
    media(breakpoint(Large), [
      padding2(~v=em(4.), ~h=em(2.))
    ]),
  ])
));

let make = ( ~contributions, ~projects, ~resume, _ ) => {
  ...component,
  render: (_) =>
    <main className>
      <ReactHelmet title="Neil Kistner | St. Louis Software Engineer">
        <html lang="en" />
        <meta name="description" content="Neil Kistner is a self taught software engineer focused mainly on web applications. He loves open source and contributes to projects like Yarn and Tessel." />
      </ReactHelmet>
      <Introduction />
      <Social profiles />
      <Employment jobs />
      <CoreTeam teams />
      <GitHubList content=contributions title="Contributions Made" />
      <GitHubList content=projects title="Open Source Projects" />
      <Conclusion resume />
    </main>
};

[%%raw {|export const query = graphql`
  query GitHubAndPdfQuery {
    resume: file(extension: { eq: "pdf" }) {
      publicURL
    }
    githubGraphQl {
      viewer {
        projects {
          nodes {
            isArchived
            languages {
              edges {
                node {
                  color
                  name
                }
                size
              }
              totalSize
            }
            name
            nameWithOwner
            shortDescriptionHTML
            stargazers {
              totalCount
            }
            url
          }
        }
        contributions1 {
          nodes {
            repository {
              isArchived
              isPrivate
              name
              nameWithOwner
              owner {
                login
              }
              languages {
                edges {
                  node {
                    color
                    name
                  }
                  size
                }
                totalSize
              }
              shortDescriptionHTML
              stargazers {
                totalCount
              }
              url
            }
          }
        }
        contributions2 {
          nodes {
            repository {
              isArchived
              isPrivate
              name
              nameWithOwner
              owner {
                login
              }
              languages {
                edges {
                  node {
                    color
                    name
                  }
                  size
                }
                totalSize
              }
              shortDescriptionHTML
              stargazers {
                totalCount
              }
              url
            }
          }
        }
        contributions3 {
          nodes {
            repository {
              isArchived
              isPrivate
              name
              nameWithOwner
              owner {
                login
              }
              languages {
                edges {
                  node {
                    color
                    name
                  }
                  size
                }
                totalSize
              }
              shortDescriptionHTML
              stargazers {
                totalCount
              }
              url
            }
          }
        }
      }
    }
  }
`|}];

let mapLang = (totalSize, language) => {
  "colorHex": switch(Js.Nullable.toOption(language##node##color)) {
  | Some(color) => color
  | None => "#ccc"
  } |> Js.String.sliceToEnd(~from=1),
  "name": language##node##name,
  "percent": (float_of_int(language##size) /. float_of_int(totalSize)) *. 100.,
} |> Languages.languageFromJs;

let transformLang = languages => Js.Array.(Languages.(
  map(mapLang(languages##totalSize), languages##edges)
  |> sortInPlaceWith(( left, right ) => int_of_float(right.percent -. left.percent))
  |> filter(({ percent }) => Js.Float.toFixedWithPrecision(~digits=1, percent) != "0.0")
));

let default = ReasonReact.wrapReasonForJs(
  ~component,
  jsProps => {
    let resume = jsProps##data##resume##publicURL;
    let viewer = jsProps##data##githubGraphQl##viewer;
    let projects = viewer##projects##nodes
      |> Js.Array.filter(p => p##isArchived == false)
      |> Js.Array.map(p =>
        {
          "description": p##shortDescriptionHTML,
          "languages": transformLang(p##languages),
          "name": Js.String.startsWith("wyze/", p##nameWithOwner) ? p##name : p##nameWithOwner,
          "stars": p##stargazers##totalCount,
          "url": p##url
        } |> GitHubList.githubFromJs
      )
      |> Js.Array.slice(~start=0, ~end_=20)
      |> Array.to_list;

    let contributions = viewer##contributions1##nodes
      |> Js.Array.concat(viewer##contributions2##nodes)
      |> Js.Array.concat(viewer##contributions3##nodes)
      |> Js.Array.reduce(( lst, c ) => {
        let r = c##repository;
        let o = {
          "description": r##shortDescriptionHTML,
          "languages": transformLang(r##languages),
          "name": r##nameWithOwner,
          "stars": r##stargazers##totalCount,
          "url": r##url
        } |> GitHubList.githubFromJs;

        let existsOrMine = List.mem(o, lst)
          || r##owner##login == "wyze"
          || r##isArchived == true
          || r##isPrivate == true;

        switch existsOrMine {
        | true => lst
        | false => [ o, ...lst ]
        }
      }, [])
      |> List.sort(( left: GitHubList.github, right ) => right.stars - left.stars)
      |> Array.of_list
      |> Js.Array.slice(~start=0, ~end_=20)
      |> Array.to_list;

    make(~contributions, ~projects, ~resume, [||]);
  }
);
