
import React, { useState } from 'react';
import { PolicyViewer } from '@/components/PolicyViewer';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { DocumentUpload } from '@/components/DocumentUpload';
import { DocumentAssessment, Suggestion } from '@/types/insurance';
import { useDocumentAnalysis } from '@/hooks/useDocumentAnalysis';
import { AlertCircle } from 'lucide-react';

const Index = () => {
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);
  const { uploadAndAnalyze, isAnalyzing, analysisData, analysisError, fileName, documentText, reset } = useDocumentAnalysis();

  const handleSuggestionClick = (id: string) => {
    setSelectedSuggestion(id);
  };

  const handleFileUpload = async (file: File) => {
    try {
      await uploadAndAnalyze(file);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  // Show upload interface if no analysis data
  if (!analysisData && !isAnalyzing) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-6">
          <DocumentUpload 
            onFileUpload={handleFileUpload}
            isAnalyzing={isAnalyzing}
            fileName={fileName}
          />
        </div>
      </div>
    );
  }

  // Show error state
  if (analysisError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <AlertCircle className="h-8 w-8 mx-auto mb-4 text-red-500" />
            <p className="text-gray-600">Failed to analyze document</p>
            <p className="text-sm text-gray-500 mt-2">Error: {analysisError.message}</p>
            <button 
              onClick={reset}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Try Another Document
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show analyzing state
  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-6">
          <DocumentUpload 
            onFileUpload={handleFileUpload}
            isAnalyzing={isAnalyzing}
            fileName={fileName}
          />
        </div>
      </div>
    );
  }

  // Show analysis results
  if (!analysisData.documentAssessments.length) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-gray-600">No analysis data available</p>
            <button 
              onClick={reset}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Upload Another Document
            </button>
          </div>
        </div>
      </div>
    );
  }

  const assessment = analysisData.documentAssessments[0];
  const documentAssessment: DocumentAssessment = {
    confidenceScore: assessment.confidenceScore,
    totalClauses: assessment.totalClauses,
    flaggedClauses: assessment.flaggedClauses,
    riskDistribution: {
      high: analysisData.suggestions.filter(s => s.severity === 'High').length,
      medium: analysisData.suggestions.filter(s => s.severity === 'Medium').length,
      low: analysisData.suggestions.filter(s => s.severity === 'Low').length
    }
  };

  // Helper function to ensure severity is properly typed
  const normalizeSeverity = (severity: string): 'High' | 'Medium' | 'Low' => {
    const normalized = severity.charAt(0).toUpperCase() + severity.slice(1).toLowerCase();
    if (normalized === 'High' || normalized === 'Medium' || normalized === 'Low') {
      return normalized as 'High' | 'Medium' | 'Low';
    }
    return 'Low'; // Default fallback
  };

  // Helper function to ensure clause type is properly typed
  const normalizeClauseType = (type: string): 'Liability' | 'Coverage' | 'Exclusion' | 'Deductible' | 'Premium' => {
    const normalized = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
    const validTypes = ['Liability', 'Coverage', 'Exclusion', 'Deductible', 'Premium'];
    if (validTypes.includes(normalized)) {
      return normalized as 'Liability' | 'Coverage' | 'Exclusion' | 'Deductible' | 'Premium';
    }
    return 'Coverage'; // Default fallback
  };

  // Helper function to ensure suggestion type is properly typed
  const normalizeSuggestionType = (type: string): 'Ambiguity' | 'Exploit Risk' | 'Missing Limitation' | 'Regulatory Conflict' | 'Coverage Gap' => {
    const validTypes = ['Ambiguity', 'Exploit Risk', 'Missing Limitation', 'Regulatory Conflict', 'Coverage Gap'];
    if (validTypes.includes(type)) {
      return type as 'Ambiguity' | 'Exploit Risk' | 'Missing Limitation' | 'Regulatory Conflict' | 'Coverage Gap';
    }
    return 'Ambiguity'; // Default fallback
  };

  // Map API suggestions to match the Suggestion interface with proper typing
  const suggestions: Suggestion[] = analysisData.suggestions.map(s => ({
    id: s.id,
    clauseId: s.clauseId,
    clauseType: normalizeClauseType(s.clauseType),
    text: s.text,
    original: s.text,
    suggestion: `Recommended improvement for ${s.clauseType.toLowerCase()} clause`,
    start: 0,
    end: s.text.length,
    approved: null,
    type: normalizeSuggestionType(s.type),
    riskScore: s.riskScore,
    exploitScenario: `This ${normalizeSeverity(s.severity).toLowerCase()} risk ${s.type.toLowerCase()} could lead to potential issues in claim processing.`,
    identifiedBy: 'AI Analysis Engine',
    severity: normalizeSeverity(s.severity)
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar 
          assessment={documentAssessment} 
          suggestions={suggestions}
          onSuggestionClick={handleSuggestionClick}
          selectedSuggestion={selectedSuggestion}
        />
        <main className="flex-1">
          <PolicyViewer 
            suggestions={suggestions}
            documentText={documentText}
          />
        </main>
      </div>
    </div>
  );
};

export default Index;
