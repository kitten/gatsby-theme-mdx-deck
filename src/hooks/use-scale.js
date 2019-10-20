import { useState, useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import useDeck from './use-deck'

const useIsomorphicEffect = typeof window === 'undefined'
  ? useEffect
  : useLayoutEffect;
const initialState = {
  ratio: 1,
  offsetX: 0,
  offsetY: 0
};

const useScale = (slideWidth, slideHeight) => {
  const ref = useRef(null)
  const [ratio, setRatio] = useState(initialState.ratio)
  const [offsetX, setOffsetX] = useState(initialState.offsetX)
  const [offsetY, setOffsetY] = useState(initialState.offsetY)

  useIsomorphicEffect(() => {
    const handleResize = () => {
      const { current: element } = ref
      if (!element) return

      const { width, height } = element.getBoundingClientRect()
      const useVerticalRatio =
        width / height > slideWidth / slideHeight
      const ratio = useVerticalRatio
        ? height / slideHeight
        : width / slideWidth
      const offsetX = useVerticalRatio
        ? ((width - slideWidth * ratio) / 2) / ratio
        : 0
      const offsetY = !useVerticalRatio
        ? ((height - slideHeight * ratio) / 2) / ratio
        : 0
      setRatio(initialState.ratio = ratio)
      setOffsetX(initialState.offsetX = offsetX)
      setOffsetY(initialState.offsetY = offsetY)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [slideWidth, slideHeight])

  const scale = useMemo(() => ({
    offsetX,
    offsetY,
    ratio
  }), [offsetX, offsetY, ratio])

  return [ref, scale]
}

export default useScale
