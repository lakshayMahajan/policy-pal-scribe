
export interface Suggestion {
  id: string;
  clauseId: string;
  clauseType: 'Liability' | 'Coverage' | 'Exclusion' | 'Deductible' | 'Premium';
  text: string;
  original: string;
  suggestion: string;
  start: number;
  end: number;
  approved: boolean | null;
  type: 'Ambiguity' | 'Exploit Risk' | 'Missing Limitation' | 'Regulatory Conflict' | 'Coverage Gap';
  riskScore: number; // 1-10 scale
  exploitScenario: string;
  identifiedBy: string; // Which AI agent flagged this
  severity: 'High' | 'Medium' | 'Low';
}

export interface DocumentAssessment {
  confidenceScore: number;
  totalClauses: number;
  flaggedClauses: number;
  riskDistribution: {
    high: number;
    medium: number;
    low: number;
  };
}
