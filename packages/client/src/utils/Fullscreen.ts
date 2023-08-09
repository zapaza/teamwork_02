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
  type: keyof HTMLElementEventMap,
  element: HTMLElement | null
) => {
  if (element) {
    element.addEventListener(type, () => {
      _toggleFullscreen(element)
    })
  }
}
const _toggleFullscreen = (element: Element) => {
  if (!document.fullscreenElement) {
    activateFullscreen(element as FSHTMLElement)
  } else {
    deactivateFullscreen()
  }
}
const activateFullscreen = (element: FSHTMLElement) => {
  if (element.requestFullscreen) {
    element.requestFullscreen().then(
      () => true,
      () => false
    )
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen().then(
      () => true,
      () => false
    )
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen().then(
      () => true,
      () => false
    )
  }
}
const deactivateFullscreen = () => {
  const document: FSDocument = window.document
  if (document.exitFullscreen) {
    document.exitFullscreen().then(
      () => true,
      () => false
    )
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen().then(
      () => true,
      () => false
    )
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
