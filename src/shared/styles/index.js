// @flow

import type { Style } from '../../types'
import { css } from 'glamor'

export const centered: Style = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  justifyContent: 'center',
  height: '100vh',
  color: '#f4f6ff',
})

export const flexGrow: Style = css({
  flexGrow: 1,
})

export const level: Style = css({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
})

export const thin: Style = css({
  fontWeight: 300,
})
