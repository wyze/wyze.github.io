let component = ReasonReact.statelessComponent("Box");

let shadowColor = Styles.makeRGBA(0.1);
let className = Css.(Styles.(
  style([
    backgroundColor @@ hsl(200, 25, 94),
    borderRadius @@ px(5),
    boxShadows([
      boxShadow(~y=px(2), ~blur=px(3), shadowColor),
      boxShadow(~spread=px(1), shadowColor)
    ]),
    display(block),
    padding @@ em(1.0),
    selector("& + &", [
      marginTop @@ em(2.0),
    ]),
    media(breakpoint(Large), [
      selector("& + &", [
        marginTop @@ em(4.0),
      ]),
    ]),
  ]),
));

let getClassName = ( wrap, childStyle ) => Css.style(
  childStyle @
  (wrap ? [ Css.(flexWrap(`wrap)) ] : Css.empty) @
  [ Css.flexGrow(1) ] @ /* TODO: Revist */
  Styles.level
);

let make = ( ~childStyle=Css.empty, ~id=?, ~title=?, ~wrap=false, children ) => {
  ...component,
  render: (_) => {
    let title = switch title {
    | None => ""
    | Some(title) => title
    };
    let id = switch id {
    | None => Js.String.replaceByRe([%re "/ /g"], "", title)
    | Some(id) => id
    };

    <div className id>
      {String.length(title) != 0 ? <Title title /> : ReasonReact.null}
      <div className=getClassName(wrap, childStyle)>
        <Fragment> ...children </Fragment>
      </div>
    </div>
  }
};
