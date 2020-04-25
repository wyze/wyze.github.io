import * as log from './log'

beforeEach(() => {
  globalThis.fetch = jest.fn()
})

afterEach(jest.resetAllMocks)

describe('log', () => {
  describe('click', () => {
    it('should send a click event mutation', () => {
      log.click('test')

      expect(globalThis.fetch).toHaveBeenCalledTimes(1)
      expect(globalThis.fetch).toHaveBeenCalledWith(
        'https://api.neilkistner.com/graphql',
        {
          body: expect.stringContaining('"value":"test"'),
          headers: expect.any(Headers),
          method: 'post',
        }
      )
    })
  })

  describe('view', () => {
    it('should send a view event mutation without args', () => {
      log.view()

      expect(globalThis.fetch).toHaveBeenCalledTimes(1)
      expect(globalThis.fetch).toHaveBeenCalledWith(
        'https://api.neilkistner.com/graphql',
        {
          body: expect.stringMatching(
            /"page":"\/","referrer":"",.+"unique":true/
          ),
          headers: expect.any(Headers),
          method: 'post',
        }
      )
    })

    it('should send a view event mutation with args', () => {
      log.view('/test', '/')

      expect(globalThis.fetch).toHaveBeenCalledTimes(1)
      expect(globalThis.fetch).toHaveBeenCalledWith(
        'https://api.neilkistner.com/graphql',
        {
          body: expect.stringMatching(
            /"page":"\/test","referrer":"\/",.+"unique":true/
          ),
          headers: expect.any(Headers),
          method: 'post',
        }
      )
    })
  })
})
