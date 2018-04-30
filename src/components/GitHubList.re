[@bs.deriving jsConverter]
type github = {
  description: string,
  name: string,
  stars: int,
  url: string,
};

let component = ReasonReact.statelessComponent("GitHubList");

let childStyle = Css.(Styles.([
  display(`grid),
  /* gridTemplateColumns(Array.(make(3, `fr(1.)) |> to_list)) */
  gridGap @@ px(10),
  unsafe("gridTemplateColumns", "repeat(2, minmax(50%, 1fr))"),
  media(breakpoint(Small), [
    unsafe("gridTemplateColumns", "repeat(3, minmax(33%, 1fr))")
  ]),
]));

let make = ( ~content, ~title, _ ) => {
  ...component,
  render: (_) =>
    <Box wrap=true childStyle title>
      (
        content
          |> List.map(({ description, name, stars, url }) =>
              <GitHubItem key=name description name stars url />
            )
          |> Array.of_list
      )
    </Box>
};
