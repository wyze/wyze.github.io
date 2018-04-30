let component = ReasonReact.statelessComponent("Section");

let className = Css.([
  textAlign(center),
]);

let make = ( ~center = true, ~styles = Css.empty, children ) => {
  ...component,
  render: (_) =>
    <div className=Css.style((center ? className : Css.empty) @ styles)>
      <Fragment> ...children </Fragment>
    </div>
};
