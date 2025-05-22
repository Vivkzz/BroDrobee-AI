// Gemini API utility for outfit recommendations
const GEMINI_API_KEY = "AIzaSyA7OATDkLzPC_UnospwIoAzg_gSL-CEzCo";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY;

/**
 * Calls Gemini API with a prompt and returns the model's response.
 * @param {string} prompt - The prompt to send to Gemini.
 * @returns {Promise<string>} - The model's text response.
 */
export async function getGeminiRecommendation(prompt) {
    const body = {
        contents: [{ parts: [{ text: prompt }] }]
    };
    try {
        const res = await fetch(GEMINI_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        const data = await res.json();
        if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
            return data.candidates[0].content.parts[0].text;
        }
        throw new Error("No response from Gemini");
    } catch (err) {
        return "Sorry, I couldn't get a recommendation right now.";
    }
}
