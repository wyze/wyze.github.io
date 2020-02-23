open Jest;
open JestDom;
open ReactTestingLibrary;

describe("<Link />", () => {
  let href = "//site.local/test";

  test("renders", () =>
    <Link href> {ReasonReact.string("A link")} </Link>
    |> render
    |> getByText(~matcher=`Str("A link"))
    |> expect
    |> toBeInTheDocument
  );

  test("renders as a link", () =>
    <Link href> {ReasonReact.string("A link")} </Link>
    |> render
    |> getByText(~matcher=`Str("A link"))
    |> expect
    |. toHaveAttributeWithValue("href", href)
  );

  test("renders with className", () =>
    <Link className=Css.[color(rebeccapurple)] href> {ReasonReact.string("A link")} </Link>
    |> render
    |> getByText(~matcher=`Str("A link"))
    |> expect
    |. toHaveClass("css-wmr41k")
  );

  test("renders with title", () =>
    <Link href title="Test"> {ReasonReact.string("A link")} </Link>
    |> render
    |> getByTitle("Test")
    |> expect
    |> toBeInTheDocument
  );
});
