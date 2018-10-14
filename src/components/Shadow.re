let component = ReasonReact.statelessComponent("Shadow");

let shrink = Css.(
  keyframes([
    (0, [margin2(~h=pct(5.), ~v=`zero), width @@ pct(90.)]),
    (50, [margin2(~h=pct(18.), ~v=`zero), width @@ pct(60.)]),
    (100, [margin2(~h=pct(5.), ~v=`zero), width @@ pct(90.)]),
  ])
);

let styles =Css.({
  "svg":
    style([
      animation(
        ~duration=3000,
        ~iterationCount=`infinite,
        ~timingFunction=`easeOut,
        shrink,
      ),
      marginTop @@ em(1.),
      unsafe("transformOrigin", "center center"),
    ]),
  "ellipse": style([unsafe("transformOrigin", "center center")]),
});

let make = _ => {
  ...component,
  render: _ =>
    <svg
      className=styles##svg
      enableBackground="new 0 0 122.436 39.744"
      height="39.744px"
      viewBox="0 0 122.436 39.744"
      width="122.436px"
      x="61px"
      xmlns="http://www.w3.org/2000/svg"
      y="20px"
    >
      <title> {ReasonReact.string("shadow")} </title>
      <ellipse
        className=styles##ellipse
        cx="61.128"
        cy="19.872"
        fill="#406789"
        rx="49.25"
        ry="8.916"
      />
    </svg>,
};
