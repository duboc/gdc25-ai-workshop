# Feature Request Analysis Prompt

## Purpose
This prompt helps identify, categorize, and prioritize feature requests and suggestions embedded within user reviews. It facilitates product teams in making data-driven development decisions.

## Review Analysis Instructions

Analyze the following Google Play Store review to identify any feature requests, suggestions, or expressions of dissatisfaction related to existing features:

This task involves analyzing user reviews from a CSV file (with headers reviewId, content, score, thumbsUpCount, reviewCreatedVersion, at, replyContent, repliedAt, appVersion) 

**Instructions:**

1.  **Identify Feature Requests/Suggestions:**
    *   List all explicit or implicit feature requests or suggestions present in the review.
    *   Include any complaints about the performance of existing features that could be interpreted as a need for improvement (e.g., "It's too slow").
    *   If no feature requests are found, state: "No feature requests identified."

2.  **For Each Identified Feature Request:**
    *   **a. Categorize:** Choose *one* primary category and *up to two* secondary categories (if applicable) from the lists below:
        *   **Primary Categories:** UI/UX, Functionality, Performance, Integration, Customization, Content
        *   **Secondary Categories:** (Use the same categories as above)
    *   **b. Clarity:** Rate the clarity of the request using these definitions:
        *   **Clear:** Specific, well-defined.
        *   **Somewhat Clear:** Understandable but lacks details.
        *   **Vague:** General, difficult to interpret.
    *   **c. Potential Impact:** Estimate the potential impact on user satisfaction, retention, and acquisition using these definitions:
        *   **High:** Significant positive impact expected.
        *   **Medium:** Moderate positive impact expected.
        *   **Low:** Minimal positive impact expected.

3.  **Prioritize Implementation (Top 2 Most Impactful):**
    *   For the top 2 most impactful feature requests, suggest *either*:
        *   **Detailed Implementation Approaches:** Concrete steps for implementation.
        *   **General Implementation Considerations:** Key aspects to consider.

4.  **Competitor Analysis:**
    *   Identify competing apps mentioned that offer requested features.
    *   Note competitor name and features.

5.  **Conflicting Requests/Feedback:**
    *  Identify and note any conflicting requests or negative feedback related to suggested changes.

6.  **Remember:** Prioritize based on *impact* on the *overall user base* and app's strategic goals.

**Format your response as a structured analysis with clear sections in markdown tables.**

## Expected Output (Example based on the example review text)


# Feature Request Analysis

## Identified Feature Requests

| # | Feature Request                                     |
|---|------------------------------------------------------|
| 1 | Calendar View of Habits                             |
| 2 | Social Sharing Functionality                        |
| 3 | Performance Improvement when adding new habits (Speed) |

## Feature Request Analysis

| # | Feature Request                                     | Primary Category | Secondary Category | Clarity        | Potential Impact |
|---|------------------------------------------------------|-------------------|--------------------|----------------|-------------------|
| 1 | Calendar View of Habits                             | Functionality     | UI/UX              | Clear          | High              |
| 2 | Social Sharing Functionality                        | Functionality     | Integration        | Clear          | Medium            |
| 3 | Performance Improvement when adding new habits (Speed) | Performance       |                    | Somewhat Clear | Medium            |

## Prioritized Implementation Approaches

### Top 2 Most Impactful Feature Requests

| # | Feature Request             | Implementation Approach/Considerations                                                                                                                                  |
|---|-----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1 | Calendar View of Habits     | **Detailed Implementation Approaches:** Integrate calendar component, visualize habit status, allow month navigation, ensure data integration.                               |
| 2 | Social Sharing Functionality | **General Implementation Considerations:** Determine sharing scope, research platforms, implement privacy controls, consider gamification.                                  |

## Competitor Analysis

| Competitor App | Features (Offered)        |
|----------------|---------------------------|
| Habitica       | Social sharing functionality |

## Conflicting Requests/Feedback

None identified in this review.

## Additional Notes

User is generally happy but desires enhanced visualization and social features. Competitor awareness suggests potential churn if features are ignored.

don't generate code