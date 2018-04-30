let component = ReasonReact.statelessComponent("H1");

let styles = Css.([
  fontSize @@ em(1.4)
]);

let make = ( ~className = Css.empty, children ) => {
  ...component,
  render: (_) =>
    <h1 className=Css.style(styles @ className)>
      <Fragment> ...children </Fragment>
    </h1>
};
