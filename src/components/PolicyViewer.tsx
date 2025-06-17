
import React, { useState } from 'react';
import { SuggestionCard } from '@/components/SuggestionCard';
import { PolicyText } from '@/components/PolicyText';

interface Suggestion {
  id: string;
  text: string;
  original: string;
  suggestion: string;
  start: number;
  end: number;
  approved: boolean | null;
  type: 'clarity' | 'legal' | 'style' | 'compliance';
}

const mockSuggestions: Suggestion[] = [
  {
    id: 's1',
    text: 'This water damage clause is ambiguous and could lead to disputes',
    original: 'Damage caused by water',
    suggestion: 'Damage caused by natural flooding, burst pipes, or accidental water discharge',
    start: 234,
    end: 256,
    approved: null,
    type: 'clarity'
  },
  {
    id: 's2',
    text: 'Legal terminology should be more precise',
    original: 'reasonable efforts',
    suggestion: 'commercially reasonable efforts as defined in Section 12.3',
    start: 445,
    end: 462,
    approved: null,
    type: 'legal'
  },
  {
    id: 's3',
    text: 'This clause needs better structure for clarity',
    original: 'The policyholder must notify the company within a reasonable time of any claim',
    suggestion: 'The policyholder must provide written notification to the company within thirty (30) days of discovering any claim',
    start: 678,
    end: 756,
    approved: null,
    type: 'compliance'
  }
];

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
    <div className="relative">
      <PolicyText 
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
