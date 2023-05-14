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

function getInvert(hex) {
	return (Number(`0x1${hex}`) ^ 0xffffff).toString(16).substring(1).toUpperCase();
}

class GameCanvas {
	constructor(canvas) {
		this.artboard = canvas;
		this.context = canvas.getContext('2d', { alpha: false });
		this.updateScale(400, 300);
		this.clear();
	}

	clear() {
		let color = 'FFFFFF';
		this.context.lineWidth = 1;
		this.context.fillStyle = `#${color}`;
		this.context.strokeStyle = `#${getInvert(color)}`;
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

let mainCanvas = new GameCanvas(document.querySelector('canvas'));

// Listen for the event.
window.addEventListener(
	'custom-resize',
	(e) => {
		const data = e.detail;
		mainCanvas.updateScale(data.rect.width, data.rect.height);
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

mainCanvas.artboard.addEventListener('mousemove', (event) => {
	// console.log(getAbsoluteMousePosition(event), getRelativeMousePosition(event), getPressedMouseButtons(event));
});

var cPushArray = new Array();
var cStep = -1;
var ctx;
// ctx = document.getElementById('myCanvas').getContext("2d");

function cPush() {
	cStep++;
	if (cStep < cPushArray.length) {
		cPushArray.length = cStep;
	}
	cPushArray.push(document.getElementById('myCanvas').toDataURL());
}
function cUndo() {
	if (cStep > 0) {
		cStep--;
		var canvasPic = new Image();
		canvasPic.src = cPushArray[cStep];
		canvasPic.onload = function () {
			ctx.drawImage(canvasPic, 0, 0);
		};
	}
}
function cRedo() {
	if (cStep < cPushArray.length - 1) {
		cStep++;
		var canvasPic = new Image();
		canvasPic.src = cPushArray[cStep];
		canvasPic.onload = function () {
			ctx.drawImage(canvasPic, 0, 0);
		};
	}
}
