let component = ReasonReact.statelessComponent("Title");

let className = Css.(Styles.([
  boxShadow(~y=px(2), ~blur=px(2), ~spread=px(-2), makeRGBA(0.25)),
  color @@ makeRGBA(0.75),
  fontWeight(300),
  marginBottom @@ em(0.5),
  paddingBottom @@ em(0.25),
]));

let make = ( ~title, _ ) => {
  ...component,
  render: (_) =>
    <H1 className>
      <Text text=title />
    </H1>
};
