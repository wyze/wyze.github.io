import { Box } from '../components'
import { useEffect } from 'react'
import { useFela } from 'react-fela'

const dev = process.env.NODE_ENV !== 'production'

const styles = {
  padding: '2em 1em',
  '@media only screen and (min-width: 1200px)': {
    padding: '4em 2em',
  },
}

export default function HomePage() {
  const { css } = useFela()

  useEffect(() => {
    if ('serviceWorker' in navigator && !dev) {
      navigator.serviceWorker.register('/service-worker.js')
    }
  }, [])

  return (
    <main className={css(styles)}>
      <Box>Welcome to Next.js!</Box>
    </main>
  )
}
