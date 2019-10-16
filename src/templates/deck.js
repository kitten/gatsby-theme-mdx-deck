import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Deck from '../components/deck'
import splitSlides from '../split-slides'

export const pageQuery = graphql`
  query($id: String!) {
    deck: deck(id: { eq: $id }) {
      id
      body
    }
  }
`

const wrapper = props => {
  const slides = splitSlides(props)
  return <Deck {...props} slides={slides} />
}

const components = {
  wrapper,
}

const DeckTemplate = ({
  data: {
    deck: { id, body },
  },
  ...props
}) => (
  <MDXRenderer
    {...props}
    components={components}
    children={body}
  />
)

export default DeckTemplate
