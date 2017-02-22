// @flow

import type { Job, Jobs, VNode } from '../../types'
import Box from '../components/Box'
import Employer from '../components/Employer'
import preact from 'preact'

type Props = {
  jobs: Jobs,
}

const Employment = ({ jobs }: Props): VNode => (
  <Box wrap title="Employment">
    {jobs.map(( job: Job ): VNode => (
      <Employer key={job.name} {...job} />
    ))}
  </Box>
)

export default Employment
