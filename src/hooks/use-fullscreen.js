import { useLayoutEffect } from 'react'

const requestFullscreen = element => {
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element['mozRequestFullScreen']) {
    element['mozRequestFullScreen']()
  } else if (element['webkitRequestFullscreen']) {
    element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
  } else if (element['msRequestFullscreen']) {
    element['msRequestFullscreen']()
  }
}

const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document['mozCancelFullScreen']) {
    document['mozCancelFullScreen']()
  } else if (document['webkitExitFullscreen']) {
    document['webkitExitFullscreen']()
  } else if (document['msExitFullscreen']) {
    document['msExitFullscreen']()
  }
}

const getFullscreenElement = () =>
  document['fullscreenElement'] ||
  document['webkitFullscreenElement'] ||
  document['mozFullScreenElement'] ||
  document['msFullscreenElement'] ||
  null

const useFullscreen = (ref, isFullscreen) => {
  useLayoutEffect(() => {
    const { current: element } = ref
    let fullscreenElement = getFullscreenElement()

    if (
      !element ||
      fullscreenElement !== element ||
      !isFullscreen
    ) {
      fullscreenElement = null
      exitFullscreen()
    }

    if (isFullscreen && element && !fullscreenElement) {
      fullscreenElement = element
      requestFullscreen(element)
    }

    if (fullscreenElement && isFullscreen) {
      return () => exitFullscreen
    }
  }, [ref.current, isFullscreen])
}

export default useFullscreen
