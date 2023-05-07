let contentElement = document.querySelector('#main-content');
let toolsHeight = 56;

function getBoundingRects(...elements) {
	elements.forEach((element) => {
		element.boundings = element.getBoundingClientRect();
	});
}

function getFactor(containerBounds) {
	if (checkElementClass(document.body, 'portrait')) {
		return (containerBounds.width * 0.25 * 0.01).toFixed(2);
	} else if (checkElementClass(document.body, 'landscape')) {
		return ((containerBounds.height - (toolsHeight - 2)) * 0.3325 * 0.01).toFixed(2);
	}
	return 1;
}

function getScalingConfig(containerElement) {
	getBoundingRects(containerElement);

	let factor = getFactor(containerElement.boundings);
	let width = Math.floor(400 * factor);
	let height = Math.floor(300 * factor);

	return [factor, width, height + toolsHeight];
}

function setCanvasParameter(scaleFactor) {
	document.querySelector('canvas#canvas')?.style.setProperty('--canvas-scale-factor', scaleFactor);
}

function setMainParameter(width) {
	document.querySelector('main').style.setProperty('--width-left', width);
}

function checkElementClass(element, cssClass) {
	return element.classList.contains(cssClass);
}

function resize() {
	// reset styles
	setMainParameter('3fr');
	setCanvasParameter(1);
	// if (checkElementClass(document.body, 'portrait')) isPortrait = mainElement.boundings.width - canvasContainerElement.boundings.width > 300;

	let [factor, width, height] = getScalingConfig(contentElement);

	let scale = checkElementClass(document.body, 'landscape') ? width.toString() + 'px' : height.toString() + 'px';

	setMainParameter(scale);
	setCanvasParameter(factor);
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
	resize();
	// _resizeTimeOut = setTimeout(resize, 100);

	window.addEventListener('resize', function () {
		clearTimeout(_resizeTimeOut);
		_resizeTimeOut = setTimeout(resize, 100);
	});
});
