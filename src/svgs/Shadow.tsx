import { useFela } from 'react-fela'

const styles = {
  container: {
    animationDuration: '3s',
    animationIterationCount: 'infinite',
    animationName: {
      '0%': {
        margin: '5% 0',
        width: '90%',
      },
      '50%': {
        margin: '18% 0',
        width: '60%',
      },
      '100%': {
        margin: '5% 0',
        width: '90%',
      },
    },
    animationTimingFunction: 'ease-out',
    marginTop: 1,
    transformOrigin: 'center center',
  },
  ellipse: {
    transformOrigin: 'center center',
  },
}

export function Shadow() {
  const { css } = useFela()

  return (
    <svg
      className={css(styles.container)}
      enableBackground="new 0 0 122.436 39.744"
      height="39.744px"
      viewBox="0 0 122.436 39.744"
      width="122.436px"
      x="61px"
      xmlns="http://www.w3.org/2000/svg"
      y="20px"
    >
      <title>shadow</title>
      <ellipse
        className={css(styles.ellipse)}
        cx="61.128"
        cy="19.872"
        fill="#406789"
        rx="49.25"
        ry="8.916"
      />
    </svg>
  )
}
