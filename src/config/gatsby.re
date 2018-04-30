Dotenv.config();

[%%raw {|
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/src/data/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'queries',
        path: `${__dirname}/src/queries/`,
      },
    },
    {
      resolve: '@wyze/gatsby-source-graphql',
      options: {
        headers: {
          authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
        url: 'https://api.github.com/graphql',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Neil Kistner | St. Louis Software Engineer',
        short_name: 'NeilKistner',
        start_url: '/',
        background_color: '#4b79a1',
        theme_color: '#ffffff',
        display: 'standalone',
        icon: 'src/images/reason.png',
      },
    },
    {
      resolve: 'gatsby-plugin-favicon',
      options: {
        logo: './src/images/reason.png',
        inject: true,
        icons: {
          android: false,
        },
      },
    },
    {
      resolve: '@wyze/gatsby-plugin-google-analytics',
      options: {
        gaPlugins: {
          config: [
            {
              name: 'eventTracker',
              options: {
                events: [ 'click', 'contextmenu' ],
                hitFilter: [
                  '@@/ga-function',
                  [ 'model', 'element', 'event', `model.set('eventAction',event.type,true)` ],
                ],
              },
            },
            {
              name: 'impressionTracker',
              options: {
                elements: [
                  'Introduction',
                  'MeAroundTheInternet',
                  'Employment',
                  'CoreTeamMember',
                  'ContributionsMade',
                  'OpenSourceProjects',
                  'Conclusion',
                ],
                fieldsObj: {
                  nonInteraction: false,
                },
              },
            },
            {
              name: 'outboundLinkTracker',
              options: {
                events: [ 'click', 'contextmenu' ],
              },
            },
          ],
          sources: [
            'js/autotrack.custom.js',
          ],
        },
        trackingId: 'UA-4907572-11',
      },
    },
    '@wyze/gatsby-plugin',
    'gatsby-plugin-glamor',
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
  ],
}
|}];
