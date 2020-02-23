let component = ReasonReact.statelessComponent("404");

let styles = Css.(
  Styles.({
    "container": style([
      alignContent(`center),
      color @@ hex("f4f6ff"),
      display(`grid),
      height @@ vh(100.),
      justifyContent(`center),
      unsafe("justifyItems", "center"),
      textAlign(`center),
    ]),
    "shadow": style([
      marginTop @@ em(1.),
      width @@ em(6.),
    ]),
  })
);

let make = (_) => {
  ...component,
  render: (_) =>
    <div className=styles##container>
      <GhostFloating />
      <div className=styles##shadow>
        <Shadow />
      </div>

      <H1><Text text="Whoops!" /></H1>
      <div>
        <Text text="We couldn't find the page you " />
        <br />
        <Text text="were looking for." />
      </div>
    </div>
};

let default = ReasonReact.wrapReasonForJs(
  ~component,
  (_) => make([||])
);
