/**
 * Visualization Utility Functions
 * 
 * This file contains utility functions for processing JSON data and creating visualizations.
 */

import { detectDataType, processData } from './dataTypes';

/**
 * Detects the type of JSON data based on its structure
 * @param {Object} data - The JSON data to analyze
 * @returns {string} - The detected JSON type
 */
export const detectJsonType = (data) => {
  return detectDataType(data);
};

/**
 * Extracts problem analysis data for visualization
 * @param {Object} data - The problem analysis JSON data
 * @returns {Object} - Processed data ready for visualization
 */
export const extractProblemAnalysisData = (data) => {
  if (!data) {
    return null;
  }
  
  try {
    // Handle different data structures
    const problemAnalysis = data.problem_analysis || {};
    const actionableInsights = data.actionable_insights || [];
    
    // Get the table data, handling different possible structures
    const tableData = problemAnalysis.table || [];
    
    // Extract problem categories for pie chart
    const problemCategories = tableData.map(item => ({
      name: item.category,
      count: item.frequency
    }));
    
    // Map severity to numeric values for bubble chart
    const severityMap = {
      'Critical': 10,
      'Major': 7,
      'Minor': 4,
      'Low': 2
    };
    
    // Process data for severity/frequency matrix
    const problems = tableData.map(item => {
      // Convert severity to numeric value if it's a string
      const severityValue = typeof item.severity === 'string' 
        ? severityMap[item.severity] || 5
        : item.severity;
        
      return {
        name: item.category,
        severity: severityValue,
        frequency: item.frequency,
        impact: Math.max(2, Math.min(10, (severityValue + item.frequency) / 2)),
        affectedSegments: item.affected_user_segments || []
      };
    });
    
    // Process data for user segment impact
    const segmentImpact = [];
    const segmentsMap = new Map();
    
    // Collect all unique segments and calculate their impact scores
    tableData.forEach(item => {
      const segments = item.affected_user_segments || [];
      const severityValue = typeof item.severity === 'string' 
        ? severityMap[item.severity] || 5
        : item.severity;
        
      segments.forEach(segment => {
        if (!segmentsMap.has(segment)) {
          segmentsMap.set(segment, { impactScore: 0, count: 0 });
        }
        
        const segmentData = segmentsMap.get(segment);
        segmentData.impactScore += severityValue * item.frequency;
        segmentData.count += 1;
      });
    });
    
    // Calculate average impact score for each segment
    segmentsMap.forEach((data, segment) => {
      segmentImpact.push({
        name: segment,
        impactScore: Math.min(10, data.impactScore / (data.count * 10))
      });
    });
    
    return {
      problemCategories,
      problems,
      segmentImpact,
      actionableInsights,
      criticalProblemsCount: problemAnalysis.critical_problems_count || 0,
      mostAffectedSegments: problemAnalysis.most_affected_segments || []
    };
  } catch (error) {
    console.error('Error extracting problem analysis data:', error);
    return null;
  }
};

/**
 * Extracts review quality data for visualization
 * @param {Object} data - The review quality JSON data
 * @returns {Object} - Processed data ready for visualization
 */
export const extractReviewQualityData = (data) => {
  if (!data || !data.overall_quality_metrics) {
    return null;
  }
  
  try {
    const { 
      overall_quality_metrics, 
      statistical_analysis, 
      content_analysis,
      recommendations
    } = data;
    
    // Extract rating distribution data
    let ratingDistribution = [];
    if (statistical_analysis?.rating_distribution) {
      // Handle object format with keys like "1_star", "2_star", etc.
      ratingDistribution = Object.entries(statistical_analysis.rating_distribution).map(([key, value]) => ({
        rating: key.replace('_star', ''),
        count: value.count,
        percentage: value.percentage
      }));
    }
    
    // Extract review length distribution
    let reviewLengthDistribution = [];
    if (statistical_analysis?.review_length?.distribution) {
      // Handle object format with keys like "short", "medium", etc.
      reviewLengthDistribution = Object.entries(statistical_analysis.review_length.distribution).map(([key, value]) => ({
        category: key,
        count: value.count,
        range: value.range
      }));
    }
    
    // Extract keyword frequency data
    let keywordFrequency = [];
    if (statistical_analysis?.keyword_frequency?.top_keywords) {
      keywordFrequency = statistical_analysis.keyword_frequency.top_keywords;
    } else if (statistical_analysis?.keyword_frequency?.common_phrases) {
      // Alternative format
      keywordFrequency = statistical_analysis.keyword_frequency.common_phrases.map(item => ({
        word: item.phrase,
        count: item.count
      }));
    }
    
    // Extract suspicious patterns
    let suspiciousPatterns = {};
    if (content_analysis?.suspicious_patterns) {
      // Handle different formats of suspicious patterns
      if (Array.isArray(content_analysis.suspicious_patterns)) {
        // If it's an array of objects
        suspiciousPatterns = content_analysis.suspicious_patterns;
      } else {
        // If it's an object with pattern types as keys
        suspiciousPatterns = Object.entries(content_analysis.suspicious_patterns).reduce((acc, [key, value]) => {
          // If the value is an array (e.g., examples of suspicious patterns)
          if (Array.isArray(value)) {
            acc[key] = value.length;
          } else if (typeof value === 'object') {
            // If the value is an object with a count property
            acc[key] = value.count || 0;
          } else {
            // If the value is a direct count
            acc[key] = value;
          }
          return acc;
        }, {});
      }
    }
    
    // Calculate spam vs authentic percentages
    const spamVsAuthentic = {
      authentic: overall_quality_metrics.authenticity_score * 100 || 0,
      spam: overall_quality_metrics.spam_percentage * 100 || 0,
      suspicious: 100 - (overall_quality_metrics.authenticity_score * 100) - (overall_quality_metrics.spam_percentage * 100)
    };
    
    return {
      overallQualityMetrics: overall_quality_metrics,
      ratingDistribution,
      reviewLengthDistribution,
      keywordFrequency,
      suspiciousPatterns,
      recommendations,
      spamVsAuthentic
    };
  } catch (error) {
    console.error('Error extracting review quality data:', error);
    return null;
  }
};

