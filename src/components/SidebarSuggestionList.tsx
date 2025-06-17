
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Ban, Scale, Shield, Zap } from 'lucide-react';

interface SidebarSuggestionListProps {
  suggestions: any[];
  onSuggestionClick: (id: string) => void;
  selectedSuggestion: string | null;
}

export const SidebarSuggestionList = ({ suggestions, onSuggestionClick, selectedSuggestion }: SidebarSuggestionListProps) => {
  const getRiskIcon = (type: string) => {
    switch (type) {
      case 'Exploit Risk': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'Missing Limitation': return <Ban className="h-4 w-4 text-orange-500" />;
      case 'Regulatory Conflict': return <Scale className="h-4 w-4 text-purple-500" />;
      case 'Coverage Gap': return <Shield className="h-4 w-4 text-blue-500" />;
      default: return <Zap className="h-4 w-4 text-amber-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Exploit Risk': return 'bg-red-100 text-red-700 border-red-200';
      case 'Missing Limitation': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Regulatory Conflict': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Coverage Gap': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-amber-100 text-amber-700 border-amber-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-amber-500';
      default: return 'bg-green-500';
    }
  };

  return (
    <div className="space-y-3 mb-8">
      {suggestions.map((suggestion) => (
        <div 
          key={suggestion.id}
          className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
            selectedSuggestion === suggestion.id 
              ? 'border-blue-400 bg-blue-50 shadow-md' 
              : 'border-gray-200 hover:bg-gray-50'
          }`}
          onClick={() => onSuggestionClick(suggestion.id)}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Badge className={`${getTypeColor(suggestion.type)} text-xs`} variant="secondary">
                {suggestion.type}
              </Badge>
              <span className="text-xs text-gray-500">#{suggestion.clauseId}</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${getSeverityColor(suggestion.severity)}`} />
              {getRiskIcon(suggestion.type)}
            </div>
          </div>
          <p className="text-sm text-gray-700 mb-2">{suggestion.text}</p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Risk Score: {suggestion.riskScore}/10</span>
            <span>{suggestion.identifiedBy}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
