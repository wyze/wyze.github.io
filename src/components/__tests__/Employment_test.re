open Jest;
open JestDom;
open ReactTestingLibrary;

let jobs =
  Employment.[
    {end_: None, name: "Company 1", start: "June 2018"},
    {end_: Some("July 2018"), name: "Company 2", start: "June 2018"},
  ];

describe("<Employment />", () =>
  test("renders", () => {
    let component = <Employment jobs /> |> render;

    let _ =
      component
      |> getByText(~matcher=`Str("Employment"))
      |> expect
      |> toBeInTheDocument;

    let _ =
      component
      |> getByText(~matcher=`Str("Company 1"))
      |> expect
      |> toBeInTheDocument;
    let _ =
      component
      /* The mdash is not text content, so it is omited. */
      |> getByText(~matcher=`Func((str, _el) => str === "June 2018Present"))
      |> expect
      |> toBeInTheDocument;

    let _ =
      component
      |> getByText(~matcher=`Str("Company 2"))
      |> expect
      |> toBeInTheDocument;
    let _ =
      component
      /* The mdash is not text content, so it is omited. */
      |> getByText(~matcher=`Func((str, _el) => str === "June 2018July 2018"))
      |> expect
      |> toBeInTheDocument;

    pass;
  })
);
