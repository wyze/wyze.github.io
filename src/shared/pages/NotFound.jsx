// @flow

/**
 * Credit for ghost and shadow: http://codepen.io/helenvholmes/pen/pecdI
 */

import '../styles/global'
import { GhostFloating, Shadow } from '../components/svgs'
import type { Style, VNode } from '../../types'
import { centered } from '../styles'
import { css } from 'glamor'
import H1 from '../components/H1'
import preact from 'preact'

const shadow: Style = css({
  marginTop: '1em',
  width: '8em',
})

const NotFound = (): VNode => (
  <div {...centered}>
    <GhostFloating />
    <div {...shadow}>
      <Shadow />
    </div>

    <H1>Whoops!</H1>
    <div>
      <div>We couldn&apos;t find the page you</div>
      <div>were looking for.</div>
    </div>
  </div>
)

export default NotFound