/**
 * Extracts version comparison data for visualization
 * @param {Object} data - The version comparison JSON data
 * @returns {Object} - Processed data ready for visualization
 */
export const extractVersionComparisonData = (data) => {
  if (!data || !data.version_history) {
    return null;
  }
  
  try {
    const { version_history, best_sentiment, worst_sentiment } = data;
    
    // Process version history for timeline chart
    const timelineData = version_history.map(version => ({
      version: version.app_version,
      sentimentScore: version.positive_sentiment_score,
      sentiment: version.sentiment,
      summary: version.sentiment_summary
    }));
    
    return {
      timelineData,
      bestSentiment: best_sentiment,
      worstSentiment: worst_sentiment
    };
  } catch (error) {
    console.error('Error extracting version comparison data:', error);
    return null;
  }
};

/**
 * Extracts user segmentation data for visualization
 * @param {Object} data - The user segmentation JSON data
 * @returns {Object} - Processed data ready for visualization
 */
export const extractUserSegmentationData = (data) => {
  if (!data || !data.user_segments) {
    return null;
  }
  
  try {
    const { user_segments, cross_segment_analysis, recommendations } = data;
    
    // Process segment sizes for pie chart
    const segmentSizes = user_segments.map(segment => ({
      name: segment.segment_name,
      size: segment.segment_size.count,
      percentage: segment.segment_size.percentage
    }));
    
    // Process segment characteristics for radar charts
    const segmentCharacteristics = user_segments.map(segment => {
      const sentimentData = segment.sentiment_distribution 
        ? {
            positive: segment.sentiment_distribution.positive,
            neutral: segment.sentiment_distribution.neutral,
            negative: segment.sentiment_distribution.negative
          }
        : null;
      
      return {
        name: segment.segment_name,
        characteristics: segment.primary_characteristics,
        sentimentData,
        commonProblems: segment.common_problems,
        commonThemes: segment.most_common_themes
      };
    });
    
    return {
      segmentSizes,
      segmentCharacteristics,
      crossSegmentAnalysis: cross_segment_analysis,
      recommendations
    };
  } catch (error) {
    console.error('Error extracting user segmentation data:', error);
    return null;
  }
};

/**
 * Extracts user stories data for visualization
 * @param {Object} data - The user stories JSON data
 * @returns {Object} - Processed data ready for visualization
 */
export const extractUserStoriesData = (data) => {
  if (!data || !data.themes) {
    return null;
  }
  
  try {
    const { themes, summary } = data;
    
    // Process themes for breakdown chart
    const themeBreakdown = themes.map(theme => ({
      name: theme.name,
      storyCount: theme.stories.length,
      totalPoints: theme.stories.reduce((sum, story) => sum + story.story_points, 0)
    }));
    
    // Process stories for priority matrix
    const stories = themes.flatMap(theme => 
      theme.stories.map(story => ({
        theme: theme.name,
        asA: story.as_a,
        iWant: story.i_want,
        soThat: story.so_that,
        priority: story.priority,
        storyPoints: story.story_points,
        acceptanceCriteria: story.acceptance_criteria
      }))
    );
    
    return {
      themeBreakdown,
      stories,
      summary
    };
  } catch (error) {
    console.error('Error extracting user stories data:', error);
    return null;
  }
};

/**
 * Extracts marketing campaign data for visualization
 * @param {Object} data - The marketing campaign JSON data
 * @returns {Object} - Processed data ready for visualization
 */
