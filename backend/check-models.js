import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  try {
    const models = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" }).apiKey; // fast check if key exists
    console.log("Fetching available models...");
    
    // Note: The SDK currently doesn't expose listModels directly in the main class in all versions, 
    // but we can try a direct fetch or just try the most common variants.
    // However, a simpler way in the latest SDK is often just iterating known models.
    
    // Let's try the standard names manually to see which one "hits"
    const candidates = [
        "gemini-1.5-flash",
        "gemini-1.5-flash-001",
        "gemini-1.5-flash-002",
        "gemini-1.5-pro",
        "gemini-1.5-pro-001",
        "gemini-1.5-pro-002",
        "gemini-pro",
        "gemini-1.0-pro"
    ];

    for (const modelName of candidates) {
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Test");
            console.log(`✅ AVAILABLE: ${modelName}`);
            return; // Found one!
        } catch (error) {
            if (error.message.includes("404") || error.message.includes("not found")) {
                console.log(`xr UNAVAILABLE: ${modelName}`);
            } else {
                // If it's not a 404 (e.g. 400 or success), it likely exists but failed on generation
                console.log(`? POTENTIAL: ${modelName} (Error: ${error.message.split('[')[0]})`);
            }
        }
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

listModels();