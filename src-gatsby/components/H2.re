let component = ReasonReact.statelessComponent("H2");

let styles = Css.([
  fontSize @@ em(1.25),
]);

let make = ( ~className = Css.empty, children ) => {
  ...component,
  render: (_) =>
    <h2 className=Css.style(styles @ className)>
      <Fragment> ...children </Fragment>
    </h2>
};
