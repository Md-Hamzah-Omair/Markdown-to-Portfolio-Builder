const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

// Simple .env loader for local development
const envPath = path.join(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const [key, ...value] = line.split('=');
    if (key && value) {
      process.env[key.trim()] = value.join('=').trim().replace(/^["']|["']$/g, '');
    }
  });
}

async function extractResumeData(geminiApiKey) {
  const resumePath = path.join(__dirname, '../src/content/resume.pdf');
  if (!fs.existsSync(resumePath)) {
    console.log("[Zero-Config] No resume.pdf found in src/content/. Skipping PDF extraction.");
    return null;
  }

  try {
    console.log("[Zero-Config] Extracting text from resume.pdf...");
    const dataBuffer = fs.readFileSync(resumePath);
    
    // Robust class-based pdf-parse call
    const pdfLib = require('pdf-parse');
    let resumeText = "";
    
    if (pdfLib.PDFParse) {
      const parser = new pdfLib.PDFParse({ data: dataBuffer });
      const pdfData = await parser.getText();
      resumeText = pdfData.text;
    } else if (typeof pdfLib === 'function') {
      const pdfData = await pdfLib(dataBuffer);
      resumeText = pdfData.text;
    } else {
      throw new Error("Could not find a valid PDF parsing method in the library.");
    }

    console.log("[Zero-Config] Processing resume with Gemini AI...");
    const systemPrompt = `Act as a professional portfolio architect. Extract all professional details from this resume text. 
Identify standard sections like name, title, experience, education, and socials.
ALSO, identify any other custom sections found in the resume (e.g., Hobbies, Awards, Certifications, Languages).

Format the output as a valid JSON object matching this schema:
{
  "name": "string",
  "title": "string",
  "experience": [{ "company": "string", "role": "string", "duration": "string", "description": "string" }],
  "education": [{ "institution": "string", "degree": "string", "duration": "string", "details": "string" }],
  "socials": { "email": "string", "linkedin": "string", "twitter": "string" },
  "customSections": [
    { "sectionTitle": "string", "content": "string or array of strings" }
  ]
}
Return ONLY valid minified JSON.`;

    const aiResponse = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-3.5-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `${systemPrompt}\n\nResume Text:\n${resumeText}` }] }],
        generationConfig: { temperature: 0.1 }
      })
    });

    const aiResult = await aiResponse.json();
    if (!aiResult.candidates?.[0]) {
      throw new Error(`Gemini Resume Extraction failed: ${JSON.stringify(aiResult.error || aiResult)}`);
    }
    let textResponse = aiResult.candidates[0].content.parts[0].text;
    textResponse = textResponse.replace(/^```(?:json)?\n?/i, '').replace(/\n?```$/i, '').trim();
    return JSON.parse(textResponse);
  } catch (error) {
    console.error("[Zero-Config] PDF Extraction failed:", error.message);
    return null;
  }
}

async function generateAITheme(prompt, geminiApiKey) {
  if (!geminiApiKey) return null;

  console.log("[Zero-Config] Generating dynamic AI theme...");
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
    const aiResponse = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-3.5-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `${systemPrompt}\n\nUser Prompt: ${prompt}` }] }],
        generationConfig: { temperature: 0.1 }
      })
    });

    const aiResult = await aiResponse.json();
    if (!aiResult.candidates?.[0]) return null;
    
    let textResponse = aiResult.candidates[0].content.parts[0].text;
    textResponse = textResponse.replace(/^```(?:json)?\n?/i, '').replace(/\n?```$/i, '').trim();
    return JSON.parse(textResponse);
  } catch (error) {
    console.error("[Zero-Config] Theme Generation failed:", error.message);
    return null;
  }
}

