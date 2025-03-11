import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import DashboardLayout from './components/layouts/DashboardLayout';
import { JsonDataProvider } from './contexts/JsonDataContext';
import { ProblemData, SpamData, ComparisonData, UserStoriesData, MarketingData, VideoData, TabData } from './types';
import { CssBaseline } from '@mui/material';

function App() {
  const [initialTabs, setInitialTabs] = useState<TabData[]>([
    { id: 'home', label: 'Home', data: null },
    { id: 'problems', label: 'User Feedback', data: null },
    { id: 'spam', label: 'Review Quality', data: null },
    { id: 'version', label: 'Version Comparison', data: null },
    { id: 'stories', label: 'User Stories', data: null },
    { id: 'marketing', label: 'Marketing Strategy', data: null },
    { id: 'video', label: 'Video Analysis', data: null }
  ]);

  // Load the example data on mount
  useEffect(() => {
    const loadExampleData = async () => {
      try {
        // Load problem analysis data
        const problemResponse = await fetch('/json_examples/1.problems.json');
        const problemData = await problemResponse.json() as ProblemData;
        
        // Load spam detection data
        const spamResponse = await fetch('/json_examples/2.spam.json');
        const spamData = await spamResponse.json() as SpamData;
        
        // Load version comparison data
        const comparisonResponse = await fetch('/json_examples/3.comparison.json');
        const comparisonData = await comparisonResponse.json() as ComparisonData;
        
        // Load user stories data
        const userStoriesResponse = await fetch('/json_examples/4.user_stories.json');
        const userStoriesData = await userStoriesResponse.json() as UserStoriesData;
        
        // Load marketing data
        const marketingResponse = await fetch('/json_examples/5.marketing.json');
        const marketingData = await marketingResponse.json() as MarketingData;
        
        // Load video analysis data
        const videoResponse = await fetch('/json_examples/6.ftue_video.json');
        const videoData = await videoResponse.json() as VideoData;
        
        // Update tabs with loaded data
        setInitialTabs(prevTabs => 
          prevTabs.map(tab => {
            if (tab.id === 'problems') return { ...tab, data: problemData };
            if (tab.id === 'spam') return { ...tab, data: spamData };
            if (tab.id === 'version') return { ...tab, data: comparisonData };
            if (tab.id === 'stories') return { ...tab, data: userStoriesData };
            if (tab.id === 'marketing') return { ...tab, data: marketingData };
            if (tab.id === 'video') return { ...tab, data: videoData };
            return tab;
          })
        );
      } catch (error) {
        console.error('Failed to load example data:', error);
      }
    };

    loadExampleData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <JsonDataProvider initialTabs={initialTabs}>
        <DashboardLayout />
      </JsonDataProvider>
    </ThemeProvider>
  );
}

export default App;
