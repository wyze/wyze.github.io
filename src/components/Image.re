let component = ReasonReact.statelessComponent("Image");

let styles = Css.({
  "maxHeight": [
    maxHeight @@ px(100),
  ],
  "round": [
    borderRadius @@ pct(50.),
  ]
});

let make = ( ~alt, ~circle = false, ~src, ~width = "100", _ ) => {
  ...component,
  render: (_) =>
    <img
      className=Css.(style(styles##maxHeight @ (circle ? styles##round : empty)))
      alt
      height="100"
      src
      width
    />
};
