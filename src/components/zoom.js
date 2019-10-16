/** @jsx jsx */
import { jsx } from 'theme-ui'

export const Zoom = ({ zoom = 1, ...props }) => (
  <div
    sx={{
      boxSizing: 'border-box',
      width: '100%',
      position: 'relative',
      height: '100%'
    }}>
    <div
      {...props}
      sx={{
        boxSizing: 'border-box',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        bg: 'cyan',
        width: `${(1 / zoom) * 100}%`,
        height: `${(1 / zoom) * 100}%`,
        transformOrigin: '0 0',
        transform: `scale(${zoom})`,
      }}
    />
  </div>
)

export default Zoom
