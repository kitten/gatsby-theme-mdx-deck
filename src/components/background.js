/** @jsx jsx */
import { jsx } from 'theme-ui'
import useDeck from '../hooks/use-deck'

export const Background = ({ children }) => {
  const { offsetX, offsetY, theme } = useDeck()

  return (
    <div
      id="background"
      sx={{
        position: 'absolute',
        top: -offsetY,
        bottom: -offsetY,
        left: -offsetX,
        right: -offsetX,
        pointerEvents: 'none',
        ...theme.styles.background
      }}
    >
      {children}
    </div>
  )
}
