
import React from 'react';
import { Suggestion } from '@/types/insurance';
import { homeownerPolicyText } from '@/dummy-data/policyText';

interface PolicyTextProps {
  suggestions: Suggestion[];
  onSuggestionHover: (id: string | null) => void;
  onSuggestionClick: (id: string) => void;
  selectedSuggestion: string | null;
}


export const PolicyText = ({ suggestions, onSuggestionHover, onSuggestionClick, selectedSuggestion }: PolicyTextProps) => {
  const text = homeownerPolicyText;

  const renderTextWithHighlights = () => {
    let lastIndex = 0;
    const elements: React.ReactNode[] = [];
    
    // Sort suggestions by start position
    const sortedSuggestions = [...suggestions].sort((a, b) => a.start - b.start);
    
    sortedSuggestions.forEach((suggestion, index) => {
      // Add text before the suggestion
      if (suggestion.start > lastIndex) {
        elements.push(
          <span key={`text-${index}`}>
            {text.slice(lastIndex, suggestion.start)}
          </span>
        );
      }
      
      // Add the highlighted suggestion
      const isSelected = selectedSuggestion === suggestion.id;
      const isApproved = suggestion.approved === true;
      const isRejected = suggestion.approved === false;
      
      let highlightClass = 'relative cursor-pointer transition-all duration-200 border-b-2';
      
      if (isApproved) {
        highlightClass += ' bg-green-100 border-green-400 text-green-800';
      } else if (isRejected) {
        highlightClass += ' bg-gray-100 border-gray-300 opacity-50 line-through text-gray-500';
      } else if (isSelected) {
        highlightClass += ' bg-red-200 border-red-500 shadow-sm';
      } else {
        // Color by severity
        if (suggestion.severity === 'High') {
          highlightClass += ' bg-red-100 border-red-400 hover:bg-red-150';
        } else if (suggestion.severity === 'Medium') {
          highlightClass += ' bg-amber-100 border-amber-400 hover:bg-amber-150';
        } else {
          highlightClass += ' bg-yellow-100 border-yellow-400 hover:bg-yellow-150';
        }
      }
      
      elements.push(
        <span
          key={suggestion.id}
          className={highlightClass}
          onMouseEnter={() => !isRejected && onSuggestionHover(suggestion.id)}
          onMouseLeave={() => onSuggestionHover(null)}
          onClick={() => !isRejected && onSuggestionClick(suggestion.id)}
          title={`${suggestion.type} - Risk Score: ${suggestion.riskScore}/10`}
          data-clause-id={suggestion.clauseId}
        >
          {isApproved ? suggestion.suggestion : suggestion.original}
          {!isRejected && (
            <span className="absolute -top-6 left-0 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
              {suggestion.clauseId} • {suggestion.type} • Risk: {suggestion.riskScore}/10
            </span>
          )}
        </span>
      );
      
      lastIndex = suggestion.end;
    });
    
    // Add remaining text
    if (lastIndex < text.length) {
      elements.push(
        <span key="text-end">
          {text.slice(lastIndex)}
        </span>
      );
    }
    
    return elements;
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="prose prose-gray max-w-none">
          <div className="text-base leading-relaxed whitespace-pre-line font-mono relative">
            {renderTextWithHighlights()}
          </div>
        </div>
      </div>
    </div>
  );
};
