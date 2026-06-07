'use client';

import React from 'react';
import PremiumMinimal from '@/themes/PremiumMinimal';
import DarkSaaS from '@/themes/DarkSaaS';
import HackerTerminalUX from '@/themes/HackerTerminalUX';
import CorporateExecutive from '@/themes/CorporateExecutive';
import CreativePortfolio from '@/themes/CreativePortfolio';
import GlitchCyberpunk from '@/themes/GlitchCyberpunk';
import DynamicAITheme from '@/themes/DynamicAITheme';

const themes = {
  minimal: PremiumMinimal,
  'dark-saas': DarkSaaS,
  'hacker-terminal': HackerTerminalUX,
  executive: CorporateExecutive,
  creative: CreativePortfolio,
  cyberpunk: GlitchCyberpunk,
  'dynamic-ai': DynamicAITheme,
};

export default function ThemeWrapper({ data, htmlContent }) {
  const ThemeComponent = themes[data.theme] || themes.minimal;

  return <ThemeComponent data={data} htmlContent={htmlContent} />;
}
