
import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Download, Print, Search, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Suggestion } from '@/types/insurance';

interface PDFViewerProps {
  suggestions: Suggestion[];
  onSuggestionHover: (id: string | null) => void;
  onSuggestionClick: (id: string) => void;
  selectedSuggestion: string | null;
}

const policyText = `
COMMERCIAL PROPERTY INSURANCE POLICY

Policy Number: CP-2024-001234
Effective Date: January 1, 2024
Expiration Date: January 1, 2025

SECTION I - COVERAGES

A. Building Coverage
We will pay for direct physical loss of or damage to the Covered Property at the premises described in the Declarations caused by or resulting from any Covered Cause of Loss.

B. Personal Property Coverage  
We will pay for direct physical loss of or damage to Covered Property that is:
1. Personal property you own that is used in your business;
2. Personal property of others that is in your care, custody or control.

SECTION II - EXCLUSIONS

We will not pay for loss or damage caused by or resulting from:

A. Water Damage
Damage caused by water, except as specifically covered under this policy. This exclusion applies regardless of whether the water damage results from natural flooding, broken pipes, or any other source.

B. Notification Requirements
The policyholder must notify the company within a reasonable time of any claim or circumstance that may give rise to a claim under this policy.

C. Liability Limitations
The company's liability for any claim shall not exceed the policy limits. The company will make reasonable efforts to investigate and settle claims in good faith.

SECTION III - CONDITIONS

A. Your Duties After Loss
You must see that the following are done in the event of loss or damage to Covered Property:
1. Notify the police if a law may have been broken;
2. Give us prompt notice of the loss or damage;
3. Protect the Covered Property from further damage.

B. Legal Action Against Us
No one may bring a legal action against us under this Coverage Part unless:
1. There has been full compliance with all of the terms of this Coverage Part; and
2. The action is brought within 2 years and 1 day after the date on which the direct physical loss or damage occurred.
`;

export const PDFViewer = ({ suggestions, onSuggestionHover, onSuggestionClick, selectedSuggestion }: PDFViewerProps) => {
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));

  const highlightSuggestions = (text: string) => {
    let highlightedText = text;
    
    suggestions.forEach(suggestion => {
      const isSelected = selectedSuggestion === suggestion.id;
      const highlightClass = isSelected 
        ? 'bg-blue-200 border-b-2 border-blue-500 cursor-pointer' 
        : 'bg-yellow-100 hover:bg-yellow-200 cursor-pointer border-b border-yellow-400';
      
      const riskColorClass = suggestion.severity === 'High' 
        ? 'border-l-4 border-red-500' 
        : suggestion.severity === 'Medium' 
        ? 'border-l-4 border-amber-500' 
        : 'border-l-4 border-green-500';

      highlightedText = highlightedText.replace(
        suggestion.original,
        `<span 
          class="${highlightClass} ${riskColorClass} px-1 py-0.5 rounded-sm relative" 
          data-suggestion-id="${suggestion.id}"
          title="Risk Score: ${suggestion.riskScore}/10 - ${suggestion.type}"
        >
          ${suggestion.original}
          <span class="absolute -top-6 left-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap z-10">
            ${suggestion.clauseId} - Risk: ${suggestion.riskScore}/10
          </span>
        </span>`
      );
    });

    return highlightedText;
  };

  const handleTextClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const suggestionId = target.getAttribute('data-suggestion-id');
    if (suggestionId) {
      onSuggestionClick(suggestionId);
    }
  };

  const handleTextHover = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const suggestionId = target.getAttribute('data-suggestion-id');
    onSuggestionHover(suggestionId);
  };

  return (
    <div className="h-full flex flex-col bg-gray-100">
      {/* PDF Toolbar */}
      <div className="bg-gray-800 text-white px-4 py-2 flex items-center justify-between border-b">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={handleZoomOut} className="text-white hover:bg-gray-700">
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">{zoom}%</span>
            <Button variant="ghost" size="sm" onClick={handleZoomIn} className="text-white hover:bg-gray-700">
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
              <ChevronUp className="h-4 w-4" />
            </Button>
            <span className="text-sm">Page {currentPage} of 1</span>
            <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search document..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-48 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
          <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
            <Print className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* PDF Document */}
      <div className="flex-1 overflow-auto bg-gray-300 p-4">
        <div 
          className="max-w-4xl mx-auto bg-white shadow-lg"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
        >
          {/* PDF Header */}
          <div className="bg-gray-50 border-b px-6 py-3 text-xs text-gray-600">
            <div className="flex justify-between items-center">
              <span>Commercial Property Insurance Policy - CP-2024-001234</span>
              <span>Page 1 of 1</span>
            </div>
          </div>

          {/* PDF Content */}
          <div 
            className="p-8 leading-relaxed text-sm font-mono"
            onClick={handleTextClick}
            onMouseOver={handleTextHover}
            onMouseLeave={() => onSuggestionHover(null)}
            dangerouslySetInnerHTML={{ 
              __html: highlightSuggestions(policyText).replace(/\n/g, '<br>') 
            }}
          />

          {/* PDF Footer */}
          <div className="bg-gray-50 border-t px-6 py-3 text-xs text-gray-600 text-center">
            <span>This document contains {suggestions.length} flagged clauses requiring review</span>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-200 px-4 py-2 text-xs text-gray-600 border-t">
        <div className="flex justify-between items-center">
          <span>Document loaded • {suggestions.length} risks identified</span>
          <span>Zoom: {zoom}% • Page 1 of 1</span>
        </div>
      </div>
    </div>
  );
};
