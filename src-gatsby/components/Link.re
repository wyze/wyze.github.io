let component = ReasonReact.statelessComponent("Link");

let styles = Css.([
  color @@ hex("8b008b"),
  textDecoration(none),
  transitionDuration(500),
  hover([
    color @@ hex("8b0000"),
  ]),
]);

let make = ( ~className = Css.empty, ~href, ~title = "", children ) => {
  ...component,
  render: (_) =>
    <a
      className=Css.style(styles @ className)
      href
      rel="noopener noreferrer"
      target="_blank"
      title
    >
      <Fragment> ...children </Fragment>
    </a>
};
