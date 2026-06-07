import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const DEFAULT_AI_THEME = {
  bgClass: "bg-slate-900",
  textClass: "text-slate-100",
  accentClass: "text-indigo-400 border-indigo-500",
  cardClass: "bg-slate-800/50 border-slate-700 rounded-xl",
  navClass: "bg-slate-900/80 backdrop-blur-md border-slate-800",
  fontFamily: "font-sans",
  borderRadius: "rounded-xl"
};

async function generateAITheme(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is missing. Falling back to default theme.");
    return DEFAULT_AI_THEME;
  }

  const systemPrompt = `Act as a UI Designer specializing in Tailwind CSS. 
Generate a theme based on the user's prompt. 
Return ONLY a valid, minified JSON object (no markdown, no prose, no code blocks).
Strictly follow this JSON schema:
{
  "bgClass": "Tailwind background class (e.g., bg-black)",
  "textClass": "Tailwind main text color class (e.g., text-gray-100)",
  "accentClass": "Tailwind accent color/border classes (e.g., text-purple-500 border-purple-600)",
  "cardClass": "Tailwind classes for project cards (e.g., bg-gray-900 border border-gray-800)",
  "navClass": "Tailwind glassmorphism navbar classes (e.g., bg-black/50 backdrop-blur-lg)",
  "fontFamily": "Tailwind font class: font-sans, font-serif, or font-mono",
  "borderRadius": "Tailwind radius class: rounded-none, rounded-md, rounded-xl, or rounded-3xl"
}`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `${systemPrompt}\n\nUser Prompt: ${prompt}` }]
        }],
        generationConfig: {
          response_mime_type: "application/json",
        }
      })
    });

    const result = await response.json();
    const textResponse = result.candidates[0].content.parts[0].text;
    
    // Safety check for JSON parsing
    return JSON.parse(textResponse.trim());
  } catch (error) {
    console.error("AI Theme Generation failed:", error);
    return DEFAULT_AI_THEME;
  }
}

export async function getPortfolioData() {
  const filePath = path.join(process.cwd(), 'src/content/resume.md');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  if (data.theme === 'dynamic-ai') {
    const aiTheme = await generateAITheme(data.ai_theme_prompt);
    fs.writeFileSync(
      path.join(process.cwd(), 'src/content/ai-theme.json'),
      JSON.stringify(aiTheme, null, 2)
    );
  }

  marked.setOptions({ gfm: true, breaks: true });
  const htmlContent = marked.parse(content);

  return { data, htmlContent };
}
