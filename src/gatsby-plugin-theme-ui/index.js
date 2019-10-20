export default {
  size: {
    width: 1366,
    height: 768
  },
  transition: [
    { opacity: 0 },
    { opacity: 1 },
    { opacity: 0 },
  ],
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#07c',
    secondary: '#80c',
    muted: '#f6f6ff',
  },
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'inherit',
    monospace: '"Roboto Mono", Menlo, monospace',
    ui: 'system-ui, sans-serif',
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  fontWeights: {
    body: 500,
    heading: 700,
    bold: 700,
  },
  text: {
    heading: {
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
    },
  },
  styles: {
    Slide: {
      fontFamily: 'body',
      fontSize: [3, 4, 5, 6],
    },
    Background: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    h1: {
      variant: 'text.heading',
    },
    h2: {
      variant: 'text.heading',
    },
    h3: {
      variant: 'text.heading',
    },
    h4: {
      variant: 'text.heading',
    },
    h5: {
      variant: 'text.heading',
    },
    h6: {
      variant: 'text.heading',
    },
    a: {
      color: 'primary',
    },
    ul: {
      m: 0,
    },
    ol: {
      m: 0,
    },
    inlineCode: {
      fontFamily: 'monospace',
    },
    code: {
      fontFamily: 'monospace',
    },
    pre: {
      fontFamily: 'monospace',
      p: 3,
    },
    img: {
      maxWidth: '100%',
      height: 'auto',
      objectFit: 'cover',
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
    },
    th: {
      textAlign: 'left',
      paddingRight: '.5em',
      paddingTop: '.25em',
      paddingBottom: '.25em',
      borderBottom: '1px solid',
      verticalAlign: 'top',
    },
    td: {
      textAlign: 'left',
      paddingRight: '.5em',
      paddingTop: '.25em',
      paddingBottom: '.25em',
      borderBottom: '1px solid',
      verticalAlign: 'top',
    },
    blockquote: {
      fontWeight: 'bold',
    },
  },
}
