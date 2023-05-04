let mainElement = document.querySelector('main');

function getBoundingRects(...elements) {
	elements.forEach((element) => {
		element.boundings = element.getBoundingClientRect();
	});
}

function checkElementClass(domElement, cssClass) {
	return domElement.classList.contains(cssClass);
}

function getScalingConfig(containerElement) {
	// calculate positions
	getBoundingRects(containerElement);

	let containerBounds = containerElement.boundings;
	let factor = 1;

	// factor = Number((canvasBounds.width * 0.25 * 0.01).toFixed(2));
	// or
	if (checkElementClass(document.body, 'portrait')) {
		factor = (containerBounds.width * 0.25 * 0.01).toFixed(2);
	} else if (checkElementClass(document.body, 'landscape')) {
		factor = ((containerBounds.height - 54) * 0.3325 * 0.01).toFixed(2);
	}

	let width = Math.floor(400 * factor);
	let height = Math.floor(300 * factor);

	if (height > containerBounds.height) {
		// factor = Number((containerBounds.height * 0.3325 * 0.01).toFixed(2));
		width = Math.floor(400 * factor);
		height = Math.floor(300 * factor);
	}

	return [factor, width, height + 56];
}

function setCanvasParameter(scaleFactor) {
	document.querySelector('canvas#canvas')?.style.setProperty('--canvas-scale-factor', scaleFactor);
}

function setMainParameter(width) {
	document.querySelector('main').style.setProperty('--width-left', width);
}

function resize() {
	// reset styles
	setMainParameter('3fr');
	setCanvasParameter(1);
	// if (checkElementClass(document.body, 'portrait')) isPortrait = mainElement.boundings.width - canvasContainerElement.boundings.width > 300;

	let elementToScale = document.querySelector('#content');

	var [factor, width, height] = getScalingConfig(elementToScale);

	// set styles
	let widthParsed = width.toString() + 'px';
	let heightParsed = height.toString() + 'px';

	localStorage.setItem('preloaded.content.width', widthParsed);
	localStorage.setItem('preloaded.content.height', heightParsed);

	setMainParameter(checkElementClass(document.body, 'landscape') ? widthParsed : heightParsed);
	setCanvasParameter(factor);

	return;
}

// document.addEventListener('DOMContentLoaded', (event) => {
// 	console.log('document.DOMContentLoaded');
// });
// document.addEventListener('readystatechange', (event) => {
// 	console.log(`document.readystatechange.${document.readyState}`);
// });
// window.addEventListener('load', (event) => {
// 	console.log('window.load');
// });

window.addEventListener('load', (event) => {
	let _resizeTimeOut;

	clearTimeout(_resizeTimeOut);
	_resizeTimeOut = setTimeout(resize, 100);

	window.addEventListener('resize', function () {
		clearTimeout(_resizeTimeOut);
		_resizeTimeOut = setTimeout(resize, 100);
	});
});
