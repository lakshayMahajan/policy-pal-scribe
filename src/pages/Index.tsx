
import React, { useState } from 'react';
import { PolicyViewer } from '@/components/PolicyViewer';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { mockAssessment } from '@/dummy-data/assessments';
import { mockSuggestions } from '@/dummy-data/suggestions';

const Index = () => {
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);
  

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
