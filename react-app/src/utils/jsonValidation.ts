import { ProblemData, SpamData, ComparisonData, UserStoriesData, MarketingData, VideoData } from '../types';

/**
 * Validates if the input is a valid JSON string
 * @param jsonString The JSON string to validate
 * @returns An object with isValid flag and the parsed JSON or error message
 */
export const validateJsonString = (jsonString: string): { 
  isValid: boolean; 
  data?: any; 
  error?: string 
} => {
  try {
    const data = JSON.parse(jsonString);
    return { isValid: true, data };
  } catch (error) {
    return { 
      isValid: false, 
      error: error instanceof Error ? error.message : 'Invalid JSON format' 
    };
  }
};

/**
 * Validates if the parsed JSON matches the expected ProblemData structure
 * @param data The parsed JSON data
 * @returns An object with isValid flag and validation errors if any
 */
export const validateProblemData = (data: any): {
  isValid: boolean;
  errors?: string[];
} => {
  const errors: string[] = [];

  // Check for required top-level properties
  const requiredProps = [
    'executive_summary',
    'problem_analysis',
    'suggestion_analysis',
    'sentiment_trend_analysis',
    'user_segments',
    'actionable_insights'
  ];

  requiredProps.forEach(prop => {
    if (!data[prop]) {
      errors.push(`Missing required property: ${prop}`);
    }
  });

  // Check problem_analysis structure if it exists
  if (data.problem_analysis) {
    if (!Array.isArray(data.problem_analysis.table)) {
      errors.push('problem_analysis.table must be an array');
    } else {
      // Validate each problem in the table
      data.problem_analysis.table.forEach((problem: any, index: number) => {
        if (!problem.category) {
          errors.push(`Problem at index ${index} is missing category`);
        }
        if (typeof problem.frequency !== 'number') {
          errors.push(`Problem at index ${index} has invalid frequency`);
        }
        if (!['Critical', 'Major', 'Minor'].includes(problem.severity)) {
          errors.push(`Problem at index ${index} has invalid severity`);
        }
      });
    }
  }

  // Check suggestion_analysis structure if it exists
  if (data.suggestion_analysis) {
    if (!Array.isArray(data.suggestion_analysis.table)) {
      errors.push('suggestion_analysis.table must be an array');
    }
  }

  // Check sentiment_trend_analysis structure if it exists
  if (data.sentiment_trend_analysis) {
    if (!Array.isArray(data.sentiment_trend_analysis.period_trends)) {
      errors.push('sentiment_trend_analysis.period_trends must be an array');
    }
  }

  // Check user_segments structure if it exists
  if (data.user_segments) {
    if (!Array.isArray(data.user_segments.identified_segments)) {
      errors.push('user_segments.identified_segments must be an array');
    }
  }

  // Check actionable_insights structure
  if (!Array.isArray(data.actionable_insights)) {
    errors.push('actionable_insights must be an array');
  }

  return {
    isValid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined
  };
};

/**
 * Validates if the parsed JSON matches the expected SpamData structure
 * @param data The parsed JSON data
 * @returns An object with isValid flag and validation errors if any
 */
export const validateSpamData = (data: any): {
  isValid: boolean;
  errors?: string[];
} => {
  const errors: string[] = [];

  // Check for required top-level properties
  const requiredProps = [
    'meta_analysis',
    'statistical_analysis',
    'content_analysis',
    'behavioral_patterns',
    'authenticity_indicators',
    'red_flags',
    'recommendations',
    'overall_quality_metrics'
  ];

  requiredProps.forEach(prop => {
    if (!data[prop]) {
      errors.push(`Missing required property: ${prop}`);
    }
  });

  // Check meta_analysis structure if it exists
  if (data.meta_analysis) {
    if (!data.meta_analysis.total_reviews) {
      errors.push('meta_analysis.total_reviews is required');
    }
    if (!data.meta_analysis.time_period) {
      errors.push('meta_analysis.time_period is required');
    }
  }

  // Check statistical_analysis structure if it exists
  if (data.statistical_analysis) {
    if (!data.statistical_analysis.rating_distribution) {
      errors.push('statistical_analysis.rating_distribution is required');
    }
    if (!data.statistical_analysis.review_length) {
      errors.push('statistical_analysis.review_length is required');
    }
  }

  // Check content_analysis structure if it exists
  if (data.content_analysis) {
    if (!data.content_analysis.suspicious_patterns) {
      errors.push('content_analysis.suspicious_patterns is required');
    }
  }

  // Check recommendations structure if it exists
  if (data.recommendations) {
    if (!Array.isArray(data.recommendations.spam_detection)) {
      errors.push('recommendations.spam_detection must be an array');
    }
    if (!Array.isArray(data.recommendations.quality_improvement)) {
      errors.push('recommendations.quality_improvement must be an array');
    }
  }

  // Check overall_quality_metrics structure if it exists
  if (data.overall_quality_metrics) {
    if (typeof data.overall_quality_metrics.authenticity_score !== 'number') {
      errors.push('overall_quality_metrics.authenticity_score must be a number');
    }
    if (typeof data.overall_quality_metrics.spam_percentage !== 'number') {
      errors.push('overall_quality_metrics.spam_percentage must be a number');
    }
    if (!Array.isArray(data.overall_quality_metrics.key_findings)) {
      errors.push('overall_quality_metrics.key_findings must be an array');
    }
  }

  return {
    isValid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined
  };
};

