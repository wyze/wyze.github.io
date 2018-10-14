open Jest;
open JestDom;
open ReactTestingLibrary;

describe("<GhostFloating />", () => {
  test("renders", () =>
    <GhostFloating />
    |> render
    |> getByTitle("ghost")
    |> expect
    |> toBeInTheDocument
  );
});
