import { useState, useEffect } from 'react'

const useScale = (
  slideWidth = 1366,
  slideHeight = 768
) => {
  const [ratio, setRatio] = useState(1)

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
