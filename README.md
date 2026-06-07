# Markdown-to-Portfolio Builder (Zero-Config)

### Automatically transform your GitHub profile into a premium, AI-enhanced portfolio.

The Zero-Config edition uses the Google Gemini API to autonomously expand your GitHub bio into a professional narrative and summarize your repositories into impact-focused project cards.

## 🚀 How it Works
1. **GitHub Discovery**: We pull your profile and latest 10 repositories.
2. **AI Enrichment**: Gemini AI expands your short bio and summarizes your code.
3. **Static Export**: A high-performance Next.js site is generated for GitHub Pages.

## 🛠️ Setup
1. Fork this repo.
2. Edit `src/content/config.json` with your `github_username`.
3. Create a `.env` file in the root and add:
   \`\`\`env
   GEMINI_API_KEY=your_key_here
   \`\`\`
4. Run project synchronization:
   \`\`\`bash
   npm run sync
   \`\`\`
5. Start development:
   \`\`\`bash
   npm run dev
   \`\`\`
6. Add `GEMINI_API_KEY` to your GitHub Secrets for automated updates.


## 🤝 Community
- **Bug Reports**: Use the provided issue templates.
- **New Themes**: Contributions are welcome! See `CONTRIBUTING.md`.
