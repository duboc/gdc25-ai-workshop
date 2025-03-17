/**
 * This file defines the data types and interfaces for the visualization components.
 * It provides a consistent structure for data across the application.
 */

/**
 * @typedef {Object} Review
 * @property {string} content - The content of the review
 * @property {string} [at] - The timestamp of the review
 */

/**
 * @typedef {Object} Problem
 * @property {string} category - The category of the problem
 * @property {number} frequency - The frequency of the problem
 * @property {string} severity - The severity of the problem (Critical, Major, Minor)
 * @property {Review[]} example_reviews - Example reviews mentioning the problem
 * @property {string} trend - The trend of the problem
 * @property {string[]} affected_user_segments - User segments affected by the problem
 */

/**
 * @typedef {Object} ProblemAnalysis
 * @property {Problem[]} table - Table of problems
 * @property {string} trend_summary - Summary of problem trends
 * @property {number} critical_problems_count - Count of critical problems
 * @property {string[]} most_affected_segments - Most affected user segments
 */

/**
 * @typedef {Object} ProblemData
 * @property {string} executive_summary - Executive summary of the problem analysis
 * @property {ProblemAnalysis} problem_analysis - Problem analysis data
 * @property {string[]} actionable_insights - Actionable insights from the analysis
 */

/**
 * @typedef {Object} ReviewQualityData
 * @property {Object} ratingDistribution - Distribution of ratings
 * @property {Object} reviewLengthDistribution - Distribution of review lengths
 * @property {Array} keywordFrequency - Frequency of keywords
 * @property {Object} suspiciousPatterns - Patterns indicating suspicious reviews
 * @property {Array} suspiciousPatternDetails - Details of suspicious patterns
 * @property {Object} spamVsAuthentic - Breakdown of spam vs authentic reviews
 * @property {number} averageRating - Average rating
 */

/**
 * @typedef {Object} VersionTimelineItem
 * @property {string} version - Version number
 * @property {number} sentimentScore - Sentiment score for the version
 * @property {string} sentiment - Sentiment label (Positive, Negative, Neutral)
 * @property {string} summary - Summary of the version
 */

/**
 * @typedef {Object} VersionComparisonData
 * @property {VersionTimelineItem[]} timelineData - Timeline data for versions
 * @property {Object} bestSentiment - Best sentiment version data
 * @property {Object} worstSentiment - Worst sentiment version data
 * @property {Array} featureComparison - Feature comparison across versions
 * @property {Array} versionMetrics - Metrics for each version
 * @property {number} averageSentiment - Average sentiment score
 */

/**
 * @typedef {Object} UserSegmentCharacteristic
 * @property {string} name - Name of the characteristic
 * @property {number} value - Value of the characteristic (1-10)
 */

/**
 * @typedef {Object} UserSegment
 * @property {string} name - Name of the segment
 * @property {number} size - Size of the segment (number of users)
 * @property {UserSegmentCharacteristic[]} characteristics - Characteristics of the segment
 */

/**
 * @typedef {Object} SegmentRecommendation
 * @property {string} segment - Target segment
 * @property {string} recommendation - Recommendation for the segment
 * @property {string} priority - Priority of the recommendation (High, Medium, Low)
 * @property {string} expectedImpact - Expected impact of the recommendation
 * @property {string[]} actionItems - Action items for the recommendation
 */

/**
 * @typedef {Object} UserSegmentationData
 * @property {UserSegment[]} segments - User segments
 * @property {string} segmentationSummary - Summary of the segmentation
 * @property {number} totalUsers - Total number of users
 * @property {Array} crossSegmentAnalysis - Cross-segment analysis data
 * @property {Object} engagementDistribution - Distribution of engagement levels
 * @property {SegmentRecommendation[]} recommendations - Recommendations for segments
 */

/**
 * @typedef {Object} UserStory
 * @property {string} as_a - User role
 * @property {string} i_want - User want
 * @property {string} so_that - User benefit
 * @property {string[]} acceptance_criteria - Acceptance criteria
 * @property {number} story_points - Story points
 * @property {string} priority - Priority (High, Medium, Low)
 * @property {string[]} supporting_reviews - Supporting reviews
 */

/**
 * @typedef {Object} Theme
 * @property {string} name - Theme name
 * @property {UserStory[]} stories - User stories in the theme
 */

/**
 * @typedef {Object} UserStoriesData
 * @property {Theme[]} themes - Themes with user stories
 * @property {Object} summary - Summary of user stories
 */

/**
 * @typedef {Object} MarketingStrategy
 * @property {string} name - Strategy name
 * @property {string} description - Strategy description
 * @property {number} impact - Impact score
 * @property {string} targetAudience - Target audience
 */

/**
 * @typedef {Object} MarketingTactic
 * @property {string} name - Tactic name
 * @property {string} description - Tactic description
 * @property {string} platform - Platform for the tactic
 * @property {number} cost - Cost estimate
 * @property {number} roi - ROI estimate
 */

