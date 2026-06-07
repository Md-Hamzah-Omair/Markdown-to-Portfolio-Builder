import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export async function getPortfolioData() {
  const filePath = path.join(process.cwd(), 'src/content/resume.md');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  const { data, content } = matter(fileContent);
  const htmlContent = marked.parse(content);

  return {
    data,
    htmlContent,
  };
}
