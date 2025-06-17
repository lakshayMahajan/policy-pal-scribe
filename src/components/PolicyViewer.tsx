
import React, { useState } from 'react';
import { SuggestionCard } from '@/components/SuggestionCard';
import { PDFViewer } from '@/components/PDFViewer';
import { Suggestion } from '@/types/insurance';
import { mockSuggestions } from '@/dummy-data/suggestions';


export const PolicyViewer = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>(mockSuggestions);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);
  const [hoveredSuggestion, setHoveredSuggestion] = useState<string | null>(null);

  const handleAcceptSuggestion = (id: string) => {
    setSuggestions(prev => prev.map(s => 
      s.id === id ? { ...s, approved: true } : s
    ));
    setSelectedSuggestion(null);
  };

  const handleRejectSuggestion = (id: string) => {
    setSuggestions(prev => prev.map(s => 
      s.id === id ? { ...s, approved: false } : s
    ));
    setSelectedSuggestion(null);
  };

  return (
    <div className="relative h-screen">
      <PDFViewer 
        suggestions={suggestions}
        onSuggestionHover={setHoveredSuggestion}
        onSuggestionClick={setSelectedSuggestion}
        selectedSuggestion={selectedSuggestion}
      />
      
      {selectedSuggestion && (
        <SuggestionCard
          suggestion={suggestions.find(s => s.id === selectedSuggestion)!}
          onAccept={() => handleAcceptSuggestion(selectedSuggestion)}
          onReject={() => handleRejectSuggestion(selectedSuggestion)}
          onClose={() => setSelectedSuggestion(null)}
        />
      )}
    </div>
  );
};
