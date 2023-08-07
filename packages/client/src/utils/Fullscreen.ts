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
export const useToggleFullscreen = (
  type: keyof HTMLElementEventMap,
  element: HTMLElement | null
) => {
  if (element) {
    element.addEventListener(type, () => toggleFullscreen(element))
  }
}
export const toggleFullscreen = (element: Element) => {
  if (!document.fullscreenElement) {
    activateFullscreen(element as FSHTMLElement)
  } else {
    deactivateFullscreen()
  }
}
export const activateFullscreen = (element: FSHTMLElement) => {
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

export const deactivateFullscreen = () => {
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
