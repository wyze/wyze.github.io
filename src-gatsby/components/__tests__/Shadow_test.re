open Jest;
open JestDom;
open ReactTestingLibrary;

describe("<Shadow />", () => {
  test("renders", () =>
    <Shadow />
    |> render
    |> getByTitle("shadow")
    |> expect
    |> toBeInTheDocument
  );
});
