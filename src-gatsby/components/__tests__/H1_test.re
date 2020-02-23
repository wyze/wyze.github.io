open Jest;
open JestDom;
open ReactTestingLibrary;

describe("<H1 />", () => {
  test("renders", () =>
    <H1> {ReasonReact.string("Heading")} </H1>
    |> render
    |> getByText(~matcher=`Str("Heading"))
    |> expect
    |> toBeInTheDocument
  );

  test("renders with className", () =>
    <H1 className=Css.[color(rebeccapurple)]>
      {ReasonReact.string("Heading")}
    </H1>
    ->render
    ->(getByText(~matcher=`Str("Heading")))
    ->expect
    ->(toHaveClass("css-vde2wd"))
  );
});
