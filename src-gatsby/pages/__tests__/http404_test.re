open Jest;
open JestDom;
open ReactTestingLibrary;

[@bs.get] external textContent: Dom.element => string = "";

describe("404 page", () => {
  test("renders with a exclamation", () =>
    <Http404 />
    |> render
    |> getByText(~matcher=`Str("Whoops!"))
    |> expect
    |> toBeInTheDocument
    );

  test("renders with a message", () =>
    <Http404 />
    |> render
    |> getByText(~matcher=`Func((_text, el) =>
      (el |> textContent) === "We couldn't find the page you were looking for."
    ))
    |> expect
    |> toBeInTheDocument
  );

  test("renders a floating ghost", () =>
    <Http404 />
    |> render
    |> getByTitle("ghost")
    |> expect
    |> toBeInTheDocument
  );

  test("renders a shadow under the ghost", () =>
    <Http404 />
    |> render
    |> getByTitle("shadow")
    |> expect
    |> toBeInTheDocument
  );

  test("exports default component", () => {
    module Default = {
      let make = _ =>
        ReasonReact.wrapJsForReason(
          ~reactClass=Http404.default,
          ~props=Js.Obj.empty(),
          [||]
        );
    };

    <Default />
    |> render
    |> container
    |> expect
    |> toBeInTheDocument
  });
});
