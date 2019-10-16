/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, { Fragment } from 'react'
import Context from '../context'
import useDeck from '../hooks/use-deck'
import useSwipe from '../hooks/use-swipe'
import useScale from '../hooks/use-scale'
import { modes } from '../constants'

export const Slide = ({ slide, index, preview, ...props }) => {
  const outer = useDeck()
  const scale = useScale()
  const swipeProps = useSwipe()
  const context = {
    ...outer,
    index,
    preview,
  }

  const slideWidth = outer.theme.size.width || 1366
  const slideHeight = outer.theme.size.height || 768

  return (
    <Context.Provider value={context}>
      <div
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transform: `scale(${scale})`,
          transformOrigin: 'center'
        }}
      >
        <div
          {...(!preview ? swipeProps : {})}
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
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
      </div>
    </Context.Provider>
  )
}

export default Slide