/**
 * Validates if the parsed JSON matches the expected ComparisonData structure
 * @param data The parsed JSON data
 * @returns An object with isValid flag and validation errors if any
 */
export const validateComparisonData = (data: any): {
  isValid: boolean;
  errors?: string[];
} => {
  const errors: string[] = [];

  // Check for required top-level properties
  const requiredProps = [
    'historico_versoes',
    'melhor_sentimento',
    'pior_sentimento'
  ];

  requiredProps.forEach(prop => {
    if (!data[prop]) {
      errors.push(`Missing required property: ${prop}`);
    }
  });

  // Check historico_versoes structure if it exists
  if (data.historico_versoes) {
    if (!Array.isArray(data.historico_versoes)) {
      errors.push('historico_versoes must be an array');
    } else {
      // Validate each version in the history
      data.historico_versoes.forEach((version: any, index: number) => {
        if (!version.versao_aplicativo) {
          errors.push(`Version at index ${index} is missing versao_aplicativo`);
        }
        if (!version.resumo_sentimento) {
          errors.push(`Version at index ${index} is missing resumo_sentimento`);
        }
        if (!version.sentimento) {
          errors.push(`Version at index ${index} is missing sentimento`);
        }
        if (typeof version.score_sentimento_positivo !== 'number') {
          errors.push(`Version at index ${index} has invalid score_sentimento_positivo`);
        }
      });
    }
  }

  // Check melhor_sentimento structure if it exists
  if (data.melhor_sentimento) {
    if (!data.melhor_sentimento.versao_aplicativo) {
      errors.push('melhor_sentimento.versao_aplicativo is required');
    }
    if (!data.melhor_sentimento.resumo_sentimento) {
      errors.push('melhor_sentimento.resumo_sentimento is required');
    }
  }

  // Check pior_sentimento structure if it exists
  if (data.pior_sentimento) {
    if (!data.pior_sentimento.versao_aplicativo) {
      errors.push('pior_sentimento.versao_aplicativo is required');
    }
    if (!data.pior_sentimento.resumo_sentimento) {
      errors.push('pior_sentimento.resumo_sentimento is required');
    }
  }

  return {
    isValid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined
  };
};

/**
 * Validates if the parsed JSON matches the expected UserStoriesData structure
 * @param data The parsed JSON data
 * @returns An object with isValid flag and validation errors if any
 */
export const validateUserStoriesData = (data: any): {
  isValid: boolean;
  errors?: string[];
} => {
  const errors: string[] = [];

  // Check for required top-level properties
  const requiredProps = [
    'themes',
    'summary'
  ];

  requiredProps.forEach(prop => {
    if (!data[prop]) {
      errors.push(`Missing required property: ${prop}`);
    }
  });

  // Check themes structure if it exists
  if (data.themes) {
    if (!Array.isArray(data.themes)) {
      errors.push('themes must be an array');
    } else {
      // Validate each theme
      data.themes.forEach((theme: any, index: number) => {
        if (!theme.name) {
          errors.push(`Theme at index ${index} is missing name`);
        }
        if (!Array.isArray(theme.stories)) {
          errors.push(`Theme at index ${index} stories must be an array`);
        } else {
          // Validate each story in the theme
          theme.stories.forEach((story: any, storyIndex: number) => {
            if (!story.as_a) {
              errors.push(`Story at index ${index}.${storyIndex} is missing as_a`);
            }
            if (!story.i_want) {
              errors.push(`Story at index ${index}.${storyIndex} is missing i_want`);
            }
            if (!story.so_that) {
              errors.push(`Story at index ${index}.${storyIndex} is missing so_that`);
            }
            if (!Array.isArray(story.acceptance_criteria)) {
              errors.push(`Story at index ${index}.${storyIndex} acceptance_criteria must be an array`);
            }
            if (typeof story.story_points !== 'number') {
              errors.push(`Story at index ${index}.${storyIndex} has invalid story_points`);
            }
            if (!['High', 'Medium', 'Low'].includes(story.priority)) {
              errors.push(`Story at index ${index}.${storyIndex} has invalid priority`);
            }
          });
        }
      });
    }
  }

  // Check summary structure if it exists
  if (data.summary) {
    if (typeof data.summary.total_stories !== 'number') {
      errors.push('summary.total_stories must be a number');
    }
    if (typeof data.summary.total_story_points !== 'number') {
      errors.push('summary.total_story_points must be a number');
    }
    if (!data.summary.theme_breakdown) {
      errors.push('summary.theme_breakdown is required');
    }
  }

  return {
    isValid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined
  };
};

