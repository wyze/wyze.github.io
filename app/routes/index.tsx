import { type LoaderArgs, json } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import type { ComponentProps } from 'react'

import {
  Box,
  Employer,
  GitHubItem,
  Icon,
  IconType,
  Link,
  Me,
  Section,
} from '~/components'
import { getData } from '~/services/github.server'

declare module '@remix-run/server-runtime' {
  interface AppLoadContext {
    PERSONAL: KVNamespace
  }
}

type Data = Awaited<ReturnType<typeof getData>>

export async function loader({ context }: LoaderArgs) {
  const key = 'data'
  const kv = context.PERSONAL
  const cache = await kv.get<Data>(key, { type: 'json' })

  if (cache) {
    return json(cache)
  }

  const data = await getData(context)

  await kv.put(key, JSON.stringify(data), { expirationTtl: 86_400 })

  return json(data)
}

function SocialIcon(props: ComponentProps<typeof Icon>) {
  return <Icon className="my-1 basis-1/2 sm:my-0 sm:basis-1/4" {...props} />
}

function TeamIcon(props: ComponentProps<typeof Icon>) {
  return (
    <Icon
      className="w-full space-y-2 md:w-1/2 md:last:ml-[25%] lg:w-1/3 lg:last:ml-0"
      {...props}
    />
  )
}

export default function Index() {
  const { contributions, projects } = useLoaderData<typeof loader>()

  return (
    <main className="space-y-10 px-6 py-10 lg:space-y-20 lg:px-12 lg:py-20">
      <Box className="space-y-2" wrap>
        <Me />
        <Section className="flex w-full flex-1 basis-20">
          <h1 className="w-full text-3xl font-light">
            Hello, I{"'"}m <strong>Neil Kistner</strong>, a software engineer in{' '}
            <strong>St. Louis</strong>.
          </h1>
        </Section>
      </Box>
      <Box title="Me Around The Internet" wrap>
        <SocialIcon href="//github.com/wyze" icon={IconType.GitHub} />
        <SocialIcon href="//twitter.com/wyze" icon={IconType.Twitter} />
        <SocialIcon
          href="//linkedin.com/in/neilkistner"
          icon={IconType.LinkedIn}
        />
        <SocialIcon
          href="//stackoverflow.com/users/1507905/neil-kistner"
          icon={IconType.StackOverflow}
        />
      </Box>
      <Box
        className="grid grid-cols-1 gap-x-20 gap-y-2 md:grid-cols-2"
        title="Employment"
        grid
      >
        <Employer start="April 2017">Juristat</Employer>
        <Employer end="April 2017" start="September 2015">
          Monsanto
        </Employer>
        <Employer end="September 2015" start="December 2013">
          Safety National
        </Employer>
        <Employer end="December 2013" start="February 2012">
          SteadyRain
        </Employer>
        <Employer end="February 2012" start="April 2011">
          CSC
        </Employer>
        <Employer end="March 2011" start="March 2007">
          Panera Bread
        </Employer>
      </Box>
      <Box title="Core Team Member" wrap>
        <TeamIcon href="//yarnpkg.com" icon={IconType.Yarn} />
        <TeamIcon href="//tessel.io" icon={IconType.Tessel} />
        <TeamIcon href="//starship.rs" icon={IconType.Starship} />
      </Box>
      <Box
        className="grid gap-2 md:grid-cols-2 lg:grid-cols-3"
        grid
        title="Contributions Made"
      >
        {contributions.map((contribution) => (
          <GitHubItem key={contribution.name} {...contribution} />
        ))}
      </Box>
      <Box
        className="grid gap-2 md:grid-cols-2 lg:grid-cols-3"
        grid
        title="Open Source Projects"
      >
        {projects.map((project) => (
          <GitHubItem key={project.name} {...project} />
        ))}
      </Box>
      <Box>
        <Section className="w-full">
          <h2 className="text-3xl font-light">
            Download <Link href="/assets/resume.pdf">résumé</Link>. View{' '}
            <Link href="//github.com/wyze/wyze.github.io">source</Link>.
          </h2>
        </Section>
      </Box>
    </main>
  )
}
