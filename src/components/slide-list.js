/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, { useEffect, useRef } from 'react'
import Slide from './slide'
import useDeck from '../hooks/use-deck'

const noop = () => {}

export const SlideList = ({
  slides = [],
  onClick = noop,
  ...props
}) => {
  const { index, theme } = useDeck()
  const slideWidth = theme.size.width
  const slideHeight = theme.size.height
  const thumb = useRef(null)

  useEffect(() => {
    const el = thumb.current
    if (!el) return
    if (typeof el.scrollIntoViewIfNeeded === 'function') {
      el.scrollIntoViewIfNeeded()
    }
  })

  return (
    <React.Fragment>
      {slides.map((slide, i) => (
        <div
          {...props}
          key={i}
          role="link"
          ref={i === index ? thumb : null}
          onClick={e => {
            onClick(i)
          }}
          style={
            index === i
              ? {
                  position: 'relative',
                  zIndex: 1,
                }
              : null
          }
          sx={{
            m: 2,
            cursor: 'pointer',
            border: theme => index === i
              ? `4px solid ${theme.colors.primary}`
              : null,
            bg: 'background',
            overflow: 'hidden'
          }}
        >
          <Slide slide={slide} preview />
        </div>
      ))}
    </React.Fragment>
  )
}

export default SlideList
