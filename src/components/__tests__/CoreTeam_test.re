open Jest;
open JestDom;
open ReactTestingLibrary;

let teams = IconList.([
  { href: "//test.local", image: Yarn, title: "Tester" },
]);

describe("<CoreTeam />", () => {
  test("renders", () => {
    <CoreTeam teams />
    |> render
    |> getByTitle("Tester")
    |> expect
    |> toBeInTheDocument;
  });
});
