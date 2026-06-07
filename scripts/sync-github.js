const fs = require('fs');
const path = require('path');

async function syncGithub() {
  const configPath = path.join(__dirname, '../src/content/config.json');
  const outputPath = path.join(__dirname, '../src/content/projects-data.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  const { github_username } = config;
  const githubToken = process.env.GITHUB_TOKEN;
  const geminiApiKey = process.env.GEMINI_API_KEY;

  if (!github_username) {
    console.error("No github_username found in config.json");
    process.exit(1);
  }

  try {
    console.log(`Fetching repositories for ${github_username}...`);
    const githubResponse = await fetch(`https://api.github.com/users/${github_username}/repos?sort=updated&per_page=6`, {
      headers: githubToken ? { 'Authorization': `token ${githubToken}` } : {}
    });

    if (!githubResponse.ok) throw new Error(`GitHub API error: ${githubResponse.statusText}`);
    const repos = await githubResponse.json();

    const rawRepoData = repos.map(repo => ({
      name: repo.name,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      url: repo.html_url
    }));

    if (!geminiApiKey) {
      console.warn("GEMINI_API_KEY missing, writing raw data.");
      const fallbackData = rawRepoData.map(r => ({
        title: r.name,
        description: r.description || "No description provided.",
        techStack: r.language ? [r.language] : [],
        url: r.url
      }));
      fs.writeFileSync(outputPath, JSON.stringify(fallbackData, null, 2));
      return;
    }

    console.log("Summarizing projects with Gemini AI...");
    const systemPrompt = "Act as a technical resume writer. Take this raw GitHub repository data and transform it into highly professional portfolio project descriptions. Highlight the implied technical stack, impact, and design complexity. Return ONLY a valid JSON array matching this schema: [{\"title\": \"string\", \"description\": \"string\", \"techStack\": [\"array\"], \"url\": \"string\"}].";
    
    const aiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `${systemPrompt}\n\nRaw Repo Data: ${JSON.stringify(rawRepoData)}` }]
        }],
        generationConfig: {
          response_mime_type: "application/json",
        }
      })
    });

    const aiResult = await aiResponse.json();
    const textResponse = aiResult.candidates[0].content.parts[0].text;
    const finalProjects = JSON.parse(textResponse.trim());

    fs.writeFileSync(outputPath, JSON.stringify(finalProjects, null, 2));
    console.log("Successfully synchronized GitHub projects.");

  } catch (error) {
    console.error("Sync failed:", error);
    fs.writeFileSync(outputPath, JSON.stringify([], null, 2));
  }
}

syncGithub();
