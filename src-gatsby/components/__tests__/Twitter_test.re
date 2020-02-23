open Jest;
open JestDom;
open ReactTestingLibrary;

describe("<Twitter />", () => {
  test("renders", () =>
    <Twitter />
    |> render
    |> getByTestId("svg-twitter")
    |> expect
    |> toBeInTheDocument
  );
});
