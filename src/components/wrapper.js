/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, { useRef, useState, useEffect } from 'react'

import useFullscreen from '../hooks/use-fullscreen'
import useDeck from '../hooks/use-deck'
import { modes } from '../constants'
import { requestFullscreen, exitFullscreen  } from '../constants'

export default props => {
  const containerRef = useRef(null)
  const [width, setWidth] = useState('100vw')
  const [height, setHeight] = useState('100vh')
  const { mode, fullscreen } = useDeck()

  useFullscreen(containerRef, !!fullscreen)

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth, innerHeight } = window
      setWidth(innerWidth)
      setHeight(innerHeight)
    }

    const stopTouch = e => {
      if (mode !== modes.normal) return
      e.preventDefault()
    }

    handleResize()

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)
    document.body.addEventListener('touchstart', stopTouch)
    document.body.style.position = 'fixed'

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
      document.body.removeEventListener('touchstart', stopTouch)
      document.body.style.position = 'initial'
    }
  }, [mode])

  return (
    <div
      {...props}
      ref={containerRef}
      sx={{
        bg: fullscreen ? 'background' : null,
        width: fullscreen ? '100vw' : width,
        height: fullscreen ? '100vh' : height,
        position: 'relative',
        overflow: 'hidden',

        variant: 'styles.root',
        '*': {
          boxSizing: 'border-box',
        },
      }}
    />
  )
}
