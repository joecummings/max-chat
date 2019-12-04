const APIAI_TOKEN = "d23935a66490482f84a82ecc4dda7023";
const APIAI_SESSION_ID = "random";

const { SentimentManager } = require('node-nlp');
const apiai = require('apiai')(APIAI_TOKEN);

const sentiment = new SentimentManager();

module.exports.getBotResponse = (userInput, callback) => {
    let apiaiReq = apiai.textRequest(userInput, {
        sessionId: APIAI_SESSION_ID
    });

    apiaiReq.on('response', (botResponse) => {
        var botText = botResponse.result.fulfillment.speech;
        sentiment.process('en', botText)
                 .then((res) => {callback({text: botText, senti: res.score});})
    });

    apiaiReq.on('error', (error) => {
        console.log(error);
      });
  
    apiaiReq.end();
}

module.exports.getSentiment = (userInput, callback) => {
    sentiment.process('en', userInput)
             .then((res) => {callback(res.score)})
}


	


