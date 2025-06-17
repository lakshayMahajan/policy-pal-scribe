
import React, { useState } from 'react';
import { PolicyViewer } from '@/components/PolicyViewer';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { DocumentAssessment } from '@/types/insurance';
import { useInsuranceAnalysis } from '@/hooks/useInsuranceAnalysis';
import { Loader2, AlertCircle } from 'lucide-react';

const Index = () => {
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);
  const { data, isLoading, error } = useInsuranceAnalysis();

  const handleSuggestionClick = (id: string) => {
    setSelectedSuggestion(id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-500" />
            <p className="text-gray-600">Loading insurance analysis...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <AlertCircle className="h-8 w-8 mx-auto mb-4 text-red-500" />
            <p className="text-gray-600">Failed to load analysis</p>
            <p className="text-sm text-gray-500 mt-2">Error: {error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data || !data.documentAssessments.length) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-gray-600">No analysis data available</p>
          </div>
        </div>
      </div>
    );
  }

  const assessment = data.documentAssessments[0];
  const documentAssessment: DocumentAssessment = {
    confidenceScore: assessment.confidenceScore,
    totalClauses: assessment.totalClauses,
    flaggedClauses: assessment.flaggedClauses,
    riskDistribution: {
      high: data.suggestions.filter(s => s.severity === 'High').length,
      medium: data.suggestions.filter(s => s.severity === 'Medium').length,
      low: data.suggestions.filter(s => s.severity === 'Low').length
    }
  };

  const suggestions = data.suggestions.map(s => ({
    id: s.id,
    clauseId: s.clauseId,
    clauseType: s.clauseType,
    text: s.text,
    type: s.type,
    riskScore: s.riskScore,
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
          <PolicyViewer />
        </main>
      </div>
    </div>
  );
};

export default Index;
