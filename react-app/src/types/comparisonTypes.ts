// Types for the version comparison JSON data structure

export interface VersionData {
  versao_aplicativo: string;
  resumo_sentimento: string;
  sentimento: 'positivo' | 'neutro' | 'negativo';
  score_sentimento_positivo: number;
}

export interface SentimentHighlight {
  versao_aplicativo: string;
  resumo_sentimento: string;
}

export interface ComparisonData {
  historico_versoes: VersionData[];
  melhor_sentimento: SentimentHighlight;
  pior_sentimento: SentimentHighlight;
}
