import fs from 'fs';
import path from 'path';
import { getPortfolioData } from '@/lib/parser';
import ThemeWrapper from '@/components/ThemeWrapper';

export default async function Page() {
  // Load Markdown content (About Me, Education, etc.)
  const { data: markdownData, htmlContent } = await getPortfolioData();

  // Load Static User Configuration
  const configPath = path.join(process.cwd(), 'src/content/config.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  // Load AI-summarized GitHub projects
  const projectsPath = path.join(process.cwd(), 'src/content/projects-data.json');
  let projects = [];
  try {
    projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
  } catch (e) {
    console.warn("No projects data found, using empty array.");
  }

  // Merge everything into a single data object for themes
  const combinedData = {
    ...markdownData, // Frontmatter from resume.md
    ...config,       // Config from config.json (overrides if overlap)
    projects: projects.length > 0 ? projects : markdownData.projects
  };

  return <ThemeWrapper data={combinedData} htmlContent={htmlContent} />;
}
