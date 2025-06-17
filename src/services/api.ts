
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

const LOCAL_URL = 'http://localhost:3000';

export const analyzeDocument = async (documentText: string): Promise<ApiResponse> => {
  const response = await fetch(`${LOCAL_URL}/api/v2/insurance/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: documentText }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to analyze document');
  }
  
  return response.json();
};

export const extractTextFromFile = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const text = event.target?.result as string;
      resolve(text);
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    if (file.type === 'text/plain') {
      reader.readAsText(file);
    } else {
      // For now, we'll handle text files. You can extend this for PDF, etc.
      reject(new Error('Unsupported file type. Please upload a text file.'));
    }
  });
};
