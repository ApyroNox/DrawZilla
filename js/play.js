class Game {
  constructor(canvas) {
    this.artboard = canvas;
    this.context = canvas.getContext('2d', { alpha: false });
    this.updateScale(400, 300);
    this.clear();
  }

  clear() {
    let color = '#FFFFFF';
    this.context.lineWidth = 1;
    this.context.fillStyle = color;
    this.context.strokeStyle = `${getInvertedColor(color)}`;
    this.context.fillRect(0, 0, this.artboard.width, this.artboard.height);
  }

  updateScale(width, height) {
    const dpr = window.devicePixelRatio;
    // Set the "actual" size of the canvas
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    // Set the "drawn" size of the canvas
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Scale the context to ensure correct drawing operations
    this.context.scale(dpr, dpr);
  }
}

let _game = new Game(document.querySelector('canvas'));

// Listen for the resize event.
window.addEventListener(
  'custom-event:resize',
  (e) => {
    const data = e.detail;
    _game.updateScale(data.rect.width, data.rect.height);
  },
  false
);

function getPressedMouseButtons(event) {
  let buttons = { left: false, center: false, right: false };
  let count = event.buttons;
  if (count - 4 >= 0) {
    count -= 4;
    buttons.center = true;
  }
  if (count - 2 >= 0) {
    count -= 2;
    buttons.right = true;
  }
  if (count - 1 >= 0) {
    count -= 1;
    buttons.left = true;
  }
  return buttons;
}

function getAbsoluteMousePosition(event) {
  return {
    x: event.clientX,
    y: event.clientY,
  };
}

function getRelativeMousePosition(event) {
  return {
    x: event.layerX,
    y: event.layerY,
  };
}

_game.artboard.addEventListener('mousemove', (event) => {
  // console.log(getAbsoluteMousePosition(event), getRelativeMousePosition(event), getPressedMouseButtons(event));
});

window.addEventListener('load', () => {
  document.querySelector('#room-next').addEventListener('click', function () {
    let roomNext = { id: uuidv4(), title: 'MyRoom' };
    let roomForwardEvent = new CustomEvent('custom-event:room.forward', { detail: { room: roomNext }, bubbles: true });
    window.dispatchEvent(roomForwardEvent);
  });

  document.querySelector('#room-previous').addEventListener('click', function () {
    let roomPrevious = { id: uuidv4(), title: 'MyRoom' };
    let roomBackwardEvent = new CustomEvent('custom-event:room.backward', { detail: { room: roomPrevious }, bubbles: true });
    window.dispatchEvent(roomBackwardEvent);
  });

  console.warn(history.state);
});

window.addEventListener(
  'beforeunload',
  () => {
    history.pushState(null, '', `${document.head.querySelector('base').href}play.html`);
  },
  false
);

window.addEventListener('custom-event:room.forward', function (event) {
  let data = event.detail;
  history.pushState(data, '', `room/${data.room.id}`);
});

window.addEventListener('custom-event:room.backward', function (event) {
  let data = event.detail;
  history.pushState(data, '', `room/${data.room.id}`);
});

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

window.addEventListener('load', (event) => {
  let _resizeTimeOut = 0;
  const mainElement = document.querySelector('main');

  clearTimeout(_resizeTimeOut);
  resize(mainElement);
  // _resizeTimeOut = setTimeout(resize, 100);

  window.addEventListener('resize', function () {
    clearTimeout(_resizeTimeOut);
    _resizeTimeOut = setTimeout(resize.bind(globalThis, mainElement), 100);
  });
});

//#region Templates

function getTemplate(templateID, includeData = false) {
  return document.getElementById(templateID).content.cloneNode(includeData);
}

function createPlayerListCard(name, avatar) {
  let card = getTemplate('template-player-list-card', true);

  let img = card.querySelector('[data-user="avatar"]');
  img.src = avatar;
  img.title = name;

  document.getElementById('player-list').append(card);
}

function createChatMessageCard(name, message) {
  let card = getTemplate('template-chat-message-card', true);

  card.querySelector('[data-user="name"]').textContent = name;
  card.querySelector('[data-user="message"]').textContent = message;

  document.getElementById('chat-container').append(card);
}

//#endregion
