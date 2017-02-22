// @flow

/**
 * Credit for ghost: http://codepen.io/parulbhatti/pen/KzvLYr
 */

import '../styles/global'
import { GhostElectric } from '../components/svgs'
import type { Style, VNode } from '../../types'
import { centered } from '../styles'
import { css } from 'glamor'
import Button from '../components/Button'
import H2 from '../components/H2'
import H3 from '../components/H3'
import preact from 'preact'

const underline: Style = css({
  width: '5em',
  height: '.12em',
  background: '#8bc34a',
  margin: '1em auto',
})

const ServerError = (): VNode => (
  <div {...centered}>
    <GhostElectric />
    <H2>Internal Server Error</H2>
    <div {...underline} />
    <H3>Sorry! Something went wrong on my side.</H3>
    <Button text="Try Again" />
  </div>
)

export default ServerError
