export interface NumericalValue {
  timeInSeconds?: number | null;
  maxDurationInSeconds?: number | null;
  permissionsRequestedWithoutExplanationCount?: number | null;
  isSkippable?: boolean | null;
  isLanguageConsistent?: boolean | null;
  isLoginMandatory?: boolean | null;
  loginOptionsCount?: number | null;
  isAutomaticGoogleLogin?: boolean | null;
  interstitialCount?: number | null;
  purchaseModalCount?: number | null;
  isOptionsAccessible?: boolean | null;
  isStartGameClear?: boolean | null;
  isProfileVisible?: boolean | null;
  isProfileCustomizable?: boolean | null;
  instancesWithoutFeedbackCount?: number | null;
}

export interface FtueAnalysisCriterion {
  criterion: string;
  meetsBestPractices: 'Yes' | 'No' | 'Partial' | 'Not Applicable';
  observations: string;
  suggestedImprovements: string;
  numericalValue: NumericalValue;
}

export interface VideoData {
  ftueAnalysis: FtueAnalysisCriterion[];
}
