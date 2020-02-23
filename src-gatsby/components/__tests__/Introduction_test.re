open Jest;
open JestDom;
open ReactTestingLibrary;

[@bs.get] external tagName: Dom.element => string = "";
[@bs.get] external textContent: Dom.element => string = "";

describe("<Introduction />", () => {
  test("renders an image", () =>
    <Introduction />
    |> render
    |> getByAltText("Neil Kistner")
    |> expect
    |> toBeInTheDocument
  );

  test("renders my introduction", () =>
    <Introduction />
    |> render
    |> getByText(
        ~matcher=
          `Func(
            (_, el) =>
              switch (el |> tagName) {
              | "H1" =>
                el
                |> textContent
                === "Hello, I'm Neil Kistner, a software engineer in St. Louis."
              | _ => false
              },
          ),
      )
    |> expect
    |> toBeInTheDocument
  );
});
