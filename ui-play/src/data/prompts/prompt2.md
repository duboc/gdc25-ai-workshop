# Sentiment Analysis and Influencing Factors in User Reviews

This task involves analyzing user reviews from a CSV file (with headers reviewId, content, score, thumbsUpCount, reviewCreatedVersion, at, replyContent, repliedAt, appVersion) to identify factors influencing user sentiment. The goal is to understand how app version, represented by 'reviewCreatedVersion' and potentially correlated with 'appVersion', and specific features/issues relate to overall review sentiment. The final output should be structured in tables for easy interpretation and actionable insights.

## Tasks:

### Sentiment Classification:

Classify each user review (from the content column) into one of the following categories: "Positive", "Negative", or "Neutral". You can use the score column as a helper, but the content analysis should be the primary factor.

**Output:** A table showing the count of each sentiment category (Positive, Negative, Neutral) across the entire dataset.

**Sentiment Classification Table:**

| Sentiment  | Count |
|------------|-------|
| Positive   | [Positive Count]  |
| Negative   | [Negative Count]   |
| Neutral    | [Neutral Count]   |

### App Version and Sentiment Correlation:

Investigate if there's a correlation between the app version the user had when writing the review (reviewCreatedVersion) and the sentiment expressed in user reviews.

**Output:** A table showing the distribution of Positive, Negative, and Neutral sentiment for each unique reviewCreatedVersion. Include the total number of reviews per version and calculate the percentage of each sentiment category.

**App Version and Sentiment Correlation Table:**

| reviewCreatedVersion | Positive Count | Positive % | Negative Count | Negative % | Neutral Count | Neutral % | Total |
|----------------------|----------------|------------|----------------|------------|---------------|-----------|-------|
| Version [Version Name 1]          | [Positive Count]            | [Positive %]      | [Negative Count]             | [Negative %]        | [Neutral Count]            | [Neutral %]     | [Total Count]   |
| Version [Version Name 2]          | [Positive Count]            | [Positive %]        | [Negative Count]            | [Negative %]        | [Neutral Count]            | [Neutral %]       | [Total Count]   |
| ...                  | ...            | ...        | ...            | ...        | ...           | ...       | ...   |

### Feature/Issue Analysis:

Identify the most frequently mentioned features or problems in reviews (content column) and then analyze if certain reviewCreatedVersion or appVersion (if relevant) show a higher prevalence of these specific features/issues being mentioned.

**Output:**
*   A table summarizing the most frequently mentioned features/issues, along with the percentage of reviews mentioning them.
*   Create a separate table for each major feature/issue listing the prevalence by reviewCreatedVersion.
*   Also, if appVersion data is granular and useful, create a similar table for it.

**Feature/Issue Analysis Table:**

| Feature/Issue | Frequency | % of Reviews |
|---------------|-----------|--------------|
| [Feature/Issue 1]  | [Frequency Count]       | [Percentage]          |
| [Feature/Issue 2]  | [Frequency Count]       | [Percentage]          |
| ...           | ...       | ...          |

**Feature/Issue Prevalence by App Version (Example for "[Feature/Issue 1]") Table:**

| reviewCreatedVersion | "[Feature/Issue 1]" Count | % of reviews by reviewCreatedVersion |
|----------------------|-----------------------|--------------------------------------|
| Version [Version Name 1]          | [Count]                    | [Percentage]                                  |
| Version [Version Name 2]          | [Count]                   | [Percentage]                                 |
| ....                 | ....                  | ....                                 |

**Feature/Issue Prevalence by App Version (Example for "[Feature/Issue 1]") Table (IF AppVersion is granular and relevant):**

| appVersion   | "[Feature/Issue 1]" Count | % of reviews by appVersion |
|--------------|-----------------------|-----------------------------|
| Version [Version Name 1]  | [Count]                    | [Percentage]                         |
| Version [Version Name 2]  | [Count]                   | [Percentage]                         |
| ....         | ....                  | ....                        |


### Overall Insights and Recommendations:

Summarize the most significant findings, highlighting trends, and providing actionable insights for adapting the application to different audiences, versions, or feature sets.

**Overall Insights and Recommendations:**

[Summarize your findings here. For example:  "The sentiment analysis reveals a predominantly positive user sentiment overall. However, negative sentiment is notably higher in version [Version Name] specifically related to [Feature/Issue].  This suggests a potential regression or issue introduced in this version concerning [Feature/Issue].  Users on version [Version Name] also frequently mention [Feature/Issue 2], indicating a persistent problem. Recommendations include: 1) Prioritize bug fixes for [Feature/Issue] in version [Version Name]. 2) Investigate and address the recurring complaints about [Feature/Issue 2] across all versions, or specifically in versions where it's prevalent."]

don't generate code