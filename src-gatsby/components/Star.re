let component = ReasonReact.statelessComponent("Star");

let make = (_) => {
  ...component,
  render: (_) =>
    <SVG height=16 name="star" width=16>
      <path d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z" fillRule="evenodd" />
    </SVG>
};
