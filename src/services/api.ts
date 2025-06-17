
export interface ApiAssessment {
  id: string;
  policyName: string;
  uploadDate: string;
  status: string;
  flaggedClauses: number;
  totalClauses: number;
  version: string;
}

export interface ApiDocumentAssessment {
  confidenceScore: number;
  totalClauses: number;
  flaggedClauses: number;
  id: string;
}

export interface ApiSuggestion {
  id: string;
  clauseId: string;
  clauseType: string;
  text: string;
  type: string;
  riskScore: number;
  severity: string;
}

export interface ApiResponse {
  assessments: ApiAssessment[];
  documentAssessments: ApiDocumentAssessment[];
  suggestions: ApiSuggestion[];
}

const LOCAL_URL = 'http://localhost:3000'; // Adjust this to your actual local URL

export const fetchInsuranceAnalysis = async (): Promise<ApiResponse> => {
  const response = await fetch(`${LOCAL_URL}/api/v2/insurance/analyze`);
  if (!response.ok) {
    throw new Error('Failed to fetch insurance analysis');
  }
  return response.json();
};
