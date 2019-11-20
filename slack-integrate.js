const { IncomingWebhook } = require("@slack/webhook");

const {
  slack: { url, channel }
} = require("./config");

const webhook = new IncomingWebhook(url);

const options = msg => ({
  channel,
  username: "connectivity-bot",
  text: msg,
  icon_emoji: ":ghost:"
});

const callSlack = msg => {
  return webhook.send(options(msg));
};

module.exports = callSlack;