async function syncZeroConfig() {
  const configPath = path.join(__dirname, '../src/content/config.json');
  const outputPath = path.join(__dirname, '../src/content/projects-data.json');
  
  if (!fs.existsSync(configPath)) {
    console.error("Config file not found at src/content/config.json");
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const { github_username } = config;
  const geminiApiKey = process.env.GEMINI_API_KEY;
  const githubToken = process.env.GITHUB_TOKEN;

  if (!github_username) {
    console.error("[Zero-Config] github_username missing in src/content/config.json");
    process.exit(1);
  }

  if (!geminiApiKey) {
    console.error("[Zero-Config] Error: GEMINI_API_KEY environment variable is required.");
    process.exit(1);
  }

  try {
    // 1. Extract Resume Data (if available)
    const resumeData = await extractResumeData(geminiApiKey);

    // 2. Generate AI Theme (if requested)
    let aiTheme = null;
    if (config.theme === 'dynamic-ai' && config.ai_theme_prompt) {
      aiTheme = await generateAITheme(config.ai_theme_prompt, geminiApiKey);
      if (aiTheme) {
        console.log("[Zero-Config] Dynamic AI theme generated.");
      }
    }

    // 3. Fetch GitHub Profile
    console.log(`[Zero-Config] Fetching GitHub profile for: ${github_username}`);
    const headers = githubToken ? { 'Authorization': `token ${githubToken}` } : {};
    const profileRes = await fetch(`https://api.github.com/users/${github_username}`, { headers });
    const profile = await profileRes.json();
    
    // 3. Fetch GitHub Repos
    const reposRes = await fetch(`https://api.github.com/users/${github_username}/repos?sort=updated&per_page=15`, { headers });
    const repos = await reposRes.json();
    console.log(`[Zero-Config] Found ${repos.length} repositories.`);

    const sortedRepos = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count);
    const topRepos = sortedRepos.slice(0, 3);
    const recentRepos = repos.filter(r => !topRepos.find(tr => tr.id === r.id)).slice(0, 6);

    const shortBio = profile.bio || (resumeData ? `Extracted from resume: ${resumeData.title}` : "A passionate developer building impactful projects.");

    console.log("[Zero-Config] Generating project summaries with Gemini AI...");
    const systemPrompt = `Act as a professional technical resume writer. 
Expand the following short bio into a compelling, 3-paragraph "About Me" section. 
Summarize repositories into exactly 2 professional sentences, highlighting tech stack and complexity.

Return ONLY a valid JSON object matching this exact schema:
{
  "aboutMeExpanded": "string (3 paragraphs with \\n\\n)",
  "featuredProjects": [{ "title": "string", "summary": "string", "url": "string", "tech": ["string"] }],
  "standardProjects": [{ "title": "string", "summary": "string", "url": "string", "tech": ["string"] }]
}`;

    const aiResponse = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-3.5-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `${systemPrompt}\n\nProfile Bio: ${shortBio}\n\nFeatured Repos: ${JSON.stringify(topRepos)}\nRecent Repos: ${JSON.stringify(recentRepos)}` }]
        }],
        generationConfig: { temperature: 0.1 }
      })
    });

    const aiResult = await aiResponse.json();
    if (!aiResult.candidates?.[0]) {
      throw new Error(`Gemini Project Summary failed: ${JSON.stringify(aiResult.error || aiResult)}`);
    }
    let textResponse = aiResult.candidates[0].content.parts[0].text;
    textResponse = textResponse.replace(/^```(?:json)?\n?/i, '').replace(/\n?```$/i, '').trim();
    const projectContent = JSON.parse(textResponse);

    // 4. Merge All Data
    const finalPortfolioData = {
      name: profile.name || (resumeData ? resumeData.name : config.name),
      avatar_url: profile.avatar_url || `https://github.com/${github_username}.png`,
      title: resumeData ? resumeData.title : config.title,
      aboutMeExpanded: projectContent.aboutMeExpanded,
      featuredProjects: projectContent.featuredProjects,
      standardProjects: projectContent.standardProjects,
      experience: resumeData ? resumeData.experience : config.experience,
      education: resumeData ? resumeData.education : config.education,
      customSections: resumeData ? resumeData.customSections : [],
      socials: resumeData ? { ...config.socials, ...resumeData.socials } : config.socials,
      aiTheme: aiTheme
    };

    fs.writeFileSync(outputPath, JSON.stringify(finalPortfolioData, null, 2));
    console.log("[Zero-Config] Portfolio data synchronized successfully.");

  } catch (error) {
    console.error("[Zero-Config] Critical Failure Details:");
    console.error(error);
    process.exit(1);
  }
}

syncZeroConfig().catch(err => {
  console.error("[Zero-Config] Unhandled Top-Level Error:", err);
  process.exit(1);
});
