type SvgProps = {
  children: React.ReactNode
  height: number
  name: string
  width: number
}

export function Svg({ children, height, name, width }: SvgProps) {
  return (
    <svg
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{name}</title>
      {children}
    </svg>
  )
}
