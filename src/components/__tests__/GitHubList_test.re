open Jest;
open JestDom;
open ReactTestingLibrary;

let content = GitHubList.([
  {
    description: "A repo.",
    name: "a/repo",
    stars: 1,
    url: "//site.local/a/repo"
  },
  {
    description: "Another repo.",
    name: "another/repo",
    stars: 1000,
    url: "//site.local/another/repo"
  },
]);

describe("<GitHubList />", () => {
  let component = <GitHubList content title="GitHub Items" /> |> render;

  test("renders the description", () => {
    let actual = component |> getByText(~matcher=`Str("A repo."));

    actual |> expect |> toBeInTheDocument;
  });

  test("renders with formatted stars", () => {
    component
    |> getByText(~matcher=`Str("1,000"))
    |> expect
    |> toBeInTheDocument;
  });

  test("renders a link to the repo", () => {
    component
    |. getByText(~matcher=`Str("a/repo"))
    |. expect
    |. toHaveAttributeWithValue("href", "//site.local/a/repo");
  });

  test("githubToJs works", () => {
    content
    |> List.hd
    |> GitHubList.githubToJs
    |> Expect.expect
    |> Expect.toMatchSnapshot;
  })
});
