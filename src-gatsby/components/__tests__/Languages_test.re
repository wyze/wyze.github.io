open Jest;
open JestDom;
open ReactTestingLibrary;

let languages = Languages.([|
  {
    colorHex: "663399",
    name: "Reason",
    percent: 99.50,
  },
  {
    colorHex: "0db7ed",
    name: "Dockerfile",
    percent: 0.50,
  },
|]);

describe("<Languages />", () => {
  let component = <Languages languages /> |> render;

  test("renders the language name", () => {
    let actual = component |> getByText(~matcher=`Str("Reason"));

    actual |> expect |> toBeInTheDocument;
  });

  test("renders with formatted percent", () => {
    component
    |> getByText(~matcher=`Str("99.5%"))
    |> expect
    |> toBeInTheDocument;
  });

  test("renders a bar segment with proper width and color", () => {
    component
    |> getByTitle("Reason")
    |> expect
    |. toHaveStyle("background-color: #663399; width: 99.50")
  });

  test("will render top 3 languages (by percent)", () => {
    let localLanguages = Languages.([|
      {
        colorHex: "663399",
        name: "Reason",
        percent: 34.,
      },
      {
        colorHex: "0db7ed",
        name: "Dockerfile",
        percent: 1.,
      },
      {
        colorHex: "ffffff",
        name: "Shell",
        percent: 4.,
      },
      {
        colorHex: "ffff00",
        name: "TypeScript",
        percent: 31.,
      },
      {
        colorHex: "ff00ff",
        name: "JavaScript",
        percent: 30.,
      },
    |]);
    let localComponent = <Languages languages=localLanguages /> |> render;

    localComponent
    |> getByText(~matcher=`Str("Reason"))
    |> expect
    |> toBeInTheDocument
    |> ignore;

    localComponent
    |> getByText(~matcher=`Str("TypeScript"))
    |> expect
    |> toBeInTheDocument
    |> ignore;

    localComponent
    |> getByText(~matcher=`Str("JavaScript"))
    |> expect
    |> toBeInTheDocument
    |> ignore;

    localComponent
    |> getByText(~matcher=`Str("+ 2 more"))
    |> expect
    |> toBeInTheDocument
    |> ignore;

    pass;
  })

  test("languageToJs works", () => {
    languages
    ->Array.get(0)
    ->Languages.languageToJs
    ->Expect.expect
    ->Expect.toMatchSnapshot;
  })
});
