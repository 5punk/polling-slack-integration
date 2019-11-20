const fetch = require("node-fetch");

const { urls, timeoutInterval } = require("./config.js");
const callSlack = require("./slack-integrate");

const sleep = milliseconds =>
  new Promise(resolve => setTimeout(resolve, milliseconds));

const main = async (it = 0) => {
  urls.map(async ({ id, url }) => {
    try {
      await fetch(url);
      console.log(`[${it}] [${id}]: Safely called ${url}`);
    } catch (ex) {
      const error = `\n_____________\nTimestamp: ${new Date()}\nID: [${id}]\nURL: ${url}\nERROR: ${
        ex.message
      }\n_____________\n`;
      console.error(error);
      await callSlack(error);
      process.exit(1);
    }
  });
  await sleep(timeoutInterval);
  main(++it);
};

main();
