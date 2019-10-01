type job = {
  end_: option(string),
  name: string,
  start: string,
};

let component = ReasonReact.statelessComponent("Employment");

let make = (~jobs, _) => {
  ...component,
  render: _ =>
    <Box wrap=true title="Employment">
      <>
        <Pixel location="employment" />
        {
          jobs
          |> List.map(({end_, name, start}) =>
               <Employer key=name end_ name start />
             )
          |> Array.of_list
          |> ReasonReact.array
        }
      </>
    </Box>,
};
