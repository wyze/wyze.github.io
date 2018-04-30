let component = ReasonReact.statelessComponent("Strong");

let className = Css.(
  style([
    fontWeight(400),
  ])
);

let make = ( ~text, _ ) => {
  ...component,
  render: (_) =>
    <strong className>
      <Text text />
    </strong>
};
