/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, { Fragment, useMemo } from 'react'

import Context from '../context'
import useDeck from '../hooks/use-deck'
import useSwipe from '../hooks/use-swipe'
import useScale from '../hooks/use-scale'
import { modes } from '../constants'

export const Slide = ({ slide, index, preview, className }) => {
  const outer = useDeck()
  const slideWidth = outer.theme.size.width
  const slideHeight = outer.theme.size.height

  const [containerRef, scale] = useScale(slideWidth, slideHeight)
  const swipeProps = useSwipe()

  const context = useMemo(() => ({
    ...outer,
    ...scale,
    index,
    preview,
  }), [outer, scale, index, preview])

  return (
    <Context.Provider value={context}>
      <div
        {...(!preview ? swipeProps : {})}
        ref={containerRef}
        className={className}
        sx={{
          position: 'relative',
          height: '100%',
          width: '100%',
          pb: preview ? `${100 * (slideHeight / slideWidth)}%` : null,
          overflow: preview ? 'hidden' : null
        }}
      >
        <div
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) scale(${scale.ratio})`,
            transformOrigin: 'center',
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
