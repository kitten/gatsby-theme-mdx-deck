/** @jsx jsx */
import { jsx } from 'theme-ui'
import useDeck from '../hooks/use-deck'

export const Zoom = ({ zoom = 1, ...props }) => {
  const { theme } = useDeck()
  const slideWidth = theme.size.width || 1366
  const slideHeight = theme.size.height || 768

  return (
    <div
      sx={{
        boxSizing: 'border-box',
        width: '100%',
        position: 'relative',
        pb: `${100 / (slideWidth / slideHeight)}%`
      }}>
      <div
        {...props}
        sx={{
          boxSizing: 'border-box',
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: `${(1 / zoom) * 100}%`,
          height: `${(1 / zoom) * 100}%`,
          transform: `translate(-50%, -50%) scale(${zoom})`,
          transformOrigin: 'center',
        }}
      />
    </div>
  )
}

export default Zoom
