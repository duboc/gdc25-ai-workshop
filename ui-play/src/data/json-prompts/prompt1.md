# Structured Sentiment Analysis Prompt

## Purpose
This prompt is designed to analyze the sentiment of Google Play Store reviews and provide a structured JSON output with detailed sentiment analysis.

## Prompt Template

```
Analyze the sentiment of the following Google Play Store review and provide a structured response:

Review: "{review_text}"

Your analysis should include:
1. Overall sentiment classification
2. Numerical sentiment score (0-1 scale)
3. Positive aspects mentioned with confidence scores
4. Negative aspects mentioned with confidence scores
5. Improvement suggestions
6. A brief summary of the user's experience

Format your response as a valid JSON object with the following structure:
{
  "overall_sentiment": string,
  "sentiment_score": number,
  "positive_aspects": [
    {
      "aspect": string,
      "confidence": number
    }
  ],
  "negative_aspects": [
    {
      "aspect": string,
      "confidence": number
    }
  ],
  "improvement_suggestions": [string],
  "user_experience_summary": string
}

Ensure your response is valid JSON that can be parsed programmatically.
```

## Example Usage

```
Analyze the sentiment of the following Google Play Store review and provide a structured response:

Review: "This app is mostly good but has some annoying bugs. I love the interface and how easy it is to find what I'm looking for. However, it crashes at least once a day and sometimes loses my saved data. Would be 5 stars if these issues were fixed."

Your analysis should include:
1. Overall sentiment classification
2. Numerical sentiment score (0-1 scale)
3. Positive aspects mentioned with confidence scores
4. Negative aspects mentioned with confidence scores
5. Improvement suggestions
6. A brief summary of the user's experience

Format your response as a valid JSON object with the following structure:
{
  "overall_sentiment": string,
  "sentiment_score": number,
  "positive_aspects": [
    {
      "aspect": string,
      "confidence": number
    }
  ],
  "negative_aspects": [
    {
      "aspect": string,
      "confidence": number
    }
  ],
  "improvement_suggestions": [string],
  "user_experience_summary": string
}

Ensure your response is valid JSON that can be parsed programmatically.
```

## Expected Output

```json
{
  "overall_sentiment": "Mixed (Leaning Positive)",
  "sentiment_score": 0.65,
  "positive_aspects": [
    {
      "aspect": "User-friendly interface",
      "confidence": 0.95
    },
    {
      "aspect": "Easy navigation and search functionality",
      "confidence": 0.9
    }
  ],
  "negative_aspects": [
    {
      "aspect": "App crashes frequently",
      "confidence": 0.95
    },
    {
      "aspect": "Data loss issues",
      "confidence": 0.9
    },
    {
      "aspect": "Reliability concerns",
      "confidence": 0.85
    }
  ],
  "improvement_suggestions": [
    "Fix stability issues to prevent crashes",
    "Implement better data saving/recovery mechanisms",
    "Address bug causing data loss"
  ],
  "user_experience_summary": "The user generally appreciates the app's design and usability but is frustrated by technical issues that impact reliability. They indicate willingness to give a perfect rating if the stability problems are resolved."
}
```

## When to Use
Use this prompt when you need structured, machine-readable sentiment analysis of user reviews. The JSON output format makes it easy to process the results programmatically, enabling automated analysis of large numbers of reviews, trend identification, and integration with other systems.

## Configuration Options
This prompt can be customized with the following parameters:

- **include_suggestions**: Boolean flag to include or exclude improvement suggestions (default: true)
- **sentiment_scale**: The scale to use for sentiment classification ("3-point" or "5-point", default: "3-point")

See the accompanying JSON configuration file for more details.
