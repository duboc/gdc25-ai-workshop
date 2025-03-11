// Types for the marketing JSON data structure

export interface Tactic {
  tactic_name: string;
  description: string;
  platforms: string[];
  estimated_cost: string;
}

export interface MeasurementMetric {
  [index: number]: string;
}

export interface Strategy {
  strategy_name: string;
  description: string;
  tactics: Tactic[];
  measurement_metrics: string[];
}

export interface MarketingData {
  campaign_name: string;
  target_audience: string;
  campaign_duration: string;
  campaign_budget: string;
  overall_message: string;
  campaign_strategies: Strategy[];
}
