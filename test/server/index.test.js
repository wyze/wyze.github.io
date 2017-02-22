// @flow

import '../helpers/nock'
import app from '../../src/server'
import cheerio from 'cheerio'
import request from 'supertest'

type Response = Promise<{
  headers: {
    'content-encoding': string,
    link: Array<string>,
  },
  ok: boolean,
  statusCode: number,
  text: string,
}>

type Request = Promise<{
  get: ( path: string ) => Response,
}>

// :(
jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000

const server = async (): Request =>
  // eslint-disable-next-line no-return-await
  await request(await app.listen())

const get = async ( path: string = '/' ): Response =>
  (await server()).get(path)

describe('server', () => {
  it('/ works and renders html & css', async () => {
    const { ok, statusCode, text } = await get()
    const dom = cheerio.load(text)

    expect(ok).toBe(true)
    expect(statusCode).toBe(200)
    expect(dom('title').text().length).not.toBe(0)
    expect(dom('style').text().length).not.toBe(0)
    expect(dom('body').text().length).not.toBe(0)
  })

  it('set link header for http/2 push', async () => {
    const { headers: { link = [] } } = await get()

    expect(link.length).not.toBe(0)
  })

  it('serves static files and gzips when available', async () => {
    const encoding = 'content-encoding'
    const srvr = await server()
    const me = await srvr.get('/img/me.png')
    const resume = await srvr.get('/resume.pdf')

    // jpg
    expect(me.ok).toBe(true)
    expect(me.statusCode).toBe(200)
    expect(me.text).not.toBe('')
    expect(me.headers[encoding]).toBe('identity')

    // pdf
    expect(resume.ok).toBe(true)
    expect(resume.statusCode).toBe(200)
    expect(resume.text).not.toBe('')
    expect(resume.headers[encoding]).toBe('identity')
  })
})
