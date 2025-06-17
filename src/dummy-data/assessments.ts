import type { Assessment, DocumentAssessment } from '@/types/insurance';

export const mockAssessment: DocumentAssessment = {
  confidenceScore: 74,
  totalClauses: 12,
  flaggedClauses: 3,
  riskDistribution: {
    high: 2,
    medium: 1,
    low: 0
  }
};

export const assessments: Assessment[] = [
  {
    id: '1',
    policyName: 'Commercial Property Insurance Policy',
    uploadDate: '2024-01-15T10:30:00Z',
    status: 'completed',
    riskScore: 74,
    flaggedClauses: 3,
    totalClauses: 12,
    version: 'v2.1'
  },
  {
    id: '2',
    policyName: 'General Liability Coverage Agreement',
    uploadDate: '2024-01-14T14:22:00Z',
    status: 'completed',
    riskScore: 85,
    flaggedClauses: 2,
    totalClauses: 8,
    version: 'v1.3'
  },
  {
    id: '3',
    policyName: 'Workers Compensation Policy',
    uploadDate: '2024-01-14T09:15:00Z',
    status: 'processing',
    riskScore: 0,
    flaggedClauses: 0,
    totalClauses: 0,
    version: 'v1.0'
  },
  {
    id: '4',
    policyName: 'Professional Indemnity Insurance',
    uploadDate: '2024-01-13T16:45:00Z',
    status: 'completed',
    riskScore: 92,
    flaggedClauses: 1,
    totalClauses: 15,
    version: 'v3.2'
  },
  {
    id: '5',
    policyName: 'Auto Insurance Policy Template',
    uploadDate: '2024-01-12T11:20:00Z',
    status: 'failed',
    riskScore: 0,
    flaggedClauses: 0,
    totalClauses: 0,
    version: 'v1.0'
  }
];
