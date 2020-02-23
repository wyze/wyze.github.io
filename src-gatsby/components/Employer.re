let component = ReasonReact.statelessComponent("Employer");

let styles = Css.(Styles.({
  "section": [
    paddingBottom @@ em(1.),
    width @@ pct(100.),
    media(breakpoint(Small), [
      paddingBottom @@ em(0.5),
    ]),
    media(breakpoint(Large), [
      width @@ pct(50.),
      selector(":nth-child(even)", [
        paddingLeft @@ em(0.5),
      ]),
      selector(":nth-child(odd)", [
        paddingRight @@ em(0.5),
      ]),
    ]),
  ],
  "child": style([
    display(block),
    media(breakpoint(Small), [
      alignItems(center),
      display(`flex),
      flexBasis @@ pct(50.),
      flexGrow(0),
      flexShrink(0),
      justifyContent(spaceBetween),
    ]),
    ...level
  ]),
  "months": style([
    fontWeight(300),
    media(breakpoint(Small), [
      selector("::after", [ unsafe("content", "')'") ]),
      selector("::before", [ unsafe("content", "'('") ]),
    ]),
  ])
}));

let make = ( ~end_, ~name, ~start, _ ) => {
  ...component,
  render: (_) => {
    let end_ = switch end_ {
    | None => "Present"
    | Some(str) => str
    };

    <Section styles=styles##section>
      <div className=styles##child>
        <H2>
          <Strong text=name />
        </H2>
        <div className=styles##months>
          <Text text=start />
          <HTML html=" &mdash; " />
          <Text text=end_ />
        </div>
      </div>
    </Section>
  }
};
