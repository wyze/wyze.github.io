open Jest;
open JestDom;
open ReactTestingLibrary;

describe("<Title />", () => {
  test("renders", () =>
    <Title title="title" />
    |> render
    |> getByText(~matcher=`Str("title"))
    |> expect
    |> toBeInTheDocument
  );
});
