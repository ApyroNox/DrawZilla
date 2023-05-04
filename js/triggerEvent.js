function triggerEvent(el, eventName, options) {
  var event
  if (window.CustomEvent) {
    event = new CustomEvent(eventName, options)
  } else {
    console.error('stop')
  }
  el.dispatchEvent(event)
}
