/* module OutboundLink = {
  [@bs.module "gatsby-plugin-google-analytics"] external outboundLink : ReasonReact.reactClass = "OutboundLink";
  let make = ( ~className, ~href, ~rel, ~target, ~title, children ) =>
    ReasonReact.wrapJsForReason(
      ~reactClass=outboundLink,
      ~props={"className": className, "href": href, "rel": rel, "target": target, "title": title},
      children
    );
}; */

let component = ReasonReact.statelessComponent("Link");

let styles = Css.([
  /* color @@ hex("db0a5b"), */
  /* color @@ hex("9f0a42"), */
  color @@ hex("8b008b"),
  textDecoration(none),
  transitionDuration(500),
  hover([
    /* color @@ hex("8a2be2"), */
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
