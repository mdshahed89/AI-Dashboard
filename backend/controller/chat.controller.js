import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios"

const genAI = new GoogleGenerativeAI("AIzaSyCCb2KD1T9sWNvh9Qm-yrlLpDEL7X3-Ed8");

export const getAiMessage = async (req, res) => {
  const { message, images } = req.body;

  // console.log("i",images);
  

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const parts = [];

    // 1. Add message if exists
    if (message?.trim()) {
      parts.push({ text: message.trim() });
    }

    // 2. Add images if any
    if (Array.isArray(images) && images.length > 0) {
      for (const imageUrl of images) {
        const base64Image = await fetchImageAsBase64(imageUrl);
        if (base64Image) {
          parts.push({
            inlineData: {
              mimeType: getMimeTypeFromUrl(imageUrl),
              data: base64Image,
            },
          });
        }
      }
    }

    // ❌ No valid text or image? Stop
    if (parts.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid text or image content provided.",
      });
    }

    // const result = await model.generateContent(message);
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts,
        },
      ],
    });

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



// const CHATGPT_EMAIL = 'lifetime8954@gmail.com';      
// const CHATGPT_PASSWORD = 'MdShahed@89Hello';         


const fetchImageAsBase64 = async (imageUrl) => {
  try {
    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });
    return Buffer.from(response.data, "binary").toString("base64");
  } catch (err) {
    console.error("Failed to fetch image:", imageUrl, err?.message);
    return null;
  }
};

// ✅ Mime type from extension
const getMimeTypeFromUrl = (url) => {
  if (url.endsWith(".jpg") || url.endsWith(".jpeg")) return "image/jpeg";
  if (url.endsWith(".png")) return "image/png";
  if (url.endsWith(".webp")) return "image/webp";
  return "image/png"; // default fallback
};


