open Jest;
open JestDom;
open ReactTestingLibrary;

[@bs.get] [@bs.return nullable]
external firstChild : Dom.element => option(Dom.element) = "";

describe("<Box />", () => {
  let element = <Box> (ReasonReact.string("Content")) </Box>;

  test("renders", () => {
    let actual = element |> render |> getByText(~matcher=`Str("Content"));

    actual |> expect |> toBeInTheDocument;
  });

  test("renders with childStyle", () => {
    let actual =
      <Box childStyle=Css.[color(rebeccapurple)]>
        (ReasonReact.string("Content"))
      </Box>
      |> render
      |> getByText(~matcher=`Str("Content"));

    actual |. expect |. toHaveClass("css-1x4gi5o");
  });

  test("renders with id", () => {
    let element =
      <Box id="content"> (ReasonReact.string("Content")) </Box>
      |> render
      |> container
      |> firstChild;

    let actual =
      switch (element) {
      | Some(el) => el
      | None => raise(Failure("Not found"))
      };

    actual |. expect |. toHaveAttribute("id");
  });

  test("renders with title", () => {
    let element =
      <Box title="Content"> (ReasonReact.string("Content")) </Box>
      |> render
      |> container
      |> firstChild;

    let actual =
      switch (element) {
      | Some(el) => el
      | None => raise(Failure("Not found"))
      };

    actual |. expect |. toHaveAttributeWithValue("id", "Content");
  });

  test("renders with wrap", () => {
    let actual =
      <Box wrap=true> (ReasonReact.string("Content")) </Box>
      |> render
      |> getByText(~matcher=`Str("Content"));

    actual |. expect |. toHaveClass("css-pz64bv");
  });
});
