const axios = require("axios");
require("dotenv").config();
const dayjs = require("dayjs");

const TOGETHER_API_URL = "https://api.together.xyz/v1/chat/completions";

exports.generateAIResponse = async (
  goal_description,
  target_amount,
  target_date
) => {
  try {
    const now = dayjs();
    const end = dayjs(target_date);

    const months = end.diff(now, "month");
    const days = end.diff(now, "day");

    const userPrompt = `
${goal_description}
Target amount: $${target_amount}
Target date: ${target_date}
There are ${months} months (${days} days) left until the target date.
In 2-3 sentences (max 40 words), give a clear, actionable savings plan for this goal. Include the monthly or weekly amount to save and one practical tip. Do not show your reasoning or thinking steps.
`;

const response = await axios.post(
  TOGETHER_API_URL,
  {
    model: "Qwen/Qwen3-235B-A22B-fp8-tput",
    messages: [
      {
        role: "system",
        content:
          "You are a financial assistant. Always use the target amount and target date to create a concrete, concise plan. Respond in 2-3 sentences and no more than 40 words. Do not show your reasoning or thinking steps.",
      },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.7,
  },
  {
    headers: {
      Authorization: `Bearer ${process.env.TOGETHER_AI_API_KEY}`,
      "Content-Type": "application/json",
    },
  }
);
  

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(
      "AI generation failed:",
      error.response?.data || error.message
    );
    throw new Error("Failed to generate AI response");
  }
};
