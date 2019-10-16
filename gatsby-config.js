const IS_LOCAL = process.cwd() === __dirname

const remarkPlugins = [require('remark-unwrap-images'), require('remark-emoji')]
const gatsbyRemarkPlugins = [`gatsby-remark-import-code`]

const config = (opts = {}) => ({
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'decks',
        path: 'decks',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: 'assets',
      },
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
    'gatsby-plugin-theme-ui',
    {
      resolve: 'gatsby-plugin-compile-es6-packages',
      options: {
        modules: ['@philpl/gatsby-theme-mdx-deck'],
      },
    },
  ].filter(Boolean),
});

module.exports = IS_LOCAL ? config() : config
