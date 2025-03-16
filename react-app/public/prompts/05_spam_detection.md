# Detecção de Reviews Inconsistentes ou Spam

Analise os reviews fornecidos e faça uma investigação detalhada para identificar possíveis manipulações, spam e inconsistências, considerando os seguintes aspectos:

O header do csv:
reviewId,content,score,thumbsUpCount,reviewCreatedVersion,at,replyContent,repliedAt,appVersion


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

Apresente o resultado com uma mescla de tabelas e informações resumidas e actionables.