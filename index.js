const https = require("https");
const fs = require("fs");

// Your Gemini API key from Google AI Studio
const API_KEY = "AIzaSyCdZhEQQax5ea9YOSkMmDWuAG-JYu0Bv7M";

// Model
const MODEL = "gemini-2.0-flash";
// gemni-2.5-flash

// Get user prompt from terminal arguments
const prompt = process.argv.slice(2).join(" ");
if (!prompt) {
  console.log('Usage: node index.js "Describe your backend project requirements here"');
  process.exit(1);
}

// Add instructions to prompt to get code + folder structure + commands
const enhancedPrompt = `
this is a backend question.
Based on the following project requirements, provide:

1. Full backend code .
2. Recommended folder structure
3. Commands to run the backend project

Requirements:
${prompt}

Please provide plain text output only. Do not include any emojis or color formatting.
`;

// Request body
const data = JSON.stringify({
  contents: [{ parts: [{ text: enhancedPrompt }] }]
});

// HTTPS request options
const options = {
  hostname: "generativelanguage.googleapis.com",
  path: `/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-goog-api-key": API_KEY
  }
};

// Make request
const req = https.request(options, (res) => {
  let body = "";
  res.on("data", (chunk) => (body += chunk));
  res.on("end", () => {
    try {
      const json = JSON.parse(body);

      if (json.error) {
        console.error("API Error:", json.error);
        return;
      }

      // Extract output text
      const output = json.candidates[0].content.parts[0].text;

      // Save to a file with timestamp
      const fileName = `backend_output_${Date.now()}.txt`;
      fs.writeFileSync(fileName, output, "utf8");

      console.log(`Response saved to: ${fileName}`);
      console.log("Check the file for full code, folder structure, and run commands.");
    } catch (err) {
      console.error("Error parsing response:", err);
      console.error("Raw body:", body);
    }
  });
});

req.on("error", (err) => console.error("Request error:", err));
req.write(data);
req.end();

//AIzaSyCKRZ
//WejerOfbgc0eR-g
//VPlTr9xYhbnAkY



//,


//AIzaSyCdZh
//EQQax5ea9YOS
//kMmDWuAG-JY
//u0Bv7M



//,

//AIzaSyDeNES6YPvub
//dwmkHZf3H6ZqjMBEk734ow