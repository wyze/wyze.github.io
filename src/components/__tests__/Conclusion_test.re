open Jest;
open JestDom;
open ReactTestingLibrary;

describe("<Conclusion />", () => {
  let component = <Conclusion resume="/resume.pdf" /> |> render;

  test({j|renders a résumé link|j}, () => {
    let resume = component |> getByText(~matcher=`Str({j|résumé|j}));

    resume |. expect |. toHaveAttributeWithValue("href", "/resume.pdf");
  });

  test("renders a source link", () => {
    let source = component |> getByText(~matcher=`Str("source"));

    source
    |. expect
    |. toHaveAttributeWithValue("href", "//github.com/wyze/wyze.github.io");
  });
});
