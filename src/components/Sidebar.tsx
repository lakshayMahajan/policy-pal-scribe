
import React from 'react';
import { Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DocumentAssessment } from '@/types/insurance';
import { SidebarSuggestionList } from '@/components/SidebarSuggestionList';

interface SidebarProps {
  assessment: DocumentAssessment;
  suggestions: any[];
  onSuggestionClick?: (id: string) => void;
  selectedSuggestion?: string | null;
}

export const Sidebar = ({ assessment, suggestions, onSuggestionClick, selectedSuggestion }: SidebarProps) => {
  return (
    <aside className="w-80 bg-white border-r border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Risk Assessment</h2>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Document Confidence</span>
            <span className="text-lg font-bold text-gray-900">{assessment.confidenceScore}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${assessment.confidenceScore >= 80 ? 'bg-green-500' : assessment.confidenceScore >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
              style={{ width: `${assessment.confidenceScore}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {assessment.flaggedClauses} of {assessment.totalClauses} clauses flagged
          </p>
        </div>

        <div className="flex space-x-2 mb-4">
          <Badge variant="secondary">{suggestions.length} Total</Badge>
          <Badge className="bg-red-100 text-red-700">{assessment.riskDistribution.high} High Risk</Badge>
        </div>
      </div>
      
      <SidebarSuggestionList 
        suggestions={suggestions}
        onSuggestionClick={onSuggestionClick || (() => {})}
        selectedSuggestion={selectedSuggestion || null}
      />

      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center space-x-2 mb-2">
          <Shield className="h-5 w-5 text-blue-600" />
          <span className="font-medium text-blue-800">Keyboard Shortcuts</span>
        </div>
        <p className="text-sm text-blue-700">
          Use ⌘+Tab to cycle through flagged clauses
        </p>
      </div>
    </aside>
  );
};
