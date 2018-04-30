open Jest;
open JestDom;
open ReactTestingLibrary;

describe("<Employer />", () => {
  test("renders", () =>
    <Employer end_=(Some("June 2018")) name="Acme Inc." start="May 2018" />
    |> render
    |> getByText(~matcher=`RegExp(Js.Re.fromString("May 2018")))
    |> expect
    |> toBeInTheDocument
  );

  test("renders without end_", () =>
    <Employer end_=None name="Acme Inc." start="May 2018" />
    |> render
    |> getByText(~matcher=`RegExp(Js.Re.fromString("Present")))
    |> expect
    |> toBeInTheDocument
  );
});
