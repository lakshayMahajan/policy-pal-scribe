
import React, { useState } from 'react';
import { SuggestionCard } from '@/components/SuggestionCard';
import { PDFViewer } from '@/components/PDFViewer';
import { Suggestion } from '@/types/insurance';

interface PolicyViewerProps {
  suggestions: Suggestion[];
  documentText: string;
}

export const PolicyViewer = ({ suggestions, documentText }: PolicyViewerProps) => {
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);
  const [hoveredSuggestion, setHoveredSuggestion] = useState<string | null>(null);
  const [currentSuggestions, setCurrentSuggestions] = useState<Suggestion[]>(suggestions);

  const handleAcceptSuggestion = (id: string) => {
    setCurrentSuggestions(prev => prev.map(s => 
      s.id === id ? { ...s, approved: true } : s
    ));
    setSelectedSuggestion(null);
  };

  const handleRejectSuggestion = (id: string) => {
    setCurrentSuggestions(prev => prev.map(s => 
      s.id === id ? { ...s, approved: false } : s
    ));
    setSelectedSuggestion(null);
  };

  return (
    <div className="relative h-screen">
      <PDFViewer 
        suggestions={currentSuggestions}
        documentText={documentText}
        onSuggestionHover={setHoveredSuggestion}
        onSuggestionClick={setSelectedSuggestion}
        selectedSuggestion={selectedSuggestion}
      />
      
      {selectedSuggestion && (
        <SuggestionCard
          suggestion={currentSuggestions.find(s => s.id === selectedSuggestion)!}
          onAccept={() => handleAcceptSuggestion(selectedSuggestion)}
          onReject={() => handleRejectSuggestion(selectedSuggestion)}
          onClose={() => setSelectedSuggestion(null)}
        />
      )}
    </div>
  );
};
