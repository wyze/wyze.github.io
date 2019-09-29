let component = ReasonReact.statelessComponent("Social");

let styles =
  Css.(
    Styles.[
      flexBasis @@ pct(50.),
      flexGrow(0),
      flexShrink(0),
      margin2(~v=em(0.5), ~h=zero),
      paddingTop @@ em(0.4),
      media(breakpoint(Small), [flexBasis @@ pct(25.), margin(zero)]),
    ]
  );

let make = (~profiles, _) => {
  ...component,
  render: _ =>
    <Box wrap=true title="Me Around The Internet">
      <Pixel location="social" />
      <IconList icons=profiles styles />
    </Box>,
};
