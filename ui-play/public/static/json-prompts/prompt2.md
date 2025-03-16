# Structured Feature Request Extraction Prompt

## Purpose
This prompt is designed to extract feature requests from Google Play Store reviews and provide a structured JSON output with detailed categorization and implementation suggestions.

## Prompt Template

```
Extract feature requests from the following Google Play Store review and provide a structured response:

Review: "{review_text}"

Your analysis should include:
1. A list of all explicit or implicit feature requests in the review
2. For each feature request:
   a. The feature name
   b. Category (UI/UX, Performance, Functionality, Integration, Security, Other)
   c. Clarity rating (Clear, Somewhat Clear, Vague)
   d. Impact assessment (High, Medium, Low)
   e. Implementation difficulty (Easy, Medium, Hard)
   f. Suggested implementation approach
3. Any competing apps mentioned that already have these features
4. An assessment of the urgency of implementing these features

Format your response as a valid JSON object with the following structure:
{
  "feature_requests": [
    {
      "feature": string,
      "category": string,
      "clarity": string,
      "impact": string,
      "implementation_difficulty": string,
      "implementation_approach": [string]
    }
  ],
  "competing_apps": [
    {
      "app_name": string,
      "features": [string]
    }
  ],
  "urgency_assessment": {
    "level": string,
    "reasoning": string
  }
}

Ensure your response is valid JSON that can be parsed programmatically.
```

## Example Usage

```
Extract feature requests from the following Google Play Store review and provide a structured response:

Review: "I've been using this app for months and it's almost perfect for my needs. Would love to see dark mode support and the ability to export my data to CSV. Also, it would be great if it could sync with my Google Calendar. The competitor app 'TaskMaster' already has these features and I'm considering switching if these aren't added soon."

Your analysis should include:
1. A list of all explicit or implicit feature requests in the review
2. For each feature request:
   a. The feature name
   b. Category (UI/UX, Performance, Functionality, Integration, Security, Other)
   c. Clarity rating (Clear, Somewhat Clear, Vague)
   d. Impact assessment (High, Medium, Low)
   e. Implementation difficulty (Easy, Medium, Hard)
   f. Suggested implementation approach
3. Any competing apps mentioned that already have these features
4. An assessment of the urgency of implementing these features

Format your response as a valid JSON object with the following structure:
{
  "feature_requests": [
    {
      "feature": string,
      "category": string,
      "clarity": string,
      "impact": string,
      "implementation_difficulty": string,
      "implementation_approach": [string]
    }
  ],
  "competing_apps": [
    {
      "app_name": string,
      "features": [string]
    }
  ],
  "urgency_assessment": {
    "level": string,
    "reasoning": string
  }
}

Ensure your response is valid JSON that can be parsed programmatically.
```

## Expected Output

```json
{
  "feature_requests": [
    {
      "feature": "Dark Mode Support",
      "category": "UI/UX",
      "clarity": "Clear",
      "impact": "Medium",
      "implementation_difficulty": "Easy",
      "implementation_approach": [
        "Add a theme toggle in settings",
        "Create dark color palette",
        "Implement theme switching logic",
        "Test across all screens"
      ]
    },
    {
      "feature": "CSV Export Functionality",
      "category": "Functionality",
      "clarity": "Clear",
      "impact": "High",
      "implementation_difficulty": "Medium",
      "implementation_approach": [
        "Add export button in data view screens",
        "Create service to format data into CSV structure",
        "Implement file saving using device's native sharing options",
        "Add options for selecting date ranges and data categories"
      ]
    },
    {
      "feature": "Google Calendar Integration",
      "category": "Integration",
      "clarity": "Clear",
      "impact": "High",
      "implementation_difficulty": "Hard",
      "implementation_approach": [
        "Implement Google OAuth 2.0 authentication",
        "Use Google Calendar API for bidirectional sync",
        "Create settings for sync preferences",
        "Implement conflict resolution logic"
      ]
    }
  ],
  "competing_apps": [
    {
      "app_name": "TaskMaster",
      "features": [
        "Dark Mode Support",
        "CSV Export Functionality",
        "Google Calendar Integration"
      ]
    }
  ],
  "urgency_assessment": {
    "level": "High",
    "reasoning": "User explicitly mentions considering switching to a competitor if features aren't added soon, indicating high risk of customer loss."
  }
}
```

## When to Use
Use this prompt when you need to extract actionable feature requests from user reviews in a structured format. The JSON output makes it easy to prioritize development efforts, track feature requests across multiple reviews, and identify patterns in user needs.

## Configuration Options
This prompt can be customized with the following parameters:

- **max_features**: Maximum number of feature requests to extract (default: 5)
- **include_implementation**: Boolean flag to include or exclude implementation suggestions (default: true)

See the accompanying JSON configuration file for more details.
