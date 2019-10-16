import { useState, useEffect } from 'react'
import useDeck from './use-deck'

const useScale = () => {
  const [ratio, setRatio] = useState(1)
  const { theme } = useDeck()

  const slideWidth = theme.size.width || 1366
  const slideHeight = theme.size.height || 768

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth, innerHeight } = window
      const useVerticalRatio =
        innerWidth / innerHeight > slideWidth / slideHeight
      const newRatio = useVerticalRatio
        ? innerHeight / slideHeight
        : innerWidth / slideWidth
      setRatio(newRatio)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [slideWidth, slideHeight])

  return ratio
}

export default useScale
