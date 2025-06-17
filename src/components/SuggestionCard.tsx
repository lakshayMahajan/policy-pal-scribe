
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Edit3, X } from 'lucide-react';

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

interface SuggestionCardProps {
  suggestion: Suggestion;
  onAccept: () => void;
  onReject: () => void;
  onClose: () => void;
}

export const SuggestionCard = ({ suggestion, onAccept, onReject, onClose }: SuggestionCardProps) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'legal': return 'bg-red-100 text-red-700';
      case 'compliance': return 'bg-blue-100 text-blue-700';
      case 'clarity': return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl mx-4 shadow-xl">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Badge className={getTypeColor(suggestion.type)} variant="secondary">
                  {suggestion.type}
                </Badge>
                <CardTitle className="text-lg">Suggested Edit</CardTitle>
              </div>
              <p className="text-sm text-gray-600">{suggestion.text}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="p-3 bg-red-50 rounded-lg border border-red-200">
              <p className="text-sm font-medium text-red-800 mb-1">Original:</p>
              <p className="text-sm text-red-700 line-through">{suggestion.original}</p>
            </div>
            
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm font-medium text-green-800 mb-1">Suggested:</p>
              <p className="text-sm text-green-700">{suggestion.suggestion}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t">
            <Button variant="outline" size="sm">
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Suggestion
            </Button>
            
            <div className="flex space-x-2">
              <Button variant="outline" onClick={onReject} className="text-red-600 hover:text-red-700">
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </Button>
              <Button onClick={onAccept} className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                Accept
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
