
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

  // Map API suggestions to match the Suggestion interface
  const suggestions: Suggestion[] = analysisData.suggestions.map(s => ({
    id: s.id,
    clauseId: s.clauseId,
    clauseType: s.clauseType as any,
    text: s.text,
    original: s.text, // Use the suggestion text as the original text to highlight
    suggestion: `Recommended improvement for ${s.clauseType.toLowerCase()} clause`,
    start: 0, // Position will be calculated by the highlighting function
    end: s.text.length,
    approved: null,
    type: s.type as any,
    riskScore: s.riskScore,
    exploitScenario: `This ${s.severity.toLowerCase()} risk ${s.type.toLowerCase()} could lead to potential issues in claim processing.`,
    identifiedBy: 'AI Analysis Engine',
    severity: s.severity
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
