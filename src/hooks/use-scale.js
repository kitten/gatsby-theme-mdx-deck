import { useState, useEffect } from 'react'

const useScale = (
  slideWidth = 1366,
  slideHeight = 768
) => {
  const [ratio, setRatio] = useState(1)
  const [offsetX, setOffsetX] = useState(0)
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth, innerHeight } = window
      const useVerticalRatio =
        innerWidth / innerHeight > slideWidth / slideHeight
      const ratio = useVerticalRatio
        ? innerHeight / slideHeight
        : innerWidth / slideWidth
      const offsetX = useVerticalRatio
        ? ((innerWidth - slideWidth * ratio) / 2) / ratio
        : 0
      const offsetY = !useVerticalRatio
        ? ((innerHeight - slideHeight * ratio) / 2) / ratio
        : 0
      setRatio(ratio)
      setOffsetX(offsetX)
      setOffsetY(offsetY)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [slideWidth, slideHeight])

  return { offsetX, offsetY, scale: ratio }
}

export default useScale
