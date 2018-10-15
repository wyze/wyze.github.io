open Jest;
open JestDom;
open ReactTestingLibrary;

describe("<GitHubItem />", () =>
  test("renders", () => {
    let component =
      <GitHubItem
        description="A repo."
        languages=[||]
        name="a/repo"
        stars=1
        url="//site.local/a/repo"
      />
      |> render;
    let link = component |> getByText(~matcher=`Str("a/repo"));

    let _ =
      component
      |> getByText(~matcher=`Str("A repo."))
      |> expect
      |> toBeInTheDocument;

    let _ = link |> expect |> toBeInTheDocument;
    let _ =
      link |. expect |. toHaveAttributeWithValue("href", "//site.local/a/repo");

    let _ = component |> getByTestId("svg-star") |> expect |> toBeInTheDocument;

    let _ =
      component |> getByText(~matcher=`Str("1")) |> expect |> toBeInTheDocument;

    pass;
  })
);