export const extractMarketingCampaignData = (data) => {
  if (!data || !data.campaign_strategies) {
    return null;
  }
  
  try {
    const { 
      campaign_strategies, 
      campaign_name, 
      campaign_budget, 
      campaign_duration,
      target_audience,
      overall_message
    } = data;
    
    // Process strategies for overview chart
    const strategiesOverview = campaign_strategies.map(strategy => ({
      name: strategy.strategy_name,
      description: strategy.description,
      metrics: strategy.measurement_metrics,
      tacticCount: strategy.tactics.length
    }));
    
    // Process tactics by platform
    const platforms = new Set();
    campaign_strategies.forEach(strategy => {
      strategy.tactics.forEach(tactic => {
        tactic.platforms.forEach(platform => platforms.add(platform));
      });
    });
    
    const tacticsByPlatform = Array.from(platforms).map(platform => {
      const tactics = campaign_strategies.flatMap(strategy => 
        strategy.tactics.filter(tactic => 
          tactic.platforms.includes(platform)
        )
      );
      
      return {
        platform,
        tacticCount: tactics.length,
        tactics: tactics.map(t => t.tactic_name)
      };
    });
    
    return {
      campaignName: campaign_name,
      campaignBudget: campaign_budget,
      campaignDuration: campaign_duration,
      targetAudience: target_audience,
      overallMessage: overall_message,
      strategiesOverview,
      tacticsByPlatform
    };
  } catch (error) {
    console.error('Error extracting marketing campaign data:', error);
    return null;
  }
};

/**
 * Extracts FTUE analysis data for visualization
 * @param {Object} data - The FTUE analysis JSON data
 * @returns {Object} - Processed data ready for visualization
 */
export const extractFtueAnalysisData = (data) => {
  if (!data || !data.ftueAnalysis) {
    return null;
  }
  
  try {
    const { ftueAnalysis } = data;
    
    // Count criteria by compliance status
    const complianceCounts = {
      yes: 0,
      no: 0,
      partial: 0,
      notApplicable: 0
    };
    
    ftueAnalysis.forEach(criterion => {
      const status = criterion.meetsBestPractices.toLowerCase();
      if (status === 'yes') complianceCounts.yes++;
      else if (status === 'no') complianceCounts.no++;
      else if (status === 'partial') complianceCounts.partial++;
      else complianceCounts.notApplicable++;
    });
    
    // Extract criteria with improvements
    const suggestedImprovements = ftueAnalysis
      .filter(criterion => criterion.suggestedImprovements)
      .map(criterion => ({
        criterion: criterion.criterion,
        meetsBestPractices: criterion.meetsBestPractices,
        improvement: criterion.suggestedImprovements
      }));
    
    // Extract loading time data
    const loadingTimeData = ftueAnalysis
      .filter(criterion => 
        criterion.numericalValue && 
        (criterion.numericalValue.timeInSeconds || criterion.numericalValue.maxDurationInSeconds)
      )
      .map(criterion => ({
        criterion: criterion.criterion,
        timeInSeconds: criterion.numericalValue.timeInSeconds || criterion.numericalValue.maxDurationInSeconds
      }));
    
    return {
      complianceCounts,
      suggestedImprovements,
      loadingTimeData,
      allCriteria: ftueAnalysis
    };
  } catch (error) {
    console.error('Error extracting FTUE analysis data:', error);
    return null;
  }
};

/**
 * Extracts store analysis data for visualization
 * @param {Object} data - The store analysis JSON data
 * @returns {Object} - Processed data ready for visualization
 */
export const extractStoreAnalysisData = (data) => {
  if (!data || !data.storeAnalysis) {
    return null;
  }
  
  try {
    const { storeAnalysis } = data;
    
    // Count criteria by compliance status
    const complianceCounts = {
      yes: 0,
      no: 0,
      partial: 0
    };
    
    storeAnalysis.forEach(criterion => {
      const status = criterion.meetsBestPractices.toLowerCase();
      if (status === 'yes') complianceCounts.yes++;
      else if (status === 'no') complianceCounts.no++;
      else if (status === 'partial') complianceCounts.partial++;
    });
    
    // Extract criteria with improvements
    const suggestedImprovements = storeAnalysis
      .filter(criterion => criterion.suggestedImprovements)
      .map(criterion => ({
        criterion: criterion.criterion,
        meetsBestPractices: criterion.meetsBestPractices,
        improvement: criterion.suggestedImprovements
      }));
    
    return {
      complianceCounts,
      suggestedImprovements,
      allCriteria: storeAnalysis
    };
  } catch (error) {
    console.error('Error extracting store analysis data:', error);
    return null;
  }
};

/**
 * Processes JSON data based on its detected type
 * @param {Object} data - The JSON data to process
 * @returns {Object} - Processed data ready for visualization
 */
export const processJsonData = (data) => {
  const jsonType = detectJsonType(data);
  
  switch (jsonType) {
    case 'problem-analysis':
      return extractProblemAnalysisData(data);
    case 'review-quality':
      return extractReviewQualityData(data);
    case 'version-comparison':
      return extractVersionComparisonData(data);
    case 'user-segmentation':
      return extractUserSegmentationData(data);
    case 'user-stories':
      return extractUserStoriesData(data);
    case 'marketing-campaign':
      return extractMarketingCampaignData(data);
    case 'ftue-analysis':
      return extractFtueAnalysisData(data);
    case 'store-analysis':
      return extractStoreAnalysisData(data);
    default:
      return processData(data);
  }
};
