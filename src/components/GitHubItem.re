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
    display(`flex),
    flexDirection(`column),
    height @@ pct(100.),
    minHeight @@ em(9.),
    overflow(`hidden),
  ],
  "desc": [
    fontSize @@ em(0.95),
    overflow(`hidden),
    padding3(~top=em(0.25), ~h=em(0.5), ~bottom=`zero),
    textOverflow(`ellipsis),
    unsafe("wordBreak", "break-word"),
  ],
  "languages": [
    display(`flex),
    flexBasis @@ px(12),
    flexGrow(0),
    flexShrink(0),
    marginTop(`auto),
    width @@ pct(100.),
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
    padding3(~top=em(0.5), ~h=em(0.5), ~bottom=`zero),
    paddingBottom(`zero),
    ...level,
  ]
}));

let make = ( ~description, ~languages, ~name, ~stars, ~url, _ ) => {
  ...component,
  render: (_) =>
    <Section center=false styles=styles##box>
      <Section center=false styles=styles##title>
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
      <Languages languages />
    </Section>
};
