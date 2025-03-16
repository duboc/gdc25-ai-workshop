# Version Comparison - Analysis Process

### 1. Data Collection
- Extract reviews from Google Play Store for your app
- Ensure the data includes review text and app version (reviewCreatedVersion)

### 2. Version Identification
- Identify the last 5 versions of the app
- Sort versions in descending order (newest to oldest)

### 3. Sentiment Analysis
For each version, analyze reviews to determine sentiment:
- **Positive**: Users express satisfaction, praise features, or report good experiences
- **Negative**: Users report bugs, crashes, or express dissatisfaction
- **Neutral**: Mixed feedback or purely descriptive comments

### 4. Scoring System
Assign a sentiment score (1-10) using this scale:
- **1-3**: Very negative sentiment
- **4-6**: Negative to neutral sentiment
- **7-8**: Positive sentiment
- **9-10**: Very positive sentiment

### 5. Summary Generation
Create concise summaries (max 100 words) that highlight:
- Overall sentiment for each version
- Key features that received positive feedback
- Major issues or pain points
- Notable trends or changes from previous versions

### 6. Best and Worst Version Identification
Compare sentiment scores to identify:
- Best performing version (highest sentiment score)
- Worst performing version (lowest sentiment score)

## Output Format
The analysis results will be formatted as JSON with:
- Complete version history with sentiment analysis
- Identification of best version
- Identification of worst version

## Best Practices
- Focus on objectivity in sentiment classification
- Identify patterns across versions to track improvement
- Pay attention to recurring themes in user feedback
- Use insights to guide future development priorities