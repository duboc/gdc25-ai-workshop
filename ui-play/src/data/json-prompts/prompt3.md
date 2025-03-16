# Structured User Segmentation Prompt

## Purpose
This prompt is designed to analyze multiple Google Play Store reviews to identify distinct user segments and provide a structured JSON output with detailed segmentation analysis.

## Prompt Template

```
Analyze the following set of Google Play Store reviews to identify distinct user segments and provide a structured response:

Reviews:
1. "{review_1}"
2. "{review_2}"
3. "{review_3}"
...

Your analysis should include:
1. Identification of distinct user segments based on needs, behaviors, or demographics
2. For each identified segment:
   a. Key characteristics and patterns
   b. Primary needs and pain points
   c. Feature preferences
   d. Typical usage patterns
   e. Recommendations for product improvements
   f. Suggested messaging or marketing approaches
3. Cross-segment opportunities that could benefit multiple user types
4. Suggested prioritization of segments based on potential value

Format your response as a valid JSON object with the following structure:
{
  "user_segments": [
    {
      "segment_name": string,
      "characteristics": [string],
      "needs": [string],
      "feature_preferences": [string],
      "usage_patterns": [string],
      "improvement_recommendations": [string],
      "marketing_approach": [string]
    }
  ],
  "cross_segment_opportunities": [string],
  "segment_prioritization": [
    {
      "segment_name": string,
      "priority_reason": string
    }
  ]
}

Ensure your response is valid JSON that can be parsed programmatically.
```

## Example Usage

```
Analyze the following set of Google Play Store reviews to identify distinct user segments and provide a structured response:

Reviews:
1. "I use this app every day for work. It helps me track my sales targets and client meetings. Would be better if it integrated with Salesforce. The UI is a bit complex but I've gotten used to it."
2. "Downloaded this for my small business to track inventory. It's simple enough for my needs but lacks some advanced features. The price is right though!"
3. "As a student, I find this app perfect for keeping track of assignments and group projects. The free version has all I need. Love the colorful interface!"
4. "I'm a busy mom using this to organize family activities and shopping lists. The shared lists feature is a lifesaver! Wish it had location-based reminders."
5. "Using this in our corporate environment to manage team tasks. Need better admin controls and user permission settings. The reporting features are excellent though."

Your analysis should include:
1. Identification of distinct user segments based on needs, behaviors, or demographics
2. For each identified segment:
   a. Key characteristics and patterns
   b. Primary needs and pain points
   c. Feature preferences
   d. Typical usage patterns
   e. Recommendations for product improvements
   f. Suggested messaging or marketing approaches
3. Cross-segment opportunities that could benefit multiple user types
4. Suggested prioritization of segments based on potential value

Format your response as a valid JSON object with the following structure:
{
  "user_segments": [
    {
      "segment_name": string,
      "characteristics": [string],
      "needs": [string],
      "feature_preferences": [string],
      "usage_patterns": [string],
      "improvement_recommendations": [string],
      "marketing_approach": [string]
    }
  ],
  "cross_segment_opportunities": [string],
  "segment_prioritization": [
    {
      "segment_name": string,
      "priority_reason": string
    }
  ]
}

Ensure your response is valid JSON that can be parsed programmatically.
```

## Expected Output (Partial)

```json
{
  "user_segments": [
    {
      "segment_name": "Professional Sales Users",
      "characteristics": [
        "Use the app for work/sales activities",
        "Technically proficient",
        "Value integration with other business tools",
        "Willing to navigate complex interfaces for functionality"
      ],
      "needs": [
        "CRM integration (specifically Salesforce)",
        "Advanced tracking capabilities",
        "Professional interface"
      ],
      "feature_preferences": [
        "Business integrations",
        "Sales tracking tools",
        "Client management features"
      ],
      "usage_patterns": [
        "Daily, consistent use",
        "Work-hour focused usage",
        "Task-oriented interaction"
      ],
      "improvement_recommendations": [
        "Implement Salesforce API integration",
        "Add specialized sales pipeline visualization",
        "Create templates for common sales activities",
        "Develop a \"pro\" interface mode with advanced features"
      ],
      "marketing_approach": [
        "Emphasize productivity gains and ROI",
        "Highlight time-saving through automation",
        "Use professional, business-oriented language",
        "Focus on reliability and data security"
      ]
    },
    {
      "segment_name": "Small Business Owners",
      "characteristics": [
        "Price-sensitive",
        "Looking for simple solutions",
        "Focus on inventory management",
        "Value straightforward functionality"
      ],
      "needs": [
        "Basic tracking capabilities",
        "Affordable pricing",
        "Simple interface",
        "Reliable performance"
      ],
      "feature_preferences": [
        "Inventory tracking",
        "Basic reporting",
        "Cost-effective solution"
      ],
      "usage_patterns": [
        "Regular but not daily use",
        "Focused on specific business functions",
        "Practical, results-oriented usage"
      ],
      "improvement_recommendations": [
        "Add small business-specific templates",
        "Create simplified inventory management views",
        "Maintain affordable pricing tier",
        "Add basic financial reporting"
      ],
      "marketing_approach": [
        "Emphasize affordability and value",
        "Highlight ease of use for non-technical users",
        "Focus on specific small business use cases",
        "Stress reliability and support"
      ]
    }
  ],
  "cross_segment_opportunities": [
    "A tiered pricing model would address the different willingness to pay across segments",
    "Customizable interface could serve both simple and advanced use cases",
    "Template library would benefit all identified segments with different templates for each"
  ],
  "segment_prioritization": [
    {
      "segment_name": "Corporate Team Managers",
      "priority_reason": "Highest revenue potential"
    },
    {
      "segment_name": "Professional Sales Users",
      "priority_reason": "High engagement"
    },
    {
      "segment_name": "Small Business Owners",
      "priority_reason": "Growth potential"
    }
  ]
}
```

## When to Use
Use this prompt when you need to understand the different types of users using your app and their specific needs in a structured format. This analysis is valuable for product strategy, feature prioritization, and creating targeted marketing campaigns.

## Configuration Options
This prompt can be customized with the following parameters:

- **max_segments**: Maximum number of user segments to identify (default: 5)
- **include_marketing**: Boolean flag to include or exclude marketing approach suggestions (default: true)

See the accompanying JSON configuration file for more details.
