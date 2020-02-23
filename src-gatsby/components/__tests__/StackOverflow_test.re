open Jest;
open JestDom;
open ReactTestingLibrary;

describe("<StackOverflow />", () => {
  test("renders", () =>
    <StackOverflow />
    |> render
    |> getByTestId("svg-stackoverflow")
    |> expect
    |> toBeInTheDocument
  );
});