/**
 * @typedef {Object} MarketingCampaignData
 * @property {string} campaignName - Campaign name
 * @property {string} overview - Campaign overview
 * @property {MarketingStrategy[]} strategies - Marketing strategies
 * @property {MarketingTactic[]} tactics - Marketing tactics
 * @property {Object} budgetAllocation - Budget allocation
 * @property {Object} targetDemographics - Target demographics
 */

/**
 * @typedef {Object} FtueAnalysisData
 * @property {Array} allCriteria - All criteria for FTUE analysis
 * @property {Object} complianceCounts - Counts of compliance statuses
 * @property {Array} loadingTimeData - Loading time data
 * @property {Array} suggestedImprovements - Suggested improvements
 */

/**
 * @typedef {Object} StoreAnalysisData
 * @property {number} overallScore - Overall score
 * @property {string} summary - Summary of the analysis
 * @property {Array} complianceCategories - Compliance categories
 * @property {Array} criteriaEvaluations - Criteria evaluations
 * @property {Array} metrics - Store metrics
 */

/**
 * Detects the type of JSON data based on its structure
 * @param {Object} data - The JSON data to analyze
 * @returns {string} The detected data type
 */
export const detectDataType = (data) => {
  if (!data) return 'unknown';

  // Problem Analysis detection
  if (data.problem_analysis && data.problem_analysis.table) {
    return 'problem-analysis';
  }

  // Review Quality detection
  if (data.ratingDistribution || data.spamVsAuthentic) {
    return 'review-quality';
  }

  // Version Comparison detection
  if (data.timelineData || (data.bestSentiment && data.worstSentiment)) {
    return 'version-comparison';
  }

  // User Segmentation detection
  if (data.segments && Array.isArray(data.segments)) {
    return 'user-segmentation';
  }

  // User Stories detection
  if (data.themes && Array.isArray(data.themes)) {
    return 'user-stories';
  }

  // Marketing Campaign detection
  if (data.campaignName && (data.strategies || data.tactics)) {
    return 'marketing-campaign';
  }

  // FTUE Analysis detection
  if (data.complianceCounts && data.suggestedImprovements) {
    return 'ftue-analysis';
  }

  // Store Analysis detection
  if (data.criteriaEvaluations && data.overallScore) {
    return 'store-analysis';
  }

  return 'unknown';
};

/**
 * Processes JSON data for visualization
 * @param {Object} data - The JSON data to process
 * @returns {Object} The processed data
 */
export const processData = (data) => {
  if (!data) return null;

  // Detect the data type
  const dataType = detectDataType(data);

  // Process data based on type
  switch (dataType) {
    case 'problem-analysis':
      return processProblemData(data);
    case 'review-quality':
      return processReviewQualityData(data);
    case 'version-comparison':
      return processVersionComparisonData(data);
    case 'user-segmentation':
      return processUserSegmentationData(data);
    case 'user-stories':
      return processUserStoriesData(data);
    case 'marketing-campaign':
      return processMarketingCampaignData(data);
    case 'ftue-analysis':
      return processFtueAnalysisData(data);
    case 'store-analysis':
      return processStoreAnalysisData(data);
    default:
      return data;
  }
};

/**
 * Processes problem analysis data
 * @param {ProblemData} data - The problem analysis data
 * @returns {ProblemData} The processed data
 */
const processProblemData = (data) => {
  // Add any processing logic here
  return data;
};

/**
 * Processes review quality data
 * @param {ReviewQualityData} data - The review quality data
 * @returns {ReviewQualityData} The processed data
 */
const processReviewQualityData = (data) => {
  // Add any processing logic here
  return data;
};

/**
 * Processes version comparison data
 * @param {VersionComparisonData} data - The version comparison data
 * @returns {VersionComparisonData} The processed data
 */
const processVersionComparisonData = (data) => {
  // Add any processing logic here
  return data;
};

/**
 * Processes user segmentation data
 * @param {UserSegmentationData} data - The user segmentation data
 * @returns {UserSegmentationData} The processed data
 */
const processUserSegmentationData = (data) => {
  // Add any processing logic here
  return data;
};

/**
 * Processes user stories data
 * @param {UserStoriesData} data - The user stories data
 * @returns {UserStoriesData} The processed data
 */
const processUserStoriesData = (data) => {
  // Add any processing logic here
  return data;
};

/**
 * Processes marketing campaign data
 * @param {MarketingCampaignData} data - The marketing campaign data
 * @returns {MarketingCampaignData} The processed data
 */
const processMarketingCampaignData = (data) => {
  // Add any processing logic here
  return data;
};

/**
 * Processes FTUE analysis data
 * @param {FtueAnalysisData} data - The FTUE analysis data
 * @returns {FtueAnalysisData} The processed data
 */
const processFtueAnalysisData = (data) => {
  // Add any processing logic here
  return data;
};

/**
 * Processes store analysis data
 * @param {StoreAnalysisData} data - The store analysis data
 * @returns {StoreAnalysisData} The processed data
 */
const processStoreAnalysisData = (data) => {
  // Add any processing logic here
  return data;
};
