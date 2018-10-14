open Jest;
open JestDom;
open ReactTestingLibrary;

describe("<SVG />", () => {
  test("renders", () =>
    <SVG height=16 width=16>
      <title> {ReasonReact.string("Test")} </title>
    </SVG>
    |> render
    |> getByTitle("Test")
    |> expect
    |> toBeInTheDocument
  );

  test("renders with name as data-testid", () =>
    <SVG height=16 name="test" width=16 />
    |> render
    |> getByTestId("svg-test")
    |> expect
    |> toBeInTheDocument
  );
});
