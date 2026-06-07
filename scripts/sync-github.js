const fs = require('fs');
const path = require('path');

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
    console.error("github_username missing in config.json");
    process.exit(1);
  }

  if (!geminiApiKey) {
    console.error("GEMINI_API_KEY environment variable is required for Zero-Config mode.");
    process.exit(1);
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

    const shortBio = profile.bio || "A passionate developer exploring new technologies and building impactful projects.";
    const rawRepos = repos.map(r => ({ name: r.name, description: r.description, language: r.language, url: r.html_url }));

    console.log("[Zero-Config] Generating AI enhancements with Gemini...");
    
    const systemPrompt = `Act as a professional technical resume writer. 
The user is a Computer Science student pursuing a BCA degree, targeting their first internship and full-stack developer roles.
Expand the following short bio into a compelling, 3-paragraph "About Me" section that highlights potential, curiosity, and technical drive.
Also, summarize each provided repository into exactly 2 professional sentences, highlighting the tech stack and complexity.

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

    const aiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `${systemPrompt}\n\nUser Profile: ${profile.name}\nShort Bio: ${shortBio}\n\nRepositories: ${JSON.stringify(rawRepos)}` }]
        }],
        generationConfig: { response_mime_type: "application/json" }
      })
    });

    const aiResult = await aiResponse.json();
    if (!aiResult.candidates?.[0]) throw new Error("Gemini AI failed to generate content.");
    
    const textResponse = aiResult.candidates[0].content.parts[0].text;
    const finalData = JSON.parse(textResponse.trim());

    // Inject GitHub specific fields if AI missed them
    finalData.name = profile.name || github_username;
    finalData.avatar_url = profile.avatar_url;

    fs.writeFileSync(outputPath, JSON.stringify(finalData, null, 2));
    console.log("[Zero-Config] Portfolio data synchronized successfully.");

  } catch (error) {
    console.error("[Zero-Config] Critical Failure:", error.message);
    process.exit(1);
  }
}

syncZeroConfig();
