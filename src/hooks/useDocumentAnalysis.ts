
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { analyzeDocument, extractTextFromFile, ApiResponse } from '@/services/api';

export const useDocumentAnalysis = () => {
  const [documentText, setDocumentText] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');

  const analysisQuery = useMutation({
    mutationFn: (text: string) => analyzeDocument(text),
  });

  const uploadAndAnalyze = async (file: File) => {
    try {
      setFileName(file.name);
      const text = await extractTextFromFile(file);
      setDocumentText(text);
      const result = await analysisQuery.mutateAsync(text);
      return result;
    } catch (error) {
      console.error('Error processing document:', error);
      throw error;
    }
  };

  return {
    uploadAndAnalyze,
    documentText,
    fileName,
    isAnalyzing: analysisQuery.isPending,
    analysisData: analysisQuery.data,
    analysisError: analysisQuery.error,
    reset: () => {
      setDocumentText('');
      setFileName('');
      analysisQuery.reset();
    }
  };
};
