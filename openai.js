const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI();

async function getOpenAIResponse(prompt) {
  const chat = [
    {
      role: "system",
      content: "You are a bot for my Slack. Respond to the user",
    },
    {
      role: "user",
      content: prompt,
    },
  ];
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Replace with your preferred model
      messages: chat,
      max_tokens: 1024,
      temperature: 0.7,
    });
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error with OpenAI:", error);
    return "Sorry, I am having some trouble understanding you.";
  }
}

module.exports = { openai, getOpenAIResponse };
