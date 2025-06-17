
import { useQuery } from '@tanstack/react-query';
import { fetchInsuranceAnalysis } from '@/services/api';

export const useInsuranceAnalysis = () => {
  return useQuery({
    queryKey: ['insurance-analysis'],
    queryFn: fetchInsuranceAnalysis,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
