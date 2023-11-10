import type { ComponentProps } from 'react'

import { Box, Icon, IconType, Link, Me, Section } from '~/components'

declare module '@remix-run/server-runtime' {
  interface AppLoadContext {
    PERSONAL: KVNamespace
  }
}

function SocialIcon(props: ComponentProps<typeof Icon>) {
  return <Icon className="my-1 basis-1/2 sm:my-0 sm:basis-1/4" {...props} />
}

export default function Index() {
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
