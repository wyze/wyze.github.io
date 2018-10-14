let component = ReasonReact.statelessComponent("SVG");

let make = (~height, ~name="", ~width, children) => {
  ...component,
  render: _ =>
    ReasonReact.cloneElement(
      <svg
        height="100%"
        viewBox=(Printf.sprintf("0 0 %d %d", width, height))
        xmlns="http://www.w3.org/2000/svg"
      />,
      ~props={"data-testid": Printf.sprintf("svg-%s", name)},
      [|<Fragment> ...children </Fragment>|],
    ),
};
