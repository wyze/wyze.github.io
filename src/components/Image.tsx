import { useFela } from 'react-fela'

type ImageProps = {
  alt: string
  circle?: boolean
  src: string
  width?: number
}

const styles = ({ circle }: Pick<ImageProps, 'circle'>) => ({
  maxHeight: '100px',
  borderRadius: circle ? '50%' : 'none',
})

export function Image({ circle = false, width = 100, ...props }: ImageProps) {
  const { css } = useFela()

  return (
    <img
      {...props}
      className={css(styles({ circle }))}
      height={100}
      width={width}
    />
  )
}
