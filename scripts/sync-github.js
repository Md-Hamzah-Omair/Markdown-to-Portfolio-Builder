const fs = require('fs');
const path = require('path');

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

  // Log warnings for missing environment variables before starting
  if (!geminiApiKey) {
    console.warn("[Zero-Config] WARNING: GEMINI_API_KEY is not defined in the environment.");
    console.error("[Zero-Config] Error: GEMINI_API_KEY environment variable is required for AI theme/content generation.");
    process.exit(1);
  }

  if (!githubToken) {
    console.warn("[Zero-Config] WARNING: GITHUB_TOKEN is not defined. GitHub API rate limits will be severely restricted.");
  }

  try {
    console.log(`[Zero-Config] Fetching GitHub profile for: ${github_username}`);
    const headers = githubToken ? { 'Authorization': `token ${githubToken}` } : {};
    
    // 1. Fetch Profile
    const profileRes = await fetch(`https://api.github.com/users/${github_username}`, { headers });
    if (!profileRes.ok) throw new Error(`GitHub Profile API failed: ${profileRes.statusText}`);
    const profile = await profileRes.json();
    
    // 2. Fetch Repos
    const reposRes = await fetch(`https://api.github.com/users/${github_username}/repos?sort=updated&per_page=10`, { headers });
    if (!reposRes.ok) throw new Error(`GitHub Repos API failed: ${reposRes.statusText}`);
    const repos = await reposRes.json();

    console.log(`[Zero-Config] Found ${repos.length} public repositories.`);

    const shortBio = profile.bio || "A passionate developer exploring new technologies and building impactful projects.";
    const rawRepos = repos.map(r => ({ name: r.name, description: r.description, language: r.language, url: r.html_url }));

    if (rawRepos.length === 0) {
      console.warn("[Zero-Config] WARNING: No public repositories found for this user.");
    }

    console.log("[Zero-Config] Summarizing projects with Gemini AI...");
    const systemPrompt = `Act as a professional technical resume writer. 
The user is a Computer Science student pursuing a BCA degree, targeting their first internship and full-stack developer roles.
Expand the following short bio into a compelling, 3-paragraph "About Me" section that highlights potential, curiosity, and technical drive.
Also, summarize each provided repository into exactly 2 professional sentences, highlighting the tech stack and complexity.

IMPORTANT: Return ONLY a valid, minified JSON object. Do NOT include markdown code blocks, backticks (e.g., \`\`\`json), or any prose.

Return ONLY a valid JSON object matching this exact schema:
{
  "name": "string",
  "avatar_url": "string",
  "aboutMeExpanded": "string (3 paragraphs with \\n\\n)",
  "projects": [
    {
      "title": "string",
      "summary": "string (2 sentences)",
      "url": "string",
      "tech": ["string"]
    }
  ]
}`;

    // Updated to v1 API and latest 3.5-flash model as requested
    // Removed responseMimeType to fix "Unknown name" 400 error
    const aiResponse = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-3.5-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `${systemPrompt}\n\nUser Profile: ${profile.name || github_username}\nShort Bio: ${shortBio}\n\nRepositories: ${JSON.stringify(rawRepos)}` }]
        }],
        generationConfig: { 
          temperature: 0.1
        }
      })
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      throw new Error(`Gemini API HTTP Error: ${aiResponse.status} - ${errorText}`);
    }

    const aiResult = await aiResponse.json();
    if (!aiResult.candidates?.[0]) {
      throw new Error(`Gemini AI returned no candidates. Full response: ${JSON.stringify(aiResult)}`);
    }
    
    let textResponse = aiResult.candidates[0].content.parts[0].text;
    
    // Robust parsing defense: Strip markdown code fences if they exist
    textResponse = textResponse.replace(/^```(?:json)?\n?/i, '').replace(/\n?```$/i, '').trim();

    let finalData;
    try {
      finalData = JSON.parse(textResponse);
    } catch (parseError) {
      console.error("[Zero-Config] Failed to parse Gemini response as JSON.");
      console.error("[Zero-Config] Raw Response:", textResponse);
      throw parseError;
    }

    // Inject GitHub specific fields if AI missed them or returned empty
    finalData.name = finalData.name || profile.name || github_username;
    finalData.avatar_url = profile.avatar_url || `https://github.com/${github_username}.png`;

    fs.writeFileSync(outputPath, JSON.stringify(finalData, null, 2));
    console.log("[Zero-Config] Portfolio data synchronized successfully.");

  } catch (error) {
    console.error("[Zero-Config] Critical Failure Details:");
    console.error(error);
    process.exit(1);
  }
}

// Execute the sync
syncZeroConfig().catch(err => {
  console.error("[Zero-Config] Unhandled Top-Level Error:", err);
  process.exit(1);
});
