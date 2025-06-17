
import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, Download, Printer, Search, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Suggestion } from '@/types/insurance';

interface PDFViewerProps {
  suggestions: Suggestion[];
  documentText: string;
  onSuggestionHover: (id: string | null) => void;
  onSuggestionClick: (id: string) => void;
  selectedSuggestion: string | null;
}

export const PDFViewer = ({ suggestions, documentText, onSuggestionHover, onSuggestionClick, selectedSuggestion }: PDFViewerProps) => {
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));

  // Scroll to selected suggestion
  useEffect(() => {
    if (selectedSuggestion && contentRef.current && containerRef.current) {
      const highlightElement = contentRef.current.querySelector(`[data-suggestion-id="${selectedSuggestion}"]`);
      if (highlightElement) {
        const elementRect = highlightElement.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const scrollTop = containerRef.current.scrollTop;
        
        // Calculate the position to scroll to (center the element in view)
        const targetScrollTop = scrollTop + elementRect.top - containerRect.top - (containerRect.height / 2);
        
        containerRef.current.scrollTo({
          top: Math.max(0, targetScrollTop),
          behavior: 'smooth'
        });
      }
    }
  }, [selectedSuggestion]);

  const highlightSuggestions = (text: string) => {
    console.log('Document text length:', text.length);
    console.log('Document text preview:', text.substring(0, 200));
    
    // First, convert newlines to HTML structure
    let htmlText = text
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/\n/g, '<br>')
      .replace(/^/, '<p class="mb-4">')
      .replace(/$/, '</p>');
    
    console.log('Processing suggestions:', suggestions.map(s => ({
      id: s.id,
      text: s.text,
      severity: s.severity
    })));
    
    // Sort suggestions by text length (longest first) to avoid nested replacements
    const sortedSuggestions = [...suggestions].sort((a, b) => (b.text || '').length - (a.text || '').length);
    
    sortedSuggestions.forEach(suggestion => {
      const isSelected = selectedSuggestion === suggestion.id;
      const searchText = suggestion.text || '';
      
      if (!searchText.trim()) {
        console.log(`Skipping suggestion ${suggestion.id} - no text to highlight`);
        return;
      }
      
      // Enhanced highlighting with better visibility
      const baseClasses = 'relative inline-block px-2 py-1 rounded-md cursor-pointer transition-all duration-200 border-2 font-semibold';
      const severityClasses = {
        'High': 'border-red-600 bg-red-200 hover:bg-red-300 text-red-900',
        'Medium': 'border-amber-600 bg-amber-200 hover:bg-amber-300 text-amber-900',
        'Low': 'border-green-600 bg-green-200 hover:bg-green-300 text-green-900'
      };
      
      const selectedClasses = isSelected 
        ? 'ring-4 ring-blue-400 bg-blue-300 shadow-xl scale-110 z-10' 
        : '';
      
      const combinedClasses = `${baseClasses} ${severityClasses[suggestion.severity]} ${selectedClasses}`;

      // Create a flexible regex for case-insensitive matching
      const escapedText = searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(${escapedText})`, 'gi');
      
      console.log(`Searching for "${searchText}" with regex:`, regex);
      
      // Check if the text exists before replacement
      const matches = htmlText.match(regex);
      console.log(`Matches found for "${searchText}":`, matches);
      
      if (matches && matches.length > 0) {
        htmlText = htmlText.replace(
          regex,
          `<span 
            class="${combinedClasses}" 
            data-suggestion-id="${suggestion.id}"
            title="Click to view details - Risk Score: ${suggestion.riskScore}/10"
          >
            $1
            <span class="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap z-30 pointer-events-none shadow-lg">
              ${suggestion.clauseId} | Risk: ${suggestion.riskScore}/10 | ${suggestion.severity}
            </span>
          </span>`
        );
        console.log(`✅ Successfully highlighted "${searchText}"`);
      } else {
        console.log(`❌ No matches found for "${searchText}"`);
      }
    });

    return htmlText;
  };

  const handleTextClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const suggestionId = target.getAttribute('data-suggestion-id') || 
                        target.closest('[data-suggestion-id]')?.getAttribute('data-suggestion-id');
    if (suggestionId) {
      e.preventDefault();
      console.log('Clicked suggestion:', suggestionId);
      onSuggestionClick(suggestionId);
    }
  };

  const handleTextHover = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const suggestionId = target.getAttribute('data-suggestion-id') || 
                        target.closest('[data-suggestion-id]')?.getAttribute('data-suggestion-id');
    onSuggestionHover(suggestionId);
  };

  const handleTextLeave = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const suggestionId = target.getAttribute('data-suggestion-id') || 
                        target.closest('[data-suggestion-id]')?.getAttribute('data-suggestion-id');
    if (suggestionId) {
      onSuggestionHover(null);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-100">
      {/* Document Toolbar */}
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
            <Printer className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Document Content */}
      <div ref={containerRef} className="flex-1 overflow-auto bg-gray-300 p-4">
        <div 
          className="max-w-4xl mx-auto bg-white shadow-lg transition-transform duration-200"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
        >
          {/* Document Header */}
          <div className="bg-gray-50 border-b px-6 py-3 text-xs text-gray-600">
            <div className="flex justify-between items-center">
              <span>Uploaded Document Analysis</span>
              <span>Page 1 of 1</span>
            </div>
          </div>

          {/* Document Content */}
          <div 
            ref={contentRef}
            className="p-8 leading-relaxed text-sm selection:bg-blue-200"
            onClick={handleTextClick}
            onMouseOver={handleTextHover}
            onMouseLeave={handleTextLeave}
            dangerouslySetInnerHTML={{ 
              __html: highlightSuggestions(documentText || 'No document content available')
            }}
          />

          {/* Document Footer */}
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
