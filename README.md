# Markdown-to-Portfolio Builder

### Transforming raw GitHub data and a single configuration file into an AI-styled, premium, single-page portfolio application hosted 100% free on GitHub Pages.

---

[![GitHub Actions Build](https://img.shields.io/github/actions/workflow/status/username/repo/deploy.yml?branch=main&style=for-the-badge)](https://github.com/username/repo/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Open Source Welcoming](https://img.shields.io/badge/Open%20Source-Welcoming-blueviolet.svg?style=for-the-badge)](https://github.com/firstcontributions/first-contributions)

The **Markdown-to-Portfolio Builder** is an autonomous, production-grade engine that bridges the gap between your code and your professional presence. By combining the power of **Next.js 15**, **Tailwind CSS**, and the **Google Gemini API**, it eliminates the manual labor of updating portfolios. Your site doesn't just sit there—it evolves daily alongside your GitHub activity.

---

## Core Features & Capabilities

*   **Automated GitHub Profile Synchronization**: The `scripts/sync-github.js` engine polls the GitHub REST API to discover your latest work. It then passes raw metadata to **Google Gemini**, which acts as a technical resume writer to generate polished, impact-focused project descriptions and tech-stack highlights.
*   **Data-Driven AI Themeing**: Beyond static styles, you can provide a plain-text design prompt in your configuration. At compile time, the engine fetches tailored Tailwind UI tokens via Gemini to build a completely unique visual identity.
*   **6+ Dynamic SPA Layouts**: Forget static documents. Our layouts are high-end Single Page Applications (SPAs) featuring:
    *   Sticky glassmorphism navigation.
    *   Smooth-scroll section targeting.
    *   Framer Motion-powered interactive states and entry animations.
    *   Themes ranging from **Dark SaaS** and **Cyberpunk Glitch** to **Corporate Executive**.
*   **Zero-Cost Automated CI/CD**: A robust GitHub Actions integration handles everything. It triggers on every push and via a **24-hour cron schedule**, ensuring your projects are always synchronized without you lifting a finger.

---

## Architecture & Data Separation

We utilize a strict **Separation of Concerns (SoC)** architecture. AI-generated data is cached into local JSON files during the build process, ensuring that the AI never "mutates" your core layout or structural code.

```text
markdown-to-portfolio-builder/
├── scripts/
│   └── sync-github.js          # The AI Project Discovery Engine
├── src/
│   ├── content/
│   │   ├── config.json         # Static Identity (Name, Socials, Theme)
│   │   ├── ai-theme.json       # AI-Generated Design Tokens
│   │   ├── projects-data.json  # AI-Summarized Project Cache
│   │   └── resume.md           # Manual Biography & Education
│   ├── themes/
│   │   ├── PremiumMinimal.jsx  # Modern Agency Style
│   │   ├── DarkSaaS.jsx        # Indigo/Slate SaaS Style
│   │   ├── HackerTerminal.jsx  # Console/Matrix Style
│   │   └── ...                 # Total of 6+ Modular Themes
│   ├── components/
│   │   └── ThemeWrapper.jsx    # The Dynamic Theme Switcher
│   └── app/
│       └── page.js             # Data Merging & Root Entry
└── .github/workflows/
    └── deploy.yml              # The 24h Automation Pipeline
```

---

## Step-by-Step Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/markdown-to-portfolio-builder.git
cd markdown-to-portfolio-builder
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Your Identity
Edit `src/content/config.json` with your details:
```json
{
  "name": "Your Name",
  "github_username": "yourhandle",
  "theme": "dynamic-ai",
  "ai_theme_prompt": "A minimalist dark theme with emerald accents and mono fonts."
}
```

### 4. Local Synchronization & Development
Set your environment variables in a `.env.local` file (see the Secrets section below), then run:
```bash
# Sync projects from GitHub manually
node scripts/sync-github.js

# Start the development server
npm run dev
```

---

## GitHub Secrets & Environment Configuration

To enable automated deployments and AI generation, you must configure your repository secrets.

| Secret | Description | Required For |
| :--- | :--- | :--- |
| `GEMINI_API_KEY` | Your Google AI Studio API Key. | AI Themeing & Project Summarization |
| `GITHUB_TOKEN` | Built-in GitHub Token (automatically provided). | Bypassing GitHub API Rate Limits |

### Repository Settings Checklist
1.  **GitHub Pages**: Go to **Settings > Pages**. Under **Build and deployment**, set the **Source** to `GitHub Actions`.
2.  **Secrets**: Go to **Settings > Secrets and variables > Actions**. Add your `GEMINI_API_KEY`.
3.  **Permissions**: Under **Settings > Actions > General**, ensure "Workflow permissions" is set to "Read and write".

---

## Open Source & Extension Guide

We are currently in a **45-day Summer Contribution Program**! We invite developers to build new themes and expand the AI engine.

### Adding a New Theme
1.  **Create Your Component**: Add a new file in `src/themes/YourThemeName.jsx`. Use the props `{ data, htmlContent }`.
2.  **Register the Theme**: Open `src/components/ThemeWrapper.jsx` and add your theme to the registry:
    ```javascript
    import YourThemeName from '@/themes/YourThemeName';

    const themes = {
      // ... existing themes
      'your-theme-id': YourThemeName,
    };
    ```
3.  **Submit a PR**: Ensure your theme is fully responsive and uses Tailwind CSS for all styling.

---

Built with precision for the global developer community.
