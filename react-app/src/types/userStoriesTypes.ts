// Types for the user stories JSON data structure

export interface AcceptanceCriterion {
  [index: number]: string;
}

export interface UserStory {
  as_a: string;
  i_want: string;
  so_that: string;
  acceptance_criteria: string[];
  story_points: number;
  priority: 'High' | 'Medium' | 'Low';
  supporting_reviews: string[];
}

export interface Theme {
  name: string;
  stories: UserStory[];
}

export interface ThemeBreakdown {
  [key: string]: number;
}

export interface UserStoriesSummary {
  total_stories: number;
  total_story_points: number;
  theme_breakdown: ThemeBreakdown;
}

export interface UserStoriesData {
  themes: Theme[];
  summary: UserStoriesSummary;
}
