// @flow

import {
  GitHub,
  LinkedIn,
  StackOverflow,
  Tessel,
  Twitter,
  Yarn,
} from '../../shared/components/svgs'

const state = {
  contributions: [],
  jobs: [
    { name: 'Juristat', start: 'April 2017' },
    { name: 'Monsanto', start: 'September 2015', end: 'April 2017' },
    { name: 'Safety National', start: 'December 2013', end: 'September 2015' },
    { name: 'SteadyRain', start: 'February 2012', end: 'December 2013' },
    { name: 'CSC', start: 'April 2011', end: 'February 2012' },
    { name: 'Panera Bread', start: 'March 2007', end: 'March 2011' },
  ],
  profiles: [
    { component: GitHub, to: '//github.com/wyze' },
    { component: Twitter, to: '//twitter.com/wyze' },
    { component: LinkedIn, to: '//linkedin.com/in/neilkistner' },
    {
      component: StackOverflow,
      to: '//stackoverflow.com/users/1507905/neil-kistner',
    },
  ],
  projects: [],
  teams: [
    { component: Yarn, to: '//yarnpkg.com' },
    { component: Tessel, to: '//tessel.io' },
  ],
}

export default state
