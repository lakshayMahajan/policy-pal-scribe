
import React, { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, Loader2 } from 'lucide-react';

interface DocumentUploadProps {
  onFileUpload: (file: File) => void;
  isAnalyzing: boolean;
  fileName?: string;
}

export const DocumentUpload = ({ onFileUpload, isAnalyzing, fileName }: DocumentUploadProps) => {
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  }, [onFileUpload]);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  }, [onFileUpload]);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-6 w-6" />
          <span>Upload Insurance Policy Document</span>
        </CardTitle>
        <CardDescription>
          Upload your insurance policy document to analyze for potential risks and issues
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {isAnalyzing ? (
            <div className="space-y-4">
              <Loader2 className="h-12 w-12 animate-spin mx-auto text-blue-500" />
              <div>
                <p className="text-lg font-medium">Analyzing Document</p>
                <p className="text-sm text-gray-600">Processing: {fileName}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="h-12 w-12 mx-auto text-gray-400" />
              <div>
                <p className="text-lg font-medium">Drop your document here</p>
                <p className="text-sm text-gray-600">or click to browse files</p>
              </div>
              <input
                type="file"
                accept=".txt,.pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <Button asChild>
                <label htmlFor="file-upload" className="cursor-pointer">
                  Choose File
                </label>
              </Button>
              {fileName && (
                <p className="text-sm text-green-600">
                  Ready to analyze: {fileName}
                </p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