/**
 * Validates if the parsed JSON matches the expected MarketingData structure
 * @param data The parsed JSON data
 * @returns An object with isValid flag and validation errors if any
 */
/**
 * Validates if the parsed JSON matches the expected VideoData structure
 * @param data The parsed JSON data
 * @returns An object with isValid flag and validation errors if any
 */
export const validateVideoData = (data: any): {
  isValid: boolean;
  errors?: string[];
} => {
  const errors: string[] = [];

  // Check for required top-level properties
  if (!data.ftueAnalysis) {
    errors.push('Missing required property: ftueAnalysis');
  }

  // Check ftueAnalysis structure if it exists
  if (data.ftueAnalysis) {
    if (!Array.isArray(data.ftueAnalysis)) {
      errors.push('ftueAnalysis must be an array');
    } else {
      // Validate each criterion
      data.ftueAnalysis.forEach((criterion: any, index: number) => {
        if (!criterion.criterion) {
          errors.push(`Criterion at index ${index} is missing criterion name`);
        }
        if (!['Yes', 'No', 'Partial', 'Not Applicable'].includes(criterion.meetsBestPractices)) {
          errors.push(`Criterion at index ${index} has invalid meetsBestPractices value`);
        }
        if (!criterion.observations) {
          errors.push(`Criterion at index ${index} is missing observations`);
        }
        if (!criterion.numericalValue) {
          errors.push(`Criterion at index ${index} is missing numericalValue`);
        }
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined
  };
};

/**
 * Validates if the parsed JSON matches the expected MarketingData structure
 * @param data The parsed JSON data
 * @returns An object with isValid flag and validation errors if any
 */
export const validateMarketingData = (data: any): {
  isValid: boolean;
  errors?: string[];
} => {
  const errors: string[] = [];

  // Check for required top-level properties
  const requiredProps = [
    'campaign_name',
    'target_audience',
    'campaign_duration',
    'campaign_budget',
    'overall_message',
    'campaign_strategies'
  ];

  requiredProps.forEach(prop => {
    if (!data[prop]) {
      errors.push(`Missing required property: ${prop}`);
    }
  });

  // Check campaign_strategies structure if it exists
  if (data.campaign_strategies) {
    if (!Array.isArray(data.campaign_strategies)) {
      errors.push('campaign_strategies must be an array');
    } else {
      // Validate each strategy
      data.campaign_strategies.forEach((strategy: any, index: number) => {
        if (!strategy.strategy_name) {
          errors.push(`Strategy at index ${index} is missing strategy_name`);
        }
        if (!strategy.description) {
          errors.push(`Strategy at index ${index} is missing description`);
        }
        if (!Array.isArray(strategy.tactics)) {
          errors.push(`Strategy at index ${index} tactics must be an array`);
        } else {
          // Validate each tactic in the strategy
          strategy.tactics.forEach((tactic: any, tacticIndex: number) => {
            if (!tactic.tactic_name) {
              errors.push(`Tactic at index ${index}.${tacticIndex} is missing tactic_name`);
            }
            if (!tactic.description) {
              errors.push(`Tactic at index ${index}.${tacticIndex} is missing description`);
            }
            if (!Array.isArray(tactic.platforms)) {
              errors.push(`Tactic at index ${index}.${tacticIndex} platforms must be an array`);
            }
            if (!tactic.estimated_cost) {
              errors.push(`Tactic at index ${index}.${tacticIndex} is missing estimated_cost`);
            }
          });
        }
        if (!Array.isArray(strategy.measurement_metrics)) {
          errors.push(`Strategy at index ${index} measurement_metrics must be an array`);
        }
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined
  };
};

/**
 * Determines the type of data and validates accordingly
 * @param data The parsed JSON data
 * @returns An object with isValid flag, data type, and validation errors if any
 */
export const determineDataTypeAndValidate = (data: any): {
  isValid: boolean;
  dataType?: 'problem' | 'spam' | 'comparison' | 'userStories' | 'marketing' | 'video';
  errors?: string[];
} => {
  // Check if it looks like problem data
  if (data.executive_summary && data.problem_analysis) {
    const validationResult = validateProblemData(data);
    return {
      ...validationResult,
      dataType: 'problem'
    };
  }
  
  // Check if it looks like spam data
  if (data.meta_analysis && data.statistical_analysis) {
    const validationResult = validateSpamData(data);
    return {
      ...validationResult,
      dataType: 'spam'
    };
  }
  
  // Check if it looks like comparison data
  if (data.historico_versoes && data.melhor_sentimento) {
    const validationResult = validateComparisonData(data);
    return {
      ...validationResult,
      dataType: 'comparison'
    };
  }
  
  // Check if it looks like user stories data
  if (data.themes && data.summary) {
    const validationResult = validateUserStoriesData(data);
    return {
      ...validationResult,
      dataType: 'userStories'
    };
  }
  
  // Check if it looks like marketing data
  if (data.campaign_name && data.campaign_strategies) {
    const validationResult = validateMarketingData(data);
    return {
      ...validationResult,
      dataType: 'marketing'
    };
  }
  
  // Check if it looks like video data
  if (data.ftueAnalysis) {
    const validationResult = validateVideoData(data);
    return {
      ...validationResult,
      dataType: 'video'
    };
  }
  
  // If we can't determine the type
  return {
    isValid: false,
    errors: ['Unable to determine data type. The JSON structure does not match any known format.']
  };
};

/**
 * Parses and validates a JSON string against known data structures
 * @param jsonString The JSON string to parse and validate
 * @param tabId The ID of the tab where the JSON is being loaded
 * @returns An object with isValid flag and the parsed data or error messages
 */
export const parseAndValidateJson = (jsonString: string, tabId: string): {
  isValid: boolean;
  data?: any;
  errors?: string[];
} => {
  const parseResult = validateJsonString(jsonString);
  
  if (!parseResult.isValid) {
    return { 
      isValid: false, 
      errors: [parseResult.error || 'Invalid JSON format'] 
    };
  }

  // If we know the tab ID, we can validate against the expected type
  if (tabId === 'problems') {
    const validationResult = validateProblemData(parseResult.data);
    if (!validationResult.isValid) {
      return {
        isValid: false,
        errors: validationResult.errors
      };
    }
    return {
      isValid: true,
      data: parseResult.data as ProblemData
    };
  } else if (tabId === 'spam') {
    const validationResult = validateSpamData(parseResult.data);
    if (!validationResult.isValid) {
      return {
        isValid: false,
        errors: validationResult.errors
      };
    }
    return {
      isValid: true,
      data: parseResult.data as SpamData
    };
  } else if (tabId === 'version') {
    const validationResult = validateComparisonData(parseResult.data);
    if (!validationResult.isValid) {
      return {
        isValid: false,
        errors: validationResult.errors
      };
    }
    return {
      isValid: true,
      data: parseResult.data as ComparisonData
    };
  } else if (tabId === 'stories') {
    const validationResult = validateUserStoriesData(parseResult.data);
    if (!validationResult.isValid) {
      return {
        isValid: false,
        errors: validationResult.errors
      };
    }
    return {
      isValid: true,
      data: parseResult.data as UserStoriesData
    };
  } else if (tabId === 'marketing') {
    const validationResult = validateMarketingData(parseResult.data);
    if (!validationResult.isValid) {
      return {
        isValid: false,
        errors: validationResult.errors
      };
    }
    return {
      isValid: true,
      data: parseResult.data as MarketingData
    };
  } else if (tabId === 'video') {
    const validationResult = validateVideoData(parseResult.data);
    if (!validationResult.isValid) {
      return {
        isValid: false,
        errors: validationResult.errors
      };
    }
    return {
      isValid: true,
      data: parseResult.data as VideoData
    };
  } else {
    // If we don't know the tab ID, try to determine the type
    const typeValidation = determineDataTypeAndValidate(parseResult.data);
    if (!typeValidation.isValid) {
      return {
        isValid: false,
        errors: typeValidation.errors
      };
    }
    return {
      isValid: true,
      data: parseResult.data
    };
  }
};
