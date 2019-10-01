let component = ReasonReact.statelessComponent("Conclusion");

let styles = Css.[width @@ pct(100.)];

let make = (~resume, _) => {
  ...component,
  render: _ =>
    <Box id="Conclusion">
      <Pixel location="conclusion" />
      <Section styles>
        <H2 className=Styles.thin>
          <Text text="Download " />
          <Link href=resume> {ReasonReact.string({j|résumé|j})} </Link>
          <Text text=". View " />
          <Link href="//github.com/wyze/wyze.github.io">
            <Text text="source" />
          </Link>
          <Text text="." />
        </H2>
      </Section>
    </Box>,
};
