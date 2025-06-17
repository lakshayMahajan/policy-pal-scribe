
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

const LOCAL_URL = 'http://127.0.0.1:5080';

export const analyzeDocument = async (documentText: string): Promise<ApiResponse> => {
  const response = await fetch(`${LOCAL_URL}/api/v2/insurance/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ document_text: documentText }), // <-- Use "text" as the key
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to analyze document: ${response.status} - ${errorText}`);
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
    
    if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
      reader.readAsText(file);
    } else if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      reject(new Error('PDF files are not yet supported. Please upload a text file (.txt) for now.'));
    } else if (file.type.includes('word') || file.name.endsWith('.doc') || file.name.endsWith('.docx')) {
      reject(new Error('Word documents are not yet supported. Please upload a text file (.txt) for now.'));
    } else {
      reject(new Error(`Unsupported file type: ${file.type || 'unknown'}. Please upload a text file (.txt).`));
    }
  });
};
