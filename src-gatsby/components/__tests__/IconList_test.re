open Jest;
open JestDom;
open ReactTestingLibrary;

let icons = IconList.([
  { href: "//site.local/test1", image: Yarn, title: "Test 1" },
]);

let styles = Css.([ color(rebeccapurple) ]);

describe("<IconList />", () => {
  let component = <IconList icons styles /> |> render;

  test("renders the link around the icon", () => {
    let link = component |> getByTitle("Test 1") |> expect;

    let _ = link->toHaveAttributeWithValue("href", "//site.local/test1");
    let _ = link->toHaveAttributeWithValue("rel", "noopener noreferrer");
    let _ = link->toHaveAttributeWithValue("target", "_blank");

    link |> toBeInTheDocument;
  });

  test("renders the svg icon", () => {
    let icon = component |> getByTestId("svg-yarn") |> expect;

    let _ = icon->toHaveAttribute("viewBox");

    icon |> toBeInTheDocument;
  })
});
