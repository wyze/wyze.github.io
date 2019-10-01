let component = ReasonReact.statelessComponent("CoreTeam");

let styles =
  Css.(
    Styles.[
      paddingTop @@ em(0.4),
      width @@ pct(100.),
      selector("& + &", [paddingTop @@ em(1.)]),
      media(
        breakpoint(Small),
        [width @@ pct(50.), selector("& + &", [paddingTop @@ em(1.)])],
      ),
    ]
  );

let make = (~teams, _) => {
  ...component,
  render: _ =>
    <Box wrap=true title="Core Team Member">
      <Pixel location="core-team" />
      <IconList icons=teams styles />
    </Box>,
};
