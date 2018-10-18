type numberFormat;

[@bs.new] external numberFormat : string => numberFormat = "Intl.NumberFormat";
[@bs.send] external format : (numberFormat, int) => string = "format";

let component = ReasonReact.statelessComponent("GitHubItem");

let shadowColor = Styles.makeRGBA(0.175);

let styles = Css.(Styles.({
  "box": [
    backgroundColor @@ hsl(200, 33, 96),
    borderRadius @@ px(5),
    boxShadows([
      boxShadow(~y=px(2), ~blur=px(3), shadowColor),
      boxShadow(~spread=px(1), shadowColor)
    ]),
    height @@ pct(100.),
    minHeight @@ em(9.),
    padding @@ em(1.0),
  ],
  "desc": [
    fontSize @@ em(0.95),
    overflow(`hidden),
    paddingTop @@ em(0.25),
    textOverflow(`ellipsis),
    unsafe("wordBreak", "break-word"),
  ],
  "link": [
    fontSize @@ em(1.05),
    unsafe("wordBreak", "break-word"),
  ],
  "star": style([
    fontSize @@ em(0.95),
    fontStyle(italic),
    ...level
  ]),
  "title": [
    alignItems(baseline),
    ...level,
  ]
}));

let make = ( ~description, ~name, ~stars, ~url, _ ) => {
  ...component,
  render: (_) =>
    <Section center=false styles=styles##box>
      <Section center=false styles=Styles.level>
        <Link className=styles##link href=url>
          <Text text=name />
        </Link>
        <div className=styles##star>
          <Star />
          <Text text=numberFormat("en-US")->format(stars) />
        </div>
      </Section>
      <Section center=false styles=styles##desc>
        <HTML html=description />
      </Section>
    </Section>
};
