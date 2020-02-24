import { createServer } from 'http'
import { join } from 'path'
import { parse } from 'url'
import next from 'next'

const port = parseInt(process.env.PORT ?? '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() =>
  createServer((req, res) => {
    const parsedUrl = parse(req.url ?? '', true)
    const { pathname } = parsedUrl

    if (pathname === '/service-worker.js' && !dev) {
      const filePath = join(__dirname, '.next', pathname)
      app.serveStatic(req, res, filePath)
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
)
