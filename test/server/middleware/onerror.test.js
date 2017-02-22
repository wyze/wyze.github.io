// @flow

import onerror from '../../../src/server/middleware/onerror'

function NotFoundError() {
  this.name = 'NotFoundError'
  this.message = '404 File Not Found'
  this.stack = (new Error()).stack
  this.status = 404
}

NotFoundError.prototype = Object.create(Error.prototype)
NotFoundError.prototype.constructor = NotFoundError

describe('onerror', () => {
  it('emits 404 page when url not valid', async () => {
    const stub = jest.fn()
    const next = jest.fn()
    const ctx = {
      app: {
        emit: jest.fn(),
      },
      body: '',
      status: 404,
      throw: () => {
        stub()

        throw new NotFoundError()
      },
    }
    const middleware = onerror()

    await middleware(ctx, next)

    expect(stub).toHaveBeenCalledTimes(1)
    expect(next).toHaveBeenCalledTimes(1)
    expect(ctx.status).toBe(404)
    expect(ctx.body).toMatch(/We couldn't find the page/)
  })

  it('emits 500 page when something unexpected happens', async () => {
    const stub = jest.fn()
    const next = () => {
      throw new Error()
    }
    const ctx = {
      app: {
        emit: stub,
      },
      body: '',
      status: null,
    }
    const middleware = onerror()

    await middleware(ctx, next)

    expect(stub).toHaveBeenCalledTimes(1)
    expect(ctx.status).toBe(500)
    expect(ctx.body).toMatch(/Internal Server Error/)
  })
})
