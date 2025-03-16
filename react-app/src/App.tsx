import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import DashboardLayout from './components/layouts/DashboardLayout';
import { JsonDataProvider } from './contexts/JsonDataContext';
import { ProblemData, SpamData, ComparisonData, UserStoriesData, MarketingData, VideoData, PromptData, TabData } from './types';
import { CssBaseline } from '@mui/material';

function App() {
  const [initialTabs, setInitialTabs] = useState<TabData[]>([
    { id: 'prompts', label: 'Prompts Library', data: null },
    { id: 'problems', label: 'User Feedback', data: null },
    { id: 'spam', label: 'Review Quality', data: null },
    { id: 'version', label: 'Version Comparison', data: null },
    { id: 'stories', label: 'User Stories', data: null },
    { id: 'marketing', label: 'Marketing Strategy', data: null },
    { id: 'video', label: 'Video Analysis', data: null }
  ]);
  
  // Track if data is loaded
  const [dataLoaded, setDataLoaded] = useState(false);

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
        
        // Create a dummy prompts data with hardcoded content
        const createPromptsData = () => {
          console.log('Creating hardcoded prompts data...');
          
          const promptsData: PromptData = {
            prompts: [
              {
                id: '01_sentiment_analysis',
                title: 'Expanded General Sentiment Analysis',
                content: `# Expanded General Sentiment Analysis\n\nObjective: Perform a comprehensive sentiment analysis of user reviews to understand overall user perception and identify key areas for improvement.\n\nDataset: You will be provided with a CSV file containing user reviews. The file includes the following columns:\n\ncontent: The full text of the user review.\n\nscore: A numerical rating provided by the user (this may not accurately reflect sentiment).\n\nthumbs up: A binary value indicating whether the user gave a thumbs-up to the review.\n\nTasks:\n\nSentiment Classification: Analyze the content column of each review and classify its sentiment as one of the following:\n\nPositive: Expressing satisfaction, approval, or enthusiasm.\n\nNegative: Expressing dissatisfaction, disapproval, or frustration.\n\nNeutral: Expressing neither positive nor negative sentiment.\n\nImportant: Disregard the score and thumbs up columns for this classification step, focusing solely on the textual content.`
              },
              {
                id: '02_detailed_analysis',
                title: 'Detailed Analysis',
                content: `# Detailed Analysis\n\nObjective: Perform a detailed analysis of user feedback to identify specific issues, suggestions, and patterns.\n\nTasks:\n\n1. Identify common problems mentioned by users\n2. Extract suggestions for improvement\n3. Analyze sentiment trends over time\n4. Identify user segments and their specific concerns`
              },
              {
                id: '03_problems_suggestions',
                title: 'Problems and Suggestions Analysis',
                content: `# Problems and Suggestions Analysis\n\nObjective: Categorize user feedback into problems and suggestions, prioritizing them by frequency and impact.\n\nTasks:\n\n1. Identify and categorize problems by type\n2. Rate problems by severity and frequency\n3. Extract user suggestions\n4. Evaluate suggestions by potential impact and implementation difficulty`
              },
              {
                id: '04_sentiment_factors',
                title: 'Sentiment Factors Analysis',
                content: `# Sentiment Factors Analysis\n\nObjective: Identify the key factors driving positive and negative sentiment in user reviews.\n\nTasks:\n\n1. Extract the main factors mentioned in positive reviews\n2. Extract the main factors mentioned in negative reviews\n3. Analyze how these factors affect overall user satisfaction\n4. Recommend areas for improvement based on sentiment drivers`
              },
              {
                id: '05_spam_detection',
                title: 'Spam Detection',
                content: `# Spam Detection\n\nObjective: Identify potentially fake or spam reviews in the dataset.\n\nTasks:\n\n1. Flag reviews with suspicious patterns\n2. Identify reviews that may be artificially generated\n3. Detect review bombing or coordinated negative review campaigns\n4. Provide confidence scores for spam detection`
              },
              {
                id: '06_version_comparison',
                title: 'Version Comparison',
                content: `# Version Comparison\n\nObjective: Compare user feedback across different versions of the application to track improvements and regressions.\n\nTasks:\n\n1. Identify changes in sentiment between versions\n2. Track specific issues across versions\n3. Measure the impact of feature changes\n4. Provide recommendations for future versions`
              },
              {
                id: '07_gameplay_analysis',
                title: 'Gameplay Analysis',
                content: `# Gameplay Analysis\n\nObjective: Analyze user feedback related to gameplay mechanics and experience.\n\nTasks:\n\n1. Identify most discussed gameplay elements\n2. Evaluate difficulty balance based on user feedback\n3. Analyze engagement patterns\n4. Recommend gameplay improvements`
              },
              {
                id: '08_spam_detection_json',
                title: 'Spam Detection with JSON Output',
                content: `# Spam Detection with JSON Output\n\nObjective: Identify potentially fake or spam reviews and output results in structured JSON format.\n\nTasks:\n\n1. Flag reviews with suspicious patterns\n2. Identify reviews that may be artificially generated\n3. Detect review bombing or coordinated negative review campaigns\n4. Output results in a structured JSON format for further processing`
              },
              {
                id: '09_user_story_generation',
                title: 'User Story Generation',
                content: `# User Story Generation\n\nObjective: Generate user stories from feedback to guide product development.\n\nTasks:\n\n1. Extract user needs and pain points\n2. Format findings as user stories\n3. Prioritize stories by impact and frequency\n4. Group stories by theme or feature area`
              },
              {
                id: '10_marketing_campaign_generation',
                title: 'Marketing Campaign Generation',
                content: `# Marketing Campaign Generation\n\nObjective: Generate marketing campaign ideas based on positive user feedback.\n\nTasks:\n\n1. Identify most appreciated features\n2. Extract compelling user testimonials\n3. Suggest marketing angles and messaging\n4. Recommend target audiences based on user segments`
              }
            ]
          };
          
          console.log(`Created ${promptsData.prompts.length} hardcoded prompts`);
          return promptsData;
        };
        
        const promptsData = createPromptsData();
        
        // Update tabs with loaded data
        setInitialTabs(prevTabs => {
          const updatedTabs = prevTabs.map(tab => {
            if (tab.id === 'problems') return { ...tab, data: problemData };
            if (tab.id === 'spam') return { ...tab, data: spamData };
            if (tab.id === 'version') return { ...tab, data: comparisonData };
            if (tab.id === 'stories') return { ...tab, data: userStoriesData };
            if (tab.id === 'marketing') return { ...tab, data: marketingData };
            if (tab.id === 'video') return { ...tab, data: videoData };
            if (tab.id === 'prompts') return { ...tab, data: promptsData };
            return tab;
          });
          
          // Mark data as loaded
          setDataLoaded(true);
          
          return updatedTabs;
        });
      } catch (error) {
        console.error('Failed to load example data:', error);
      }
    };

    loadExampleData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {dataLoaded ? (
        <JsonDataProvider initialTabs={initialTabs} initialActiveTab="prompts">
          <DashboardLayout />
        </JsonDataProvider>
      ) : (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontFamily: '"Rajdhani", sans-serif',
          fontSize: '1.5rem',
          color: '#666'
        }}>
          Loading data...
        </div>
      )}
    </ThemeProvider>
  );
}

export default App;
