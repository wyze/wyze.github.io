open Jest;
open JestDom;
open ReactTestingLibrary;

describe("<Strong />", () => {
  test("renders", () =>
    <Strong text="text" />
    |> render
    |> getByText(~matcher=`Str("text"))
    |> expect
    |. toHaveClass("css-au5gqo")
  );
});
