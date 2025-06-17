
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { analyzeDocument, extractTextFromFile, ApiResponse } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

export const useDocumentAnalysis = () => {
  const [documentText, setDocumentText] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const { toast } = useToast();

  const analysisQuery = useMutation({
    mutationFn: (text: string) => analyzeDocument(text),
    onSuccess: () => {
      toast({
        title: "Analysis Complete",
        description: "Document analysis completed successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Analysis Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const uploadAndAnalyze = async (file: File) => {
    try {
      setFileName(file.name);
      
      toast({
        title: "Processing Document",
        description: `Extracting text from ${file.name}...`,
      });

      const text = await extractTextFromFile(file);
      setDocumentText(text);
      
      toast({
        title: "Text Extracted",
        description: "Starting analysis...",
      });

      const result = await analysisQuery.mutateAsync(text);
      return result;
    } catch (error) {
      console.error('Error processing document:', error);
      
      if (error instanceof Error) {
        toast({
          title: "Upload Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Upload Failed",
          description: "An unexpected error occurred.",
          variant: "destructive",
        });
      }
      
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
