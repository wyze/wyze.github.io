open Jest;
open JestDom;
open ReactTestingLibrary;

describe("<HTML />", () => {
  test("renders", () => {
    <HTML html="&mdash;" />
    |> render
    |> getByText(~matcher=`Func((text, _el) => text->Js.String.length === 1))
    |> expect
    |> toBeInTheDocument;
  });
});
