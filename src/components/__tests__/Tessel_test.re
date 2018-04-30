open Jest;
open JestDom;
open ReactTestingLibrary;

describe("<Tessel />", () => {
  test("renders", () =>
    <Tessel />
    |> render
    |> getByTestId("svg-tessel")
    |> expect
    |> toBeInTheDocument
  );
});
