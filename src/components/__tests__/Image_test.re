open Jest;
open JestDom;
open ReactTestingLibrary;

describe("<Image />", () => {
  test("renders", () => {
    <Image alt="Me" src="me.png" />
    |> render
    |> getByAltText("Me")
    |> expect
    |> toBeInTheDocument;
  });

  test("renders with circle", () => {
    <Image alt="Me" circle=true src="me.png" />
    |> render
    |> getByAltText("Me")
    |> expect
    |. toHaveClass("css-16m7qwg");
});

  test("renders with width", () => {
    <Image alt="Me" src="me.png" width="200" />
    |> render
    |> getByAltText("Me")
    |> expect
    |. toHaveAttributeWithValue("width", "200");
  });
});
