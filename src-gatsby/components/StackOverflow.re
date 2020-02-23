let component = ReasonReact.statelessComponent("StackOverflow");

let make = (_) => {
  ...component,
  render: (_) =>
    <SVG height=118 name="stackoverflow" width=100>
      <path
        d="M84.072 107.35V75.8h10.516v42.07H0V75.8h10.516v31.55"
        fill="#bcbbbb"
      />
      <path
        d="M22.09 72.898l51.457 10.815L75.71 73.42 24.252 62.607l-2.162 10.29zm6.807-24.64l47.666 22.2 4.44-9.533-47.666-22.2-4.44 9.534zm13.19-23.384l40.406 33.65 6.73-8.08-40.405-33.65-6.73 8.08zM68.172 0l-8.437 6.276 31.38 42.19 8.44-6.275L68.17 0zM21.045 96.833h52.582V86.316H21.044v10.517z"
        fill="#f48024"
      />
    </SVG>
};
