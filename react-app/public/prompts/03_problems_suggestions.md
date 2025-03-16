# Optimized Prompt for User Review Analysis - Flash 2.0 API

**Objective:** Analyze user reviews from a CSV file (columns: 'content', 'score', 'at') to identify problems, suggestions, and trends over time. Deliver actionable insights for developers and product managers.

**Analysis Tasks (Ordered by Priority):**

1. **Negative Review Problem Analysis:**
    * **Sentiment-Based Negativity:**  Analyze 'content' to identify *negative* reviews (ignore 'score' for sentiment).
    * **Problem Categorization:** Classify negative reviews into these categories:
        * Bugs/Glitches
        * Feature Issues
        * Performance Problems
        * Usability Issues
        * Content/Quality Issues
        * Other (please specify if possible)
    * **Frequency Count:** Calculate the number of reviews in each problem category.
    * **Example Reviews:** For each category, provide 2-3 example 'content' excerpts with their 'at' dates.
    * **Time-Based Trend (Problem Categories):** Analyze if the frequency of each problem category is increasing, decreasing, or stable over time. Indicate trend direction (increasing, decreasing, stable) for each category.
    * **Severity Classification:** Classify each problem category as 'Critical', 'Major', or 'Minor' based on its impact on user experience.

2. **Suggestion & Feature Request Analysis:**
    * **Suggestion Extraction:** Extract suggestions and feature requests from *all* reviews (positive, negative, neutral).
    * **Suggestion Grouping:** Group extracted suggestions into logical themes (e.g., "Payment Options," "Search Functionality," "Customization"). Aim for concise theme names.
    * **Frequency Count (Suggestions):** Count the number of reviews mentioning each suggestion group.
    * **Prioritization (Suggestions):** Rank suggestion groups by frequency. Estimate impact (High, Medium, Low) based on review context.
    * **Example Reviews (Suggestions):** For top suggestion groups, provide 1-2 example 'content' excerpts.
    * **Emerging Suggestions Trend:** Identify any *new* suggestion groups that appear in later reviews (based on 'at' date).
    * **Implementation Difficulty:** Estimate difficulty level (Easy, Medium, Hard) for each suggestion group.

3. **Sentiment Trend Analysis:**
    * **Sentiment Evolution:** Track the overall sentiment (positive, negative, neutral) of reviews over time.
    * **Provide monthly or quarterly sentiment summary if possible.**
    * **Identify specific events or updates that might have affected sentiment.**

4. **Audience Segmentation (Optional):**
    * **User Type Analysis:** If possible, categorize users into groups based on their reviews (e.g., "Power Users", "Casual Users", "New Users").
    * **Segment-Specific Issues:** Identify problems that affect specific user segments more than others.

**Output Requirements:**

* **Format:** Return output in the exact JSON format specified below.
* **Structure:** Follow this schema precisely, including all fields:

```json
{
  "executive_summary": "A concise 3-5 sentence summary of the major findings and recommendations",
  "problem_analysis": {
    "table": [
      {
        "category": "Bug/Glitch",
        "frequency": 32,
        "severity": "Critical", 
        "example_reviews": [
          {"content": "Example review text here", "at": "2023-10-26"},
          {"content": "Second example review", "at": "2023-09-15"}
        ],
        "trend": "Increasing",
        "affected_user_segments": ["Power Users", "New Users"]
      }
    ],
    "trend_summary": "Text summary of problem trends over time.",
    "critical_problems_count": 2,
    "most_affected_segments": ["New Users"]
  },
  "suggestion_analysis": {
    "table": [
      {
        "suggestion_group": "Improved Search",
        "frequency": 45,
        "estimated_impact": "High",
        "implementation_difficulty": "Medium",
        "example_reviews": [
          {"content": "Example suggestion review text"},
          {"content": "Second example suggestion review"}
        ]
      }
    ],
    "emerging_suggestions": "Text summary of emerging suggestions that appeared recently.",
    "high_impact_count": 3,
    "quick_wins": ["Brief description of high-impact, low-difficulty suggestions"]
  },
  "sentiment_trend_analysis": {
    "summary": "Overall text summary of sentiment trends",
    "period_trends": [
      {"period": "2023 Q1", "positive_percentage": 60, "negative_percentage": 25, "neutral_percentage": 15},
      {"period": "2023 Q2", "positive_percentage": 55, "negative_percentage": 30, "neutral_percentage": 15}
    ],
    "significant_events": [
      {"date": "2023-03-15", "event": "App update v2.0", "sentiment_impact": "Negative"},
      {"date": "2023-06-01", "event": "Bug fix release", "sentiment_impact": "Positive"}
    ]
  },
  "user_segments": {
    "identified_segments": ["Power Users", "Casual Users", "New Users"],
    "segment_specific_issues": [
      {"segment": "New Users", "top_issues": ["Onboarding Problems", "Feature Discovery"]}
    ]
  },
  "actionable_insights": [
    "First specific, actionable recommendation based on the data",
    "Second specific, actionable recommendation",
    "Third specific, actionable recommendation"
  ]
}
```

**Important Notes:**
1. Focus on providing accurate, insightful analysis rather than just extracting keywords.
2. Ensure the analysis is based on actual review content, not just ratings.
3. Keep all text fields concise and specific - focus on insights that would be valuable to product managers and developers.
4. Ensure your response EXACTLY follows the specified JSON format - this is essential for proper processing by the application.
5. If a section has no data, include it as an empty array or with minimal placeholder text rather than omitting the field.