open Jest;
open JestDom;
open ReactTestingLibrary;

describe("<H2 />", () => {
  test("renders", () =>
    <H2> {ReasonReact.string("Heading")} </H2>
    |> render
    |> getByText(~matcher=`Str("Heading"))
    |> expect
    |> toBeInTheDocument
  );

  test("renders with className", () =>
    <H2 className=Css.[color(rebeccapurple)]>
      {ReasonReact.string("Heading")}
    </H2>
    ->render
    ->(getByText(~matcher=`Str("Heading")))
    ->expect
    ->(toHaveClass("css-nmnzeh"))
  );
});
