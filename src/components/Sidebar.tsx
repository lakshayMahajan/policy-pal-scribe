
import React from 'react';
import { Shield, AlertTriangle, Ban, Scale, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DocumentAssessment } from '@/types/insurance';

interface SidebarProps {
  assessment: DocumentAssessment;
  suggestions: any[];
}

export const Sidebar = ({ assessment, suggestions }: SidebarProps) => {
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
      
      <div className="space-y-3 mb-8">
        {suggestions.map((suggestion) => (
          <div 
            key={suggestion.id}
            className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
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
