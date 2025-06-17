import type { Agent } from '@/types/insurance';
import { Brain, Shield, Scale, Search, Target } from 'lucide-react';

export const agents: Agent[] = [
  {
    id: '1',
    name: 'Document Parser',
    icon: Search,
    status: 'completed',
    progress: 100,
    findings: 12,
    description: 'Extracts and identifies policy clauses, terms, and structure',
    lastRun: '2 minutes ago',
    processingTime: '0.8s'
  },
  {
    id: '2',
    name: 'Risk Scorer',
    icon: Target,
    status: 'completed',
    progress: 100,
    findings: 8,
    description: 'Evaluates each clause for potential exploitation scenarios',
    lastRun: '90 seconds ago',
    processingTime: '2.1s'
  },
  {
    id: '3',
    name: 'Claim Generator',
    icon: Brain,
    status: 'completed',
    progress: 100,
    findings: 5,
    description: 'Simulates potential claims that could exploit identified weaknesses',
    lastRun: '60 seconds ago',
    processingTime: '1.7s'
  },
  {
    id: '4',
    name: 'Legal Compliance Engine',
    icon: Scale,
    status: 'processing',
    progress: 75,
    findings: 2,
    description: 'Checks clauses against regulatory requirements and industry standards',
    lastRun: '30 seconds ago',
    processingTime: '3.2s (est.)'
  },
  {
    id: '5',
    name: 'Regulatory Compliance Scanner',
    icon: Shield,
    status: 'pending',
    progress: 0,
    findings: 0,
    description: 'Validates policy terms against state and federal insurance regulations',
    lastRun: 'Not started',
    processingTime: '2.5s (est.)'
  }
];
