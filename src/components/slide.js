/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, { Fragment } from 'react'
import Context from '../context'
import useDeck from '../hooks/use-deck'
import useSwipe from '../hooks/use-swipe'
import { modes } from '../constants'

export const Slide = ({ slide, index, preview, ...props }) => {
  const outer = useDeck()
  const swipeProps = useSwipe()
  const context = {
    ...outer,
    index,
    preview,
  }

  const slideWidth = outer.theme.size.width
  const slideHeight = outer.theme.size.height

  return (
    <Context.Provider value={context}>
      <div
        {...(!preview ? swipeProps : {})}
        sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) scale(${outer.scale})`,
          transformOrigin: 'center',
          boxSizing: 'border-box',
          width: `${slideWidth}px`,
          height: `${slideHeight}px`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'text',
          bg: 'background',
          variant: 'styles.Slide',
        }}>
        {slide}
      </div>
    </Context.Provider>
  )
}

export default Slide
