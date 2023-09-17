const config = {
  MediaObserver: {
    'prefers-color-scheme': false,
    orientation: true,
    device: true,
  },
  ScalingDetails: {
    reservedHeigth: 56,
    reservedWidth: 0,
    padding: 16,
    aspectRatio: {
      width: 4,
      height: 3,
    },
  },
};

function getInvertedColor(hex) {
  if (hex.startsWith('#')) hex = hex.substring(1);
  return (Number(`0x1${hex}`) ^ 0xffffff).toString(16).substring(1).toUpperCase();
}

function setCSSVariable(element, name, value) {
  element.style.setProperty(name, value);
}

function dispatchCustomResizeEvent(element, details) {
  let resizeEvent = new CustomEvent('custom-event:resize', { detail: details, bubbles: true });
  element.dispatchEvent(resizeEvent);
}

const uuidv4 =
  crypto.randomUUID ??
  function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

window.addEventListener('load', () => {});
window.addEventListener('beforeunload', () => {}, false);
