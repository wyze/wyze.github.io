[@bs.deriving jsConverter]
type language = {
  colorHex: string,
  name: string,
  percent: float,
};

type numberFormat;
[@bs.new] external numberFormat : (string, [@bs.as {json|{ "style": "percent", "minimumFractionDigits": 1 }|json}] _) => numberFormat = "Intl.NumberFormat";
[@bs.send] external format : (numberFormat, float) => string = "format";

let component = ReasonReact.statelessComponent("Languages");

let styles = Css.(Styles.({
  "bar": style([
    display(`flex),
    flexBasis @@ px(12),
    flexGrow(0),
    flexShrink(0),
    width @@ pct(100.1),
  ]),
  "bold": style([ fontWeight(600) ]),
  "circle": [
    borderRadius @@ pct(100.),
    height @@ px(12),
    width @@ px(12),
  ],
  "container": style([
    display(`flex),
    flexDirection(`column),
    marginTop(`auto),
    width @@ pct(100.),
  ]),
  "item": style([
    alignItems(`center),
    display(`grid),
    gridGap @@ px(6),
    gridTemplateColumns([`auto, `auto, `auto]),
    marginRight @@ px(12),
  ]),
  "list": style([
    display(`none),
    fontSize @@ em(0.75),
    flexWrap(`wrap),
    padding3(~top=`zero, ~h=em(0.5), ~bottom=em(0.25)),
    media(breakpoint(Small), [
      display(`flex),
    ]),
  ]),
}));

let make = ( ~languages, _ ) => {
  ...component,
  render: (_) => {
    let (bullets, bars) = languages |> Array.fold_left(((x, y), ({ colorHex, name, percent })) => {
      let coloredBackground = Css.(backgroundColor @@ hex(colorHex));
      let formatted = numberFormat("en-US")->format(percent /. 100.);
      let unformatted = formatted |> Js.String.replace("%", "") |> float_of_string;
      let bullet = (
        <div className=styles##item>
            <div className=Css.(style([coloredBackground, ...styles##circle])) />
            <div className=styles##bold> {ReasonReact.string(name)} </div>
            <div> {ReasonReact.string(formatted)} </div>
          </div>
      );
      let bar = <span className=Css.(style([coloredBackground, width @@ pct(unformatted)])) title=name />;

      (Array.append(x, [|bullet|]), Array.append(y, [|bar|]));
    }, ([||], [||]));

    <div className=styles##container>
      <div className=styles##list>
        ...bullets
      </div>
      <div className=styles##bar>
        ...bars
      </div>
    </div>
  }
};
