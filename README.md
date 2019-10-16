# `@philpl/gatsby-theme-mdx-deck`

This is a modified version of [`gatsby-theme-mdx-deck`](https://github.com/jxnblk/mdx-deck/tree/master/packages/gatsby-theme). It makes a couple of small changes on top of the default theme:

- Fix `split-slides.js` for some custom JSX
- Add support for inline SVG
- Remove `print` support
- Add `theme.size.{width.height}` to replace `theme.aspectRatio`

The `theme.size` values are used to create fixed size slides. Every
slide will have a fixed pixel size of that exact value (by default `1366x768px`)
and will be scaled to fit in the current viewport. This makes it easier to
position and scale things consistently on each slide.

Add MDX Deck presentations to any Gatsby site

```sh
npm i gatsby-theme-mdx-deck
```

```js
// gatsby-config.js
module.exports = {
  plugins: [
    'gatsby-theme-mdx-deck',
  ]
}
```

Add one or more MDX presentation files to the `decks/` directory.
The filenames will be used for creating routes to each deck.

Example `decks/hello.mdx`

```mdx
# Hello!

---

## Beep boop
```

## Layouts

Individual slides can be wrapped with layout components,
which work similarly to slide templates found in other presentation software.

Example `decks/hello.mdx`

```mdx
import Layout from './my-layout'

<Layout>

# Hello

</Layout>

---

## Beep boop
```

## Configuration Options

The Gatsby theme accepts the following options.

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-theme-mdx-deck',
      options: {
        // enable or disable gatsby-plugin-mdx
        mdx: false,
        // source directory
        contentPath: 'decks',
        // base path for routes generate by this theme
        basePath: ''
      }
    }
  ]
}
```

MIT License
