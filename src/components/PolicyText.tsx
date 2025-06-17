
import React from 'react';

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

interface PolicyTextProps {
  suggestions: Suggestion[];
  onSuggestionHover: (id: string | null) => void;
  onSuggestionClick: (id: string) => void;
  selectedSuggestion: string | null;
}

const mockPolicyText = `
HOMEOWNER'S INSURANCE POLICY

SECTION 1: PROPERTY COVERAGE

This policy provides coverage for your dwelling and personal property against covered perils as defined herein.

DWELLING COVERAGE
We will pay for direct physical loss to the dwelling on the residence premises shown in the Declarations caused by a covered peril. Damage caused by water, whether from natural causes or mechanical failure, is subject to the terms and conditions outlined in this section.

LIABILITY COVERAGE  
We will cover sums that the insured becomes legally obligated to pay as damages because of bodily injury or property damage covered by this policy. The company will use reasonable efforts to defend any suit seeking damages covered by this policy.

CLAIMS PROCESS
The policyholder must notify the company within a reasonable time of any claim or occurrence that may result in a claim under this policy. Failure to provide timely notice may result in denial of coverage.

GENERAL CONDITIONS
This policy is subject to all terms, conditions, and exclusions set forth herein. Any modifications must be made in writing and signed by an authorized representative of the company.
`;

export const PolicyText = ({ suggestions, onSuggestionHover, onSuggestionClick, selectedSuggestion }: PolicyTextProps) => {
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
            {mockPolicyText.slice(lastIndex, suggestion.start)}
          </span>
        );
      }
      
      // Add the highlighted suggestion
      const isSelected = selectedSuggestion === suggestion.id;
      const isApproved = suggestion.approved === true;
      const isRejected = suggestion.approved === false;
      
      let highlightClass = 'bg-amber-200 hover:bg-amber-300 cursor-pointer transition-colors border-b-2 border-amber-400';
      
      if (isApproved) {
        highlightClass = 'bg-green-200 border-b-2 border-green-400';
      } else if (isRejected) {
        highlightClass = 'bg-gray-200 opacity-50 line-through';
      } else if (isSelected) {
        highlightClass = 'bg-amber-300 border-b-2 border-amber-500';
      }
      
      elements.push(
        <span
          key={suggestion.id}
          className={highlightClass}
          onMouseEnter={() => !isRejected && onSuggestionHover(suggestion.id)}
          onMouseLeave={() => onSuggestionHover(null)}
          onClick={() => !isRejected && onSuggestionClick(suggestion.id)}
          title={suggestion.text}
        >
          {isApproved ? suggestion.suggestion : suggestion.original}
        </span>
      );
      
      lastIndex = suggestion.end;
    });
    
    // Add remaining text
    if (lastIndex < mockPolicyText.length) {
      elements.push(
        <span key="text-end">
          {mockPolicyText.slice(lastIndex)}
        </span>
      );
    }
    
    return elements;
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="prose prose-gray max-w-none">
          <div className="text-base leading-relaxed whitespace-pre-line font-mono">
            {renderTextWithHighlights()}
          </div>
        </div>
      </div>
    </div>
  );
};
