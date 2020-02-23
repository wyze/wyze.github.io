type image =
  | GitHub
  | LinkedIn
  | StackOverflow
  | Tessel
  | Twitter
  | Yarn;

type icon = {
  href: string,
  image,
  title: string,
};

let component = ReasonReact.statelessComponent("IconList");

let className = Css.([
  display(inlineBlock),
  height @@ em(3.7),
  minWidth @@ em(3.7)
]);

let make = ( ~icons, ~styles, _ ) => {
  ...component,
  render: (_) =>
    <Fragment>
      (icons
        |> List.map(({ href, image, title }) =>
            <Section key=title styles>
              <Link className href title>
                (
                  switch image {
                  | GitHub => <GitHub />
                  | LinkedIn => <LinkedIn />
                  | StackOverflow => <StackOverflow />
                  | Tessel => <Tessel />
                  | Twitter => <Twitter />
                  | Yarn => <Yarn />
                  }
                )
              </Link>
            </Section>
          )
        |> Array.of_list
      )
    </Fragment>
};
