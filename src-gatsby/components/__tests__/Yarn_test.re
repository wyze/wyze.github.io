open Jest;
open JestDom;
open ReactTestingLibrary;

describe("<Yarn />", () => {
  test("renders", () =>
    <Yarn />
    |> render
    |> getByTestId("svg-yarn")
    |> expect
    |> toBeInTheDocument
  );
});
