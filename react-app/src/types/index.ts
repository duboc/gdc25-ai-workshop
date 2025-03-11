// Types for the JSON data structure

// Review type
export interface Review {
  content: string;
  at?: string;
}

// Problem type
export interface Problem {
  category: string;
  frequency: number;
  severity: 'Critical' | 'Major' | 'Minor';
  example_reviews: Review[];
  trend: string;
  affected_user_segments: string[];
}

// Suggestion type
export interface Suggestion {
  suggestion_group: string;
  frequency: number;
  estimated_impact: 'High' | 'Medium' | 'Low';
  implementation_difficulty: 'Easy' | 'Medium' | 'Hard';
  example_reviews: Review[];
}

// Period trend type
export interface PeriodTrend {
  period: string;
  positive_percentage: number;
  negative_percentage: number;
  neutral_percentage: number;
}

// Significant event type
export interface SignificantEvent {
  date: string;
  event: string;
  sentiment_impact: 'Positive' | 'Negative' | 'Neutral';
}

// Segment specific issue type
export interface SegmentSpecificIssue {
  segment: string;
  top_issues: string[];
}

// Problem analysis type
export interface ProblemAnalysis {
  table: Problem[];
  trend_summary: string;
  critical_problems_count: number;
  most_affected_segments: string[];
}

// Suggestion analysis type
export interface SuggestionAnalysis {
  table: Suggestion[];
  emerging_suggestions: string;
  high_impact_count: number;
  quick_wins: string[];
}

// Sentiment trend analysis type
export interface SentimentTrendAnalysis {
  summary: string;
  period_trends: PeriodTrend[];
  significant_events: SignificantEvent[];
}

// User segments type
export interface UserSegments {
  identified_segments: string[];
  segment_specific_issues: SegmentSpecificIssue[];
}

// Main JSON data structure
export interface ProblemData {
  executive_summary: string;
  problem_analysis: ProblemAnalysis;
  suggestion_analysis: SuggestionAnalysis;
  sentiment_trend_analysis: SentimentTrendAnalysis;
  user_segments: UserSegments;
  actionable_insights: string[];
}

// Export other data types
export * from './spamTypes';
export * from './comparisonTypes';
export * from './userStoriesTypes';
export * from './marketingTypes';
export * from './videoTypes';

// Tab type
export interface TabData {
  id: string;
  label: string;
  data: any;
}
