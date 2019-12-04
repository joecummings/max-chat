
const maxAPI = require("max-api");
const bot = require("./chat.js");

maxAPI.post("Node.js Process Running", maxAPI.POST_LEVELS.INFO);

const handlers = {
	userSentiment: (text) => {
		bot.getSentiment(text, response => {
			maxAPI.outlet("sentiment", response);
		});
	},
	botResponse: (arg1) => {
		maxAPI.post(arg1, maxAPI.POST_LEVELS.INFO);
		bot.getBotResponse(arg1, response => {
			maxAPI.outlet("bot", response.text);
			maxAPI.outlet("sentiment", response.senti);
		});
	}
}

maxAPI.addHandlers(handlers);