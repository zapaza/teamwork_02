import { useEffect, useState } from 'react'

interface FSDocument extends Document {
  msExitFullscreen?: () => Promise<void>
  webkitExitFullscreen?: () => Promise<void>
  msFullscreenElement?: Element
  webkitFullscreenElement?: Element
}

interface FSHTMLElement extends HTMLElement {
  msRequestFullscreen?: () => Promise<void>
  webkitRequestFullscreen?: () => Promise<void>
}

export const toggleFullscreen = (
  element: HTMLElement | undefined,
  type: keyof HTMLElementEventMap | undefined = undefined,
  removeFullscreenListener: true | false = false
) => {
  if (!element) {
    return
  }
  if (type) {
    const handler = () => {
      _toggleFullscreen(element)
    }
    if (!removeFullscreenListener) {
      element.addEventListener(type, handler)
    } else {
      element.removeEventListener(type, handler)
    }
  } else {
    _toggleFullscreen(element)
  }
}
export const _toggleFullscreen = (element: HTMLElement | undefined) => {
  if (!element) {
    return
  }
  if (!document.fullscreenElement) {
    activateFullscreen(element as FSHTMLElement)
  } else {
    deactivateFullscreen()
  }
}
const activateFullscreen = (element: FSHTMLElement) => {
  if (element.requestFullscreen) {
    element.requestFullscreen().then()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen().then()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen().then()
  }
}
const deactivateFullscreen = () => {
  const document: FSDocument = window.document
  if (document.exitFullscreen) {
    document.exitFullscreen().then()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen().then()
  }
}
export const useIsFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false)
  useEffect(() => {
    const handleFullscreen = () => {
      const fullscreenElement =
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement

      setIsFullscreen(!!fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreen)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreen)
    }
  }, [])
  return isFullscreen
}
