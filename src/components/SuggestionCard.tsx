
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertTriangle, X, Shield } from 'lucide-react';
import { Suggestion } from '@/types/insurance';

interface SuggestionCardProps {
  suggestion: Suggestion;
  onAccept: () => void;
  onReject: () => void;
  onClose: () => void;
}

export const SuggestionCard = ({ suggestion, onAccept, onReject, onClose }: SuggestionCardProps) => {
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
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-amber-600';
      default: return 'text-green-600';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
      <Card className="w-full max-w-3xl mx-4 shadow-xl">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Badge className={getTypeColor(suggestion.type)} variant="secondary">
                  {suggestion.type}
                </Badge>
                <span className="text-sm text-gray-500">Clause #{suggestion.clauseId} • {suggestion.clauseType}</span>
                <span className={`text-sm font-medium ${getSeverityColor(suggestion.severity)}`}>
                  {suggestion.severity} Risk ({suggestion.riskScore}/10)
                </span>
              </div>
              <CardTitle className="text-lg">Risk Mitigation Required</CardTitle>
              <p className="text-sm text-gray-600">{suggestion.text}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <span className="text-sm font-medium text-red-800">Exploit Scenario</span>
            </div>
            <p className="text-sm text-red-700">{suggestion.exploitScenario}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm font-medium text-gray-800 mb-1">Current Clause:</p>
              <p className="text-sm text-gray-700">{suggestion.original}</p>
            </div>
            
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm font-medium text-green-800 mb-1">Recommended Fix:</p>
              <p className="text-sm text-green-700">{suggestion.suggestion}</p>
            </div>
          </div>

          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2 mb-1">
              <Shield className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Identified by: {suggestion.identifiedBy}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t">
            <Button variant="outline" size="sm">
              Request Manual Review
            </Button>
            
            <div className="flex space-x-2">
              <Button variant="outline" onClick={onReject} className="text-red-600 hover:text-red-700">
                <XCircle className="h-4 w-4 mr-2" />
                Reject Fix
              </Button>
              <Button onClick={onAccept} className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                Apply Fix
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
