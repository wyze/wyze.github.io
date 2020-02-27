// let component = ReasonReact.statelessComponent("SVG");

// let make = (~height, ~name="", ~width, children) => {
//   ...component,
//   render: _ =>
//     ReasonReact.cloneElement(
//       <svg
//         height="100%"
//         viewBox=(Printf.sprintf("0 0 %d %d", width, height))
//         xmlns="http://www.w3.org/2000/svg"
//       />,
//       ~props={"data-testid": Printf.sprintf("svg-%s", name)},
//       [|<Fragment> ...children </Fragment>|],
//     ),
// };

import { PropsWithChildren } from 'react'

type SvgProps = PropsWithChildren<{
  height: number
  name?: string
  width: number
}>

export function Svg({ children, height, name = '', width }: SvgProps) {
  return (
    <svg
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  )
}
