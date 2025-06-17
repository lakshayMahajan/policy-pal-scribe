
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

import type { ElementType } from 'react';

export interface Agent {
  id: string;
  name: string;
  icon: ElementType;
  status: 'completed' | 'processing' | 'pending';
  progress: number;
  findings: number;
  description: string;
  lastRun: string;
  processingTime: string;
}

export interface Assessment {
  id: string;
  policyName: string;
  uploadDate: string;
  status: 'completed' | 'processing' | 'failed';
  riskScore: number;
  flaggedClauses: number;
  totalClauses: number;
  version: string;
}
