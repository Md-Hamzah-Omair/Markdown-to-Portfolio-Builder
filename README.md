<div align="center">
  <h1>Markdown-to-Portfolio Builder</h1>
  <p><b>Transform professional documents and GitHub activity into a premium, blazing-fast static portfolio in seconds.</b></p>

  <p>
    <a href="https://github.com/Md-Hamzah-Omair/Markdown-to-Portfolio-Builder/actions/workflows/deploy.yml">
      <img src="https://github.com/Md-Hamzah-Omair/Markdown-to-Portfolio-Builder/actions/workflows/deploy.yml/badge.svg" alt="Deployment Status" />
    </a>
    <img src="https://img.shields.io/badge/License-MIT-gray.svg?style=flat-square" alt="License" />
    <img src="https://img.shields.io/badge/PRs-welcome-blue.svg?style=flat-square" alt="PRs Welcome" />
  </p>

  <p>
    <a href="#core-features">Features</a>
    <span> · </span>
    <a href="https://md-hamzah-omair.github.io/Markdown-to-Portfolio-Builder/">Live Demo</a>
    <span> · </span>
    <a href="#detailed-installation-guide">Installation</a>
    <span> · </span>
    <a href="#contributing--community">Contribute</a>
  </p>
</div>

---

The **Markdown-to-Portfolio Builder** is an autonomous, AI-driven engine designed to solve the portfolio update problem. By integrating directly with your GitHub profile and parsing existing resume documents (PDF or Markdown), it leverages the Google Gemini API to generate a professional narrative and high-fidelity Single Page Application (SPA), optimized for static hosting on GitHub Pages.

---

## Core Features

*   **Blazing-Fast Static Generation**: Built on Next.js 15, portfolios are pre-rendered at build time for optimal performance and SEO.
*   **Zero-Typing Automation**: Supports automatic extraction of professional experience, education, and social links from LinkedIn-style PDFs.
*   **AI-Driven Enrichment**: Utilizes Gemini 3.5 Flash to expand concise biographies into compelling professional narratives and summarize repository metadata.
*   **Dynamic Theme Engine**: Configurable layouts including Dark SaaS, Cyberpunk, and Corporate styles, controlled via a single configuration file.
*   **Responsive & Interactive**: Framer Motion animations and modular UI components ensure a consistent experience across all device types.
*   **Automated CI/CD**: Integrated GitHub Actions pipeline for daily content synchronization and automated deployment.

---

## Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | [Next.js 15 (App Router)](https://nextjs.org/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **AI Engine** | [Google Gemini API (3.5 Flash)](https://aistudio.google.com/) |
| **Data Extraction** | [pdf-parse](https://www.npmjs.com/package/pdf-parse) |
| **Icons** | [Lucide React](https://lucide.dev/) |

---

## Architecture & How It Works

The system utilizes a **Split-Data Architecture** to maintain build stability:

1.  **Source Data**: Ingestion of `resume.pdf`, `config.json`, or GitHub profile metadata.
2.  **Pre-build Sync**: The `scripts/sync-github.js` utility extracts raw text and fetches repository metadata.
3.  **AI Transformation**: Gemini processes the dataset to extract structured professional details and design tokens.
4.  **Data Persistence**: Normalized data is cached into `src/content/projects-data.json`.
5.  **Dynamic Rendering**: The Next.js engine maps the unified context to the active theme component.
6.  **Static Compilation**: Deployment-ready output is generated in the `/out` directory.

---

## Detailed Installation Guide

### 1. Prerequisites
*   [Node.js v20+](https://nodejs.org/)
*   [npm](https://www.npmjs.com/)
*   A [Google Gemini API Key](https://aistudio.google.com/)

### 2. Clone the Repository
```bash
git clone https://github.com/Md-Hamzah-Omair/Markdown-to-Portfolio-Builder.git
cd markdown-to-portfolio-builder
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment
Create a `.env` file in the root directory:
```env
GEMINI_API_KEY=your_actual_api_key_here
GITHUB_TOKEN=optional_for_higher_rate_limits
```

### 5. Place Your Profile Data
*   **Option A (Zero-Typing)**: Drop your resume PDF into `src/content/resume.pdf`.
*   **Option B (Manual)**: Update `src/content/config.json` with your GitHub username and details.

### 6. Run Synchronization
```bash
npm run sync
```

### 7. Local Development
```bash
npm run dev
```

---

## Customization & Adding Themes

### Swapping Themes
Modify the `theme` and `ai_theme_prompt` fields in `src/content/config.json`:
```json
{
  "theme": "dynamic-ai",
  "ai_theme_prompt": "A minimalist light theme with emerald accents and high-contrast typography."
}
```

### Contributing New Themes
1.  Develop a new React component in `src/themes/`.
2.  Register the component in `src/app/page.js`.
3.  Ensure full responsiveness using Tailwind utility classes.

---

## Contributing & Community

This project is part of the **Elite Coders Summer of Code (ECSoC)**. We welcome contributions to our theme library and AI extraction engine.

*   Review [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution standards.
*   Submit [Bug Reports](https://github.com/Md-Hamzah-Omair/Markdown-to-Portfolio-Builder/issues) or Feature Requests via GitHub Issues.

<div align="center">
  <p>Built for the global developer community.</p>
  <a href="https://github.com/Md-Hamzah-Omair/Markdown-to-Portfolio-Builder/stargazers">
    <img src="https://img.shields.io/github/stars/Md-Hamzah-Omair/Markdown-to-Portfolio-Builder?style=social" alt="GitHub Stars" />
  </a>
</div>
