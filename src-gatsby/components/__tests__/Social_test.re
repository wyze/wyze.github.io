open Jest;
open JestDom;
open ReactTestingLibrary;

let profiles = IconList.([
  { href: "//test.local", image: Yarn, title: "Tester" },
]);

describe("<Social />", () => {
  let component = <Social profiles /> |> render;

  test("renders section title", () =>
    component
    |> getByText(~matcher=`Str("Me Around The Internet"))
    |> expect
    |> toBeInTheDocument
  );

  test("renders the profiles", () =>
    component
    |> getByTitle("Tester")
    |> expect
    |> toBeInTheDocument
  );
});
