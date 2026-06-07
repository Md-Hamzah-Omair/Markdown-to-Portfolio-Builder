# 🚀 Markdown-to-Portfolio Builder

### **Transform your professional documents and GitHub activity into a premium, blazing-fast static portfolio in seconds.**

---

The **Markdown-to-Portfolio Builder** is an autonomous, AI-driven engine designed to solve the "Portfolio Procrastination" problem. By pulling data from your GitHub profile and parsing your existing resume (PDF or Markdown), it uses the Google Gemini API to craft a professional narrative and high-fidelity Single Page Application (SPA), hosted entirely for free on GitHub Pages.

---

## ✨ Core Features

*   **⚡ Blazing-Fast Static Generation**: Built on Next.js 15, your portfolio is pre-rendered at build time for instant loading and perfect SEO.
*   **🤖 Zero-Typing Automation**: Drop a LinkedIn PDF or your GitHub username, and let AI extract your experience, education, and social links automatically.
*   **🧠 AI-Driven Enrichment**: Uses Gemini 3.5 Flash to expand short bios into compelling narratives and transform raw repo metadata into impact-focused project descriptions.
*   **🎨 Dynamic Theme Engine**: Swap between premium layouts like **Dark SaaS**, **Cyberpunk**, or **Corporate Executive** with a single line in a JSON config.
*   **📱 Responsive & Interactive**: Framer Motion-powered animations and glassmorphism UI components that look stunning on any device.
*   **🔄 Automated CI/CD**: A built-in GitHub Actions pipeline that refreshes your portfolio daily to reflect your latest commits.

---

## 🛠️ Tech Stack

*   **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
*   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **AI Engine**: [Google Gemini API (3.5 Flash)](https://aistudio.google.com/)
*   **Data Extraction**: [pdf-parse](https://www.npmjs.com/package/pdf-parse) & Node.js scripts
*   **Icons**: [Lucide React](https://lucide.dev/)

---

## 🏗️ Architecture & How It Works

The system utilizes a **Split-Data Architecture** to ensure stability while maintaining flexibility:

1.  **Source Data**: The pipeline starts with your `src/content/resume.pdf` (or `config.json` / GitHub profile).
2.  **Pre-build Sync**: The `scripts/sync-github.js` engine extracts raw text and fetches live repo metadata.
3.  **AI Transformation**: Gemini processes the raw text, extracting professional details and generating AI-styled design tokens.
4.  **Data Persistence**: Everything is cached into `src/content/projects-data.json` and `src/content/ai-theme.json`.
5.  **Dynamic Rendering**: The Next.js engine reads the unified context and applies it to the selected Theme component.
6.  **Static Compilation**: Running `npm run build` outputs a standalone `/out` folder ready for static hosting.

---

## 📦 Detailed Installation Guide

### **1. Prerequisites**
*   [Node.js v20+](https://nodejs.org/)
*   [npm](https://www.npmjs.com/)
*   A [Google Gemini API Key](https://aistudio.google.com/)

### **2. Clone the Repository**
```bash
git clone https://github.com/your-username/markdown-to-portfolio-builder.git
cd markdown-to-portfolio-builder
```

### **3. Install Dependencies**
```bash
npm install
```

### **4. Configure Environment**
Create a `.env` file in the root directory:
```env
GEMINI_API_KEY=your_actual_api_key_here
GITHUB_TOKEN=optional_for_higher_rate_limits
```

### **5. Place Your Profile Data**
*   **Option A (Zero-Typing)**: Drop your resume PDF into `src/content/resume.pdf`.
*   **Option B (Manual)**: Edit `src/content/config.json` with your GitHub username and details.

### **6. Run Synchronization**
```bash
npm run sync
```

### **7. Local Development**
```bash
npm run dev
```

### **8. Production Build**
```bash
npm run build
```
*Your static site is now ready in the `/out` directory.*

---

## 🎨 Customization & Adding Themes

### **Swapping Themes**
Open `src/content/config.json` and change the `theme` and `ai_theme_prompt` fields:
```json
{
  "theme": "dynamic-ai",
  "ai_theme_prompt": "A minimalist light theme with emerald accents and high-contrast typography."
}
```

### **Contributing New Themes**
We welcome new layouts! To add a theme:
1.  Create a new React component in `src/themes/`.
2.  Register your theme in `src/app/page.js` to handle its rendering logic.
3.  Ensure your theme is fully responsive using Tailwind utility classes.

---

## 🤝 Contributing & Community

This project is part of the **Elite Coders Summer of Code (ECSoC)**! We are actively looking for contributors to expand our theme library and AI extraction capabilities.

*   Check [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.
*   Submit [Bug Reports](https://github.com/your-username/repo/issues) or [Feature Requests] via GitHub Issues.

Built with 💻 for the global developer community.
