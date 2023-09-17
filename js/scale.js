function resize(element) {
  updateRect(element);
  let [scaleFactor, width, height] = getScalingDetails(element);

  setCSSVariable(element, '--main-content-width', width + config.ScalingDetails.reservedWidth + 'px');
  setCSSVariable(element, '--main-content-height', height + config.ScalingDetails.reservedHeigth + 'px');

  const rect = { width: width, height: height };
  const scalingData = { ratio: config.ScalingDetails.aspectRatio, multiplicator: scaleFactor, rect };
  dispatchCustomResizeEvent(window, scalingData);
}
function getScalingDetails(element) {
  let maxWidth = element._rect.width - config.ScalingDetails.reservedWidth - config.ScalingDetails.padding;
  let maxHeight = element._rect.height - config.ScalingDetails.reservedHeigth - config.ScalingDetails.padding;

  let scaleFactor = isOrientationLandscape()
    ? Math.floor(maxHeight / config.ScalingDetails.aspectRatio.height)
    : Math.floor(maxWidth / config.ScalingDetails.aspectRatio.width);

  let width = scaleFactor * config.ScalingDetails.aspectRatio.width;
  let height = scaleFactor * config.ScalingDetails.aspectRatio.height;

  return [scaleFactor, width, height];
}

function updateRect(element) {
  return (element._rect = element.getBoundingClientRect());
}
function isOrientationLandscape() {
  return document.body.classList.contains('landscape');
}
function setCSSVariable(element, name, value) {
  element.style.setProperty(name, value);
}
function dispatchCustomResizeEvent(element, details) {
  let resizeEvent = new CustomEvent('custom-event:resize', { detail: details, bubbles: true });
  element.dispatchEvent(resizeEvent);
}

window.addEventListener('load', (event) => {
  let _resizeTimeOut;
  const mainElement = document.querySelector('main');

  clearTimeout(_resizeTimeOut);
  resize(mainElement);
  // _resizeTimeOut = setTimeout(resize, 100);

  window.addEventListener('resize', function () {
    clearTimeout(_resizeTimeOut);
    _resizeTimeOut = setTimeout(resize.bind(globalThis, mainElement), 100);
  });
});
