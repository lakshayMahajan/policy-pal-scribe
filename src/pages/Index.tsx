
import React, { useState } from 'react';
import { PolicyViewer } from '@/components/PolicyViewer';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { DocumentAssessment } from '@/types/insurance';

const Index = () => {
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);
  
  const mockAssessment: DocumentAssessment = {
    confidenceScore: 74,
    totalClauses: 12,
    flaggedClauses: 3,
    riskDistribution: {
      high: 2,
      medium: 1,
      low: 0
    }
  };

  const mockSuggestions = [
    {
      id: 's1',
      clauseId: 'LC-401',
      clauseType: 'Liability',
      text: 'Water damage clause creates significant exploit opportunity',
      type: 'Exploit Risk',
      riskScore: 8,
      identifiedBy: 'Risk Scorer + Claim Generator',
      severity: 'High'
    },
    {
      id: 's2',
      clauseId: 'COV-205',
      clauseType: 'Coverage',
      text: 'Liability limitation missing critical constraints',
      type: 'Missing Limitation',
      riskScore: 7,
      identifiedBy: 'Legal Compliance Engine',
      severity: 'High'
    },
    {
      id: 's3',
      clauseId: 'NOT-101',
      clauseType: 'Coverage',
      text: 'Notification period violates state regulatory requirements',
      type: 'Regulatory Conflict',
      riskScore: 6,
      identifiedBy: 'Regulatory Compliance Scanner',
      severity: 'Medium'
    }
  ];

  const handleSuggestionClick = (id: string) => {
    setSelectedSuggestion(id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar 
          assessment={mockAssessment} 
          suggestions={mockSuggestions}
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
