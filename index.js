const { App } = require("@slack/bolt");
require("dotenv").config();
const download = require("./download");
const { openai, getOpenAIResponse } = require("./openai");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.APP_TOKEN,
});

// const greetings = [
//   "Hello Human!",
//   "Greetings! How can I be of assistance today?",
//   "Hey there!   What's on your mind?",
// ];

// Choose a random greeting from the array
// function getRandomGreeting() {
//   return greetings[Math.floor(Math.random() * greetings.length)];
// }

// app.message(/hey/i, async ({ message, say }) => {
//   try {
//     say(getRandomGreeting());
//   } catch (error) {
//     console.log("Error:", error);
//   }
// });

// // Add more message listeners with similar structure for other responses
// app.message(/help/i, async ({ message, say }) => {
//   say("Sure, how can I help you? Here are some things I can do:...");
// });

// app.message(/thanks/i, async ({ message, say }) => {
//   say("You're welcome! Glad I could help.");
// });

// // Add another message listener for a fun response
// app.message(/good bot/i, async ({ message, say }) => {
//   say("  Thanks! I try my best.");
// });

app.message("", async ({ message, say }) => {
  if (message.files && message.files.length > 0) {
    const response = await getOpenAIResponse(message.text);
    say(response);

    const downloaded_files = [];
    for (file of message.files) {
      const name = file.name || `downloaded_file_${Date.now()}`;

      try {
        // Get downloadable URL using files.info
        const response = await app.client.files.info({ file: file.id });
        const downloadUrl = response.file.url_private_download;

        // Download the file
        await download(downloadUrl, name);
        downloaded_files.push(name);
        // say(`Successfully downloaded file: ${name}`);
      } catch (error) {
        console.error("Error downloading file:", error);
        say("Failed to download the file. Please try again.");
      }
    }
    say(`Also I've Downloaded ${downloaded_files.join(", ")}`);
  } else {
    // Handle non-file messages
    const response = await getOpenAIResponse(message.text);
    say(response);
  }
});

(async () => {
  const port = 3000;
  await app.start(process.env.PORT || port);
  console.log("⚡Bolt app started!!");
})();
