# Sentiment Analysis and Influencing Factors in User Reviews

This task involves analyzing user reviews from a CSV file (with headers reviewId, content, score, thumbsUpCount, reviewCreatedVersion, at, replyContent, repliedAt, appVersion) to identify factors influencing user sentiment. The goal is to understand how app version, represented by 'reviewCreatedVersion' and potentially correlated with 'appVersion', and specific features/issues relate to overall review sentiment. The final output should be structured in tables for easy interpretation and actionable insights.

Tasks:

Sentiment Classification:

Classify each user review (from the content column) into one of the following categories: "Positive", "Negative", or "Neutral". You can use the score column as a helper, but the content analysis should be the primary factor.

Output: A table showing the count of each sentiment category (Positive, Negative, Neutral) across the entire dataset.

App Version and Sentiment Correlation:

Investigate if there's a correlation between the app version the user had when writing the review (reviewCreatedVersion) and the sentiment expressed in user reviews.

Output: A table showing the distribution of Positive, Negative, and Neutral sentiment for each unique reviewCreatedVersion. Include the total number of reviews per version and calculate the percentage of each sentiment category.

Feature/Issue Analysis:

Identify the most frequently mentioned features or problems in reviews (content column) and then analyze if certain reviewCreatedVersion or appVersion (if relevant) show a higher prevalence of these specific features/issues being mentioned.

Output: A table summarizing the most frequently mentioned features/issues, along with the percentage of reviews mentioning them. Create a separate table for each major feature/issue listing the prevalence by reviewCreatedVersion. Also, if appVersion data is granular and useful, create a similar table for it.

Overall Insights and Recommendations:

Summarize the most significant findings, highlighting trends, and providing actionable insights for adapting the application to different audiences, versions, or feature sets.

Output: A short text summary of the findings and recommendations.

Final Output Table Examples:

Sentiment Classification Table:

Sentiment	Count
Positive	1234
Negative	567
Neutral	789
App Version and Sentiment Correlation Table:

reviewCreatedVersion	Positive Count	Positive %	Negative Count	Negative %	Neutral Count	Neutral %	Total
Version 1.0	250	65.8%	80	21%	50	13.2%	380
Version 1.1	120	48%	100	40%	30	12%	250
...	...	...	...	...	...	...	...
Feature/Issue Analysis Table:

Feature/Issue	Frequency	% of Reviews
Login Issues	450	25%
Battery life	200	12%
...	...	...
Feature/Issue Prevalence by App Version (Example for "Login Issues") Table:

reviewCreatedVersion	"Login Issues" Count	% of reviews by reviewCreatedVersion
Version 1.0	80	21%
Version 1.1	110	44%
....	....	....
Feature/Issue Prevalence by App Version (Example for "Login Issues") Table (IF AppVersion is granular and relevant):

appVersion	"Login Issues" Count	% of reviews by appVersion
Version 1.0	80	21%
Version 1.1	110	44%
....	....	....


and do not generate any python code for this. 