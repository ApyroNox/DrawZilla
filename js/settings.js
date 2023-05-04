let settings = {
	config: {},
	save: function () {
		localStorage.setItem('settings', JSON.stringify(this.config));
	},
	load: function () {
		this.config = JSON.parse(localStorage.getItem('settings')) || {};
	},
};

let loadSettings = function () {
	settings.load();
};

let saveSettings = function () {
	settings.save();
};

window.addEventListener('load', () => {
	loadSettings();
});
window.addEventListener(
	'beforeunload',
	() => {
		saveSettings();
	},
	false
);
