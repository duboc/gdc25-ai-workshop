## User Segmentation Prompt

**Objective:** To identify distinct user segments based on their reviews, in order to better understand their motivations, preferences, and pain points.

**Data Source:** The provided review CSV data (including `reviewId`, `content`, `score`, `thumbsUpCount`, `reviewCreatedVersion`, `at`, `replyContent`, `repliedAt`, `appVersion`).

**Segmentation Variables:**

### 1. Sentiment & Tone (derived from `content`)

*   **Sentiment:** Positive, Negative, Neutral (Use NLP techniques to classify sentiment)

*   **Keywords & Themes:**

    *   Nostalgia (references to childhood, past experiences)
    *   Fun/Enjoyment (explicit mentions of fun, enjoyment, etc.)
    *   Difficulty (mentions of challenging, hard, easy)
    *   Ads/Monetization (comments about ads, in-app purchases, "pay-to-win")
    *   Strategy/Gameplay (references to strategic depth, gameplay mechanics)
    *   Content Volume (comments about number of levels, game updates)
    *   Bugs/Technical Issues (mentions of glitches, crashes, performance)
    *   Value (references to price, free content)
    *   Comparisons to other games (explicitly compared to other games)

### 2. Rating (`score`)

*   Group scores into categories: 1-2 stars (Detractors), 3 stars (Neutral/Mixed), 4-5 stars (Promoters)

### 3. Engagement (`thumbsUpCount`)

*   High Engagement: Reviews with a significant number of thumbs up (define a threshold, e.g., > 0). This represents reviews that resonate with other players.

*   Low Engagement: Reviews with few or no thumbs up.

### 4. Reviewer Behavior

*   **Review Length:** (Short, Medium, Long - based on word count in `content`) - Longer reviews might indicate more invested users.

*   **App Version (`appVersion`):** Which versions of the app are people using/reviewing. Group by major versions.

*   **Date of Review (`at`):** Time-based trends (e.g., are there spikes in negative reviews after a particular update?). Analyze reviews over time.

### 5. Content Focus

*   **Specific Features Mentioned:** Identify reviews that focus on particular heroes, levels, or game mechanics. This can highlight what aspects of the game are most discussed.

*   **Problem Focus:** Is the review focused on a specific problem they encountered? (e.g., lost progress, inability to access content).