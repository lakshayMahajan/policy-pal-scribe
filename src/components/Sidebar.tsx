
import React from 'react';
import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const Sidebar = () => {
  const suggestions = [
    { id: 1, type: 'clarity', text: 'Ambiguous water damage clause', status: 'pending' },
    { id: 2, type: 'legal', text: 'Missing liability limitation', status: 'pending' },
    { id: 3, type: 'style', text: 'Inconsistent terminology', status: 'accepted' },
    { id: 4, type: 'compliance', text: 'Regulatory requirement', status: 'rejected' },
  ];

  const getIcon = (status: string) => {
    switch (status) {
      case 'accepted': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-amber-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'legal': return 'bg-red-100 text-red-700';
      case 'compliance': return 'bg-blue-100 text-blue-700';
      case 'clarity': return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <aside className="w-80 bg-white border-r border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Suggestions</h2>
        <div className="flex space-x-2">
          <Badge variant="secondary">4 Total</Badge>
          <Badge className="bg-amber-100 text-amber-700">2 Pending</Badge>
        </div>
      </div>
      
      <div className="space-y-3">
        {suggestions.map((suggestion) => (
          <div 
            key={suggestion.id}
            className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <Badge className={getTypeColor(suggestion.type)} variant="secondary">
                {suggestion.type}
              </Badge>
              {getIcon(suggestion.status)}
            </div>
            <p className="text-sm text-gray-700">{suggestion.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
        <div className="flex items-center space-x-2 mb-2">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          <span className="font-medium text-amber-800">Pro Tip</span>
        </div>
        <p className="text-sm text-amber-700">
          Use Ctrl + Tab to cycle through suggestions quickly!
        </p>
      </div>
    </aside>
  );
};
