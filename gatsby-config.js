const path = require('path');
const fs = require('fs');

const CWD = process.cwd();
const HAS_ASSETS = !!fs.existsSync(path.resolve(CWD, 'assets'));
const IS_LOCAL = CWD === __dirname

const remarkPlugins = [
  require('remark-unwrap-images'),
  require('remark-emoji')
]

const gatsbyRemarkPlugins = [
  'gatsby-remark-import-code'
]

const config = (opts = {}) => ({
  plugins: [
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          'mdx-deck': __dirname,
          'gatsby-theme-mdx-deck': __dirname
        }
      }
    },
    {
      resolve: 'gatsby-plugin-layout',
      options: {
        component: require.resolve('./src/templates/deck.js'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'decks',
        path: 'decks',
      },
    },
    HAS_ASSETS && {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: 'assets',
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.svg$/
        }
      }
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins,
        remarkPlugins,
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-theme-ui'
  ].filter(Boolean),
});

module.exports = IS_LOCAL ? config() : config
