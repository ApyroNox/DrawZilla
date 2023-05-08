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

	document.getElementById('chat').append(card);
}

function repeat(limit, action, ...args) {
	for (let count = 0; count < limit; count++) {
		action(...args);
	}
}
