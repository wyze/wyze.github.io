let component = ReasonReact.statelessComponent("Text");

let make = ( ~text, _ ) => {
  ...component,
  render: (_) =>
    ReasonReact.string(text)
};
