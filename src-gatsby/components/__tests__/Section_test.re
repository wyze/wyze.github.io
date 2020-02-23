open Jest;
open JestDom;
open ReactTestingLibrary;

describe("<Section />", () => {
  test("renders", () =>
    <Section> {ReasonReact.string("Text")} </Section>
    |> render
    |> getByText(~matcher=`Str("Text"))
    |> expect
    |> toBeInTheDocument
  );

  test("renders with styles", () =>
    <Section styles=Css.[color(rebeccapurple)]>
      {ReasonReact.string("Text")}
    </Section>
    |> render
    |> getByText(~matcher=`Str("Text"))
    |> expect
    |. toHaveClass("css-71qui2")
  );

  test("renders without center", () =>
    <Section center=false> {ReasonReact.string("Text")} </Section>
    |> render
    |> getByText(~matcher=`Str("Text"))
    |> expect
    |. toHaveClass("css-nil")
  );
});
