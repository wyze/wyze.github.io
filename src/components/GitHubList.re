[@bs.deriving jsConverter]
type github = {
  description: string,
  languages: array(Languages.language),
  name: string,
  stars: int,
  url: string,
};

let component = ReasonReact.statelessComponent("GitHubList");

let childStyle = Css.(Styles.([
  display(`grid),
  gridGap @@ px(10),
  gridTemplateColumns([fr(1.)]),
  media(breakpoint(Large), [
    unsafe("gridTemplateColumns", "repeat(3, 1fr)"),
  ]),
  media(breakpoint(Small), [
    unsafe("gridTemplateColumns", "repeat(2, 1fr)"),
  ]),
]));

let make = ( ~content, ~title, _ ) => {
  ...component,
  render: (_) =>
    <Box wrap=true childStyle title>
      (
        content
          |> List.map(({ description, languages, name, stars, url }) =>
              <GitHubItem key=name description languages name stars url />
            )
          |> Array.of_list
      )
    </Box>
};
