import { Box } from '../components'
import { useEffect } from 'react'

const dev = process.env.NODE_ENV !== 'production'

export default function HomePage() {
  useEffect(() => {
    if ('serviceWorker' in navigator && !dev) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(() => {
          console.log('service worker registration successful')
        })
        .catch((err) => {
          console.warn('service worker registration failed', err.message)
        })
    }
  }, [])

  return <Box>Welcome to Next.js!</Box>
}
