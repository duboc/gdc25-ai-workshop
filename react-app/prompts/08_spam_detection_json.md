# Detecção de Reviews Inconsistentes ou Spam

Analise os reviews fornecidos e faça uma investigação detalhada para identificar possíveis manipulações, spam e inconsistências, considerando os seguintes aspectos:

1. Análise Estatística:
- Distribuição dos ratings (1-5 estrelas)
- Comprimento médio dos reviews
- Frequência de palavras-chave
- Padrões temporais nas postagens

2. Análise de Conteúdo:
- Discrepâncias entre sentimento do texto e rating atribuído
- Reviews muito curtos ou sem conteúdo significativo
- Uso excessivo de emojis ou formatação suspeita
- Linguagem artificial ou muito repetitiva
- Comentários genéricos que poderiam se aplicar a qualquer app

3. Padrões de Comportamento:
- Reviews similares ou idênticos postados em períodos próximos
- Picos anormais de reviews positivos/negativos
- Usuários com múltiplos reviews
- Reviews que parecem coordenados ou em massa

4. Sinais de Autenticidade:
- Menção a características específicas do app
- Feedback detalhado e construtivo
- Descrição de experiências pessoais
- Linguagem natural e conversacional

5. Red Flags:
- Reviews que promovem outros apps/produtos
- Linguagem extremamente promocional
- Informações irrelevantes ao app
- Padrões suspeitos de upvotes/likes

Por favor, forneça:
1. Uma análise quantitativa dos padrões encontrados
2. Lista de reviews potencialmente problemáticos com justificativa
3. Recomendações para melhorar a detecção de spam
4. Insights sobre a qualidade geral dos reviews

Apresente o resultado em um JSON no seguinte formato:

```
{
  "meta_analysis": {
    "total_reviews": 123,
    "analysis_date": "2024-11-13",
    "time_period": {
      "start_date": "2022-01-01",
      "end_date": "2024-11-13"
    }
  },
  "statistical_analysis": {
    "rating_distribution": {
      "1_star": {"count": 20, "percentage": 16.3},
      "2_star": {"count": 15, "percentage": 12.2},
      "3_star": {"count": 10, "percentage": 8.1},
      "4_star": {"count": 28, "percentage": 22.8},
      "5_star": {"count": 50, "percentage": 40.6}
    },
    "review_length": {
      "average_chars": 245,
      "median_chars": 180,
      "distribution": {
        "very_short": {"range": "0-50", "count": 30},
        "short": {"range": "51-150", "count": 45},
        "medium": {"range": "151-300", "count": 25},
        "long": {"range": "301+", "count": 23}
      }
    },
    "temporal_patterns": {
      "daily_average": 2.5,
      "peak_dates": [
        {
          "date": "2024-01-15",
          "count": 12,
          "deviation_from_mean": 380
        }
      ],
      "monthly_distribution": {
        "2024-01": 45,
        "2024-02": 38
      }
    },
    "keyword_frequency": {
      "top_keywords": [
        {"word": "controls", "count": 89},
        {"word": "graphics", "count": 67}
      ],
      "common_phrases": [
        {"phrase": "good game", "count": 45}
      ]
    }
  },
  "content_analysis": {
    "sentiment_discrepancies": {
      "total_found": 15,
      "examples": [
        {
          "review_id": "abc123",
          "rating": 5,
          "sentiment_score": -0.8,
          "content": "This is terrible...",
          "reason": "Negative text with 5-star rating"
        }
      ]
    },
    "suspicious_patterns": {
      "short_reviews": [
        {
          "review_id": "def456",
          "content": "good",
          "rating": 5,
          "length": 4
        }
      ],
      "emoji_abuse": [
        {
          "review_id": "ghi789",
          "emoji_count": 25,
          "content": "..."
        }
      ],
      "generic_comments": [
        {
          "review_id": "jkl012",
          "content": "Nice app",
          "frequency": 12
        }
      ]
    }
  },
  "behavioral_patterns": {
    "similar_reviews": {
      "clusters": [
        {
          "similarity_score": 0.95,
          "review_ids": ["abc123", "def456"],
          "time_difference": "2 hours"
        }
      ]
    },
    "rating_anomalies": {
      "sudden_spikes": [
        {
          "date": "2024-01-15",
          "rating": 5,
          "count": 15,
          "normal_average": 3
        }
      ]
    },
    "multiple_reviews": {
      "users": [
        {
          "user_id": "user123",
          "review_count": 3,
          "reviews": ["abc123", "def456", "ghi789"]
        }
      ]
    }
  },
  "authenticity_indicators": {
    "specific_features": [
      {
        "review_id": "abc123",
        "feature_mentioned": "steering controls",
        "context": "..."
      }
    ],
    "detailed_feedback": [
      {
        "review_id": "def456",
        "feedback_quality_score": 0.9,
        "highlights": ["detailed bug report", "specific use case"]
      }
    ]
  },
  "red_flags": {
    "promotional_content": [
      {
        "review_id": "abc123",
        "promotional_terms": ["download now", "better than competitors"],
        "severity": "high"
      }
    ],
    "irrelevant_content": [
      {
        "review_id": "def456",
        "content": "Check out my channel...",
        "type": "self_promotion"
      }
    ],
    "suspicious_voting": [
      {
        "review_id": "ghi789",
        "votes": 150,
        "average_votes": 5,
        "deviation": "3000%"
      }
    ]
  },
  "recommendations": {
    "spam_detection": [
      {
        "issue": "Short generic reviews",
        "suggestion": "Implement minimum character limit",
        "priority": "high"
      }
    ],
    "quality_improvement": [
      {
        "area": "Review guidelines",
        "suggestion": "Add specific prompts for detailed feedback",
        "expected_impact": "high"
      }
    ]
  },
  "overall_quality_metrics": {
    "authenticity_score": 0.75,
    "spam_percentage": 12.3,
    "average_quality_score": 0.68,
    "key_findings": [
      "15% of reviews show suspicious patterns",
      "High authenticity in detailed reviews"
    ]
  }
}
```
