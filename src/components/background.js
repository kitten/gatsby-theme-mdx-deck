/** @jsx jsx */
import { jsx } from 'theme-ui'
import useDeck from '../hooks/use-deck'

export const Background = ({ children,...props }) => {
  const { scale: { offsetX, offsetY } } = useDeck()

  return (
    <div
      {...props}
      sx={{
        position: 'absolute',
        top: -offsetY,
        bottom: -offsetY,
        left: -offsetX,
        right: -offsetX,
        pointerEvents: 'none',
        variant: 'styles.Background',
      }}
    >
      {children}
    </div>
  )
}
