/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, { useState, useEffect } from 'react'
import useDeck from '../hooks/use-deck'
import { modes } from '../constants'

export default props => {
  const [width, setWidth] = useState('100vw')
  const [height, setHeight] = useState('100vh')
  const { mode } = useDeck()

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
    document.body.addEventListener('touchmove', stopTouch)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
      document.body.removeEventListener('touchstart', stopTouch)
      document.body.removeEventListener('touchmove', stopTouch)
    }
  }, [mode])

  return (
    <div
      {...props}
      sx={{
        width,
        height,
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
