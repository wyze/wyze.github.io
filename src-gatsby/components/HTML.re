let component = ReasonReact.statelessComponent("HTML");

let make = ( ~html, _ ) => {
  ...component,
  render: (_) =>
    <span dangerouslySetInnerHTML={{ "__html": html }} />
};
