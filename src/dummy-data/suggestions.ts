import type { Suggestion } from '@/types/insurance';

export const mockSuggestions: Suggestion[] = [
  {
    id: 's1',
    clauseId: 'LC-401',
    clauseType: 'Liability',
    text: 'Water damage clause creates significant exploit opportunity',
    original: 'water damage',
    suggestion: 'sudden and accidental water discharge from plumbing systems, excluding floods, groundwater, and gradual leaks',
    start: 234,
    end: 256,
    approved: null,
    type: 'Exploit Risk',
    riskScore: 8,
    exploitScenario: 'A policyholder could claim any water damage regardless of cause. Without "sudden and accidental" language, claims for gradual leaks, floods, or poor maintenance would likely succeed, leading to unintended payouts.',
    identifiedBy: 'Risk Scorer + Claim Generator',
    severity: 'High'
  },
  {
    id: 's2',
    clauseId: 'COV-205',
    clauseType: 'Coverage',
    text: 'Liability limitation missing critical constraints',
    original: 'reasonable efforts',
    suggestion: 'commercially reasonable efforts as defined in Section 12.3, not to exceed $50,000 in aggregate costs',
    start: 445,
    end: 462,
    approved: null,
    type: 'Missing Limitation',
    riskScore: 7,
    exploitScenario: 'Without specific cost caps, "reasonable efforts" could justify unlimited expenses. A policyholder could argue that hiring expensive experts or contractors was "reasonable" for their situation.',
    identifiedBy: 'Legal Compliance Engine',
    severity: 'High'
  },
  {
    id: 's3',
    clauseId: 'NOT-101',
    clauseType: 'Coverage',
    text: 'Notification period violates state regulatory requirements',
    original: 'reasonable time',
    suggestion: 'thirty (30) days',
    start: 678,
    end: 756,
    approved: null,
    type: 'Regulatory Conflict',
    riskScore: 6,
    exploitScenario: 'In this jurisdiction, "reasonable time" notification clauses are void. Claims could be accepted years after occurrence if no specific timeframe is established, creating massive exposure.',
    identifiedBy: 'Regulatory Compliance Scanner',
    severity: 'Medium'
  }
];
