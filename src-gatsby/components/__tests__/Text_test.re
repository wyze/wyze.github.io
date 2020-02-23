open Jest;
open JestDom;
open ReactTestingLibrary;

describe("<Text />", () => {
  test("renders", () =>
    <Text text="text" />
    |> render
    |> container
    |> expect
    |. toHaveTextContent(`Str("text"))
  );
});
