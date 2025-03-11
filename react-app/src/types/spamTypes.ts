// Types for the spam detection JSON data structure

// Meta analysis types
export interface TimeRange {
  start_date: string;
  end_date: string;
}

export interface MetaAnalysis {
  total_reviews: number;
  analysis_date: string;
  time_period: TimeRange;
}

// Statistical analysis types
export interface RatingCount {
  count: number;
  percentage: number;
}

export interface RatingDistribution {
  '1_star': RatingCount;
  '2_star': RatingCount;
  '3_star': RatingCount;
  '4_star': RatingCount;
  '5_star': RatingCount;
}

export interface LengthRange {
  range: string;
  count: number;
}

export interface ReviewLengthDistribution {
  very_short: LengthRange;
  short: LengthRange;
  medium: LengthRange;
  long: LengthRange;
}

export interface ReviewLength {
  average_chars: number;
  median_chars: number;
  distribution: ReviewLengthDistribution;
}

export interface PeakDate {
  date: string;
  count: number;
  deviation_from_mean: number;
}

export interface TemporalPatterns {
  daily_average: number;
  peak_dates: PeakDate[];
  monthly_distribution: Record<string, number>;
}

export interface Keyword {
  word: string;
  count: number;
}

export interface Phrase {
  phrase: string;
  count: number;
}

export interface KeywordFrequency {
  top_keywords: Keyword[];
  common_phrases: Phrase[];
}

export interface StatisticalAnalysis {
  rating_distribution: RatingDistribution;
  review_length: ReviewLength;
  temporal_patterns: TemporalPatterns;
  keyword_frequency: KeywordFrequency;
}

// Content analysis types
export interface SentimentDiscrepancyExample {
  review_id: string;
  rating: number;
  sentiment_score: number;
  content: string;
  reason: string;
}

export interface SentimentDiscrepancies {
  total_found: number;
  examples: SentimentDiscrepancyExample[];
}

export interface ShortReview {
  review_id: string;
  content: string;
  rating: number;
  length: number;
}

export interface EmojiAbuse {
  review_id: string;
  emoji_count: number;
  content: string;
}

export interface GenericComment {
  review_id: string;
  content: string;
  frequency: number;
}

export interface SuspiciousPatterns {
  short_reviews: ShortReview[];
  emoji_abuse: EmojiAbuse[];
  generic_comments: GenericComment[];
}

export interface ContentAnalysis {
  sentiment_discrepancies: SentimentDiscrepancies;
  suspicious_patterns: SuspiciousPatterns;
}

// Behavioral patterns types
export interface SimilarReviewCluster {
  similarity_score: number;
  review_ids: string[];
  time_difference: string;
}

export interface SimilarReviews {
  clusters: SimilarReviewCluster[];
}

export interface BehavioralPatterns {
  similar_reviews: SimilarReviews;
  rating_anomalies: {
    sudden_spikes: any[];
  };
  multiple_reviews: {
    users: any[];
  };
}

// Authenticity indicators types
export interface SpecificFeature {
  review_id: string;
  feature_mentioned: string;
  context: string;
}

export interface DetailedFeedback {
  review_id: string;
  feedback_quality_score: number;
  highlights: string[];
}

export interface AuthenticityIndicators {
  specific_features: SpecificFeature[];
  detailed_feedback: DetailedFeedback[];
}

// Red flags types
export interface PromotionalContent {
  review_id: string;
  promotional_terms: string[];
  severity: string;
}

export interface IrrelevantContent {
  review_id: string;
  content: string;
  type: string;
}

export interface RedFlags {
  promotional_content: PromotionalContent[];
  irrelevant_content: IrrelevantContent[];
  suspicious_voting: any[];
}

// Recommendations types
export interface SpamDetectionRecommendation {
  issue: string;
  suggestion: string;
  priority: string;
}

export interface QualityImprovementRecommendation {
  area: string;
  suggestion: string;
  expected_impact: string;
}

export interface Recommendations {
  spam_detection: SpamDetectionRecommendation[];
  quality_improvement: QualityImprovementRecommendation[];
}

// Overall quality metrics types
export interface OverallQualityMetrics {
  authenticity_score: number;
  spam_percentage: number;
  average_quality_score: number;
  key_findings: string[];
}

// Main spam data structure
export interface SpamData {
  meta_analysis: MetaAnalysis;
  statistical_analysis: StatisticalAnalysis;
  content_analysis: ContentAnalysis;
  behavioral_patterns: BehavioralPatterns;
  authenticity_indicators: AuthenticityIndicators;
  red_flags: RedFlags;
  recommendations: Recommendations;
  overall_quality_metrics: OverallQualityMetrics;
}
