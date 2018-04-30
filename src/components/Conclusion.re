/* [@bs.module] external resume : string = "../resume.pdf"; */

let component = ReasonReact.statelessComponent("Conclusion");

let styles = Css.([
  width @@ pct(100.),
]);

let resumeLink = href => ReasonReact.cloneElement(
  <a className=Css.style(Link.styles) href rel="noopener noreferrer" target="_blank" />,
  ~props={"ga-on": "click,contextmenu", "ga-event-category": "Resume"},
  [| ReasonReact.string({j|résumé|j}) |]
);

let make = (~resume, _) => {
  ...component,
  render: (_) =>
    <Box id="Conclusion">
      <Section styles>
        <H2 className=Styles.thin>
          <Text text="Download " />
          {resumeLink(resume)}
          <Text text=". View " />
          <Link href="//github.com/wyze/wyze.github.io">
            <Text text="source" />
          </Link>
          <Text text="." />
        </H2>
      </Section>
    </Box>
};
