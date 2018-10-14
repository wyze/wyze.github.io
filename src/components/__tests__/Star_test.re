open Jest;
open JestDom;
open ReactTestingLibrary;

describe("<Star />", () => {
  test("renders", () =>
    <Star />
    |> render
    |> getByTestId("svg-star")
    |> expect
    |> toBeInTheDocument
  );
});
