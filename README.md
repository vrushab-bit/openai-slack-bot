## Slack Chatbot with OpenAI Integration

This repository contains a Slack chatbot implementation that leverages OpenAI for basic responses and file download functionality.

**Features:**

* Responds to user messages with greetings and basic conversation using OpenAI's "gpt-3.5-turbo" model (customizable).
* Downloads files uploaded to the channel.
* Modular code structure for better organization.

**Requirements:**

* Slack App with appropriate permissions (`files:read` for downloads)
* OpenAI API Key

**Setup:**

1. Clone this repository.
2. Create a `.env` file in the project root directory with the following variables:
   * `SLACK_BOT_TOKEN`
   * `SLACK_SIGNING_SECRET`
   * `APP_TOKEN`
   * `OPENAI_API_KEY`
3. Install dependencies: `npm install`

**Running the App:**

1. Start the Bolt app: `node index.js`

**Deployment:**

This code can be deployed to any platform that supports Node.js. Make sure you configure environment variables for your specific deployment environment.

**Contributing:**

Pull requests and suggestions are welcome!

**License:**

This project is licensed under the MIT License. See the `LICENSE` file for details.
