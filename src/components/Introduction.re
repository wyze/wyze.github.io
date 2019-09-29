[@bs.module] external me : string = "../images/me.png";

let component = ReasonReact.statelessComponent("Introduction");

let styles = Css.(Styles.({
  "image": [
    flexBasis @@ pct(100.),
    paddingBottom @@ em(1.0),
    textAlign(center),
    media(breakpoint(Small), [
      flexBasis(auto),
      paddingBottom(zero),
    ]),
  ],
  "section": [
    flexBasis @@ pct(75.),
    flexGrow(1),
    flexShrink(1),
    width @@ pct(100.0),
  ]
}));

let make = (_) => {
  ...component,
  render: (_) =>
    <Box id="Introduction" wrap=true>
      <Section center=false styles=styles##image>
        <Image circle=true alt="Neil Kistner" src=me />
      </Section>
      <Section styles=styles##section>
        <H1 className=Styles.thin>
          <Text text="Hello, I'm " />
          <Strong text="Neil Kistner" />
          <Text text=", a software engineer in " />
          <Strong text="St. Louis" />
          <Text text="." />
        </H1>
      </Section>
      <img src="https://md82aclso9.execute-api.us-east-1.amazonaws.com/dev/introduction.png" />
    </Box>
};

