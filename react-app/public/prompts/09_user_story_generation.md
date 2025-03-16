## Prompt 9: User Story Generation from Analysis

```
Based on the detailed sentiment analysis provided, create user stories following the format:

As a [type of user],
I want [goal/desire]
So that [benefit/value]

Guidelines for story creation:
1. Focus on the main pain points and feature requests identified in the analysis
2. Prioritize stories based on sentiment frequency and impact
3. Include acceptance criteria for each story
4. Add story points estimation (1,2,3,5,8,13)
5. Group stories by themes (e.g., UI/UX, Performance, Features)

Expected output format (JSON):
{
    "themes": [
        {
            "name": "string",
            "stories": [
                {
                    "as_a": "string",
                    "i_want": "string",
                    "so_that": "string",
                    "acceptance_criteria": ["string"],
                    "story_points": number,
                    "priority": "High|Medium|Low",
                    "supporting_reviews": ["string"]
                }
            ]
        }
    ],
    "summary": {
        "total_stories": number,
        "total_story_points": number,
        "theme_breakdown": {
            "theme_name": number
        }
    }
}
```

