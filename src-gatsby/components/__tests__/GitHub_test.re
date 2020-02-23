open Jest;
open JestDom;
open ReactTestingLibrary;

describe("<GitHub />", () => {
  test("renders", () => {
    <GitHub />
    |> render
    |> getByTestId("svg-github")
    |> expect
    |> toBeInTheDocument;
  });
});
