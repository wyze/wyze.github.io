open Jest;
open JestDom;
open ReactTestingLibrary;

describe("<Pixel />", () => {
  test("renders", () =>
    <Pixel location="intro" />
    |> render
    |> getByAltText("intro")
    |> expect
    |> toBeInTheDocument
  );
});
