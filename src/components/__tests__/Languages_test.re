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

  test("renders a link to the repo", () => {
    component
    |> getByTitle("Reason")
    |> expect
    |. toHaveStyle("background-color: #663399; width: 99.50")
  });

  test("languageToJs works", () => {
    languages
    ->Array.get(0)
    ->Languages.languageToJs
    ->Expect.expect
    ->Expect.toMatchSnapshot;
  })
});
