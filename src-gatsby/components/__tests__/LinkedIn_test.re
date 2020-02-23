open Jest;
open JestDom;
open ReactTestingLibrary;

describe("<LinkedIn />", () => {
  test("renders", () =>
    <LinkedIn />
    |> render
    |> getByTestId("svg-linkedin")
    |> expect
    |> toBeInTheDocument
  );
});
