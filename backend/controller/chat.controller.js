import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCCb2KD1T9sWNvh9Qm-yrlLpDEL7X3-Ed8");

export const getAiMessage = async (req, res) => {
  const { message } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent(message);
    const response = result.response.text();

    res.status(200).send({
      success: true,
      message: "Message fetched successfully",
      aiMessage: response,
    });

  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).send({ success: false, message: "Failed to get AI response" });
  }
};
