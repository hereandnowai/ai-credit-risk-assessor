
export interface PersonalInfoData {
  applicantName: string; // Added for identifying history items
  age: string;
  location: string;
  employmentStatus: string;
  education: string;
  profession: string;
  familyComposition: string;
  dependents: string;
}

export interface FinancialData {
  income: string;
  incomeStability: string;
  employmentHistoryYears: string;
  jobTenureMonths: string;
  existingDebts: string;
  savingsAmount: string;
  investmentAmount: string;
  creditScore: string;
  paymentHistoryNotes: string;
}

export interface AlternativeData {
  bankTransactionPatterns: string;
  utilityPaymentHistory: string;
  rentalHistory: string;
  digitalWalletUsage: string;
  ecommerceActivity: string;
  socialMediaFinancialIndicators: string;
}

export interface LoanDetailsData {
  requestedLoanAmount: string;
  loanPurpose: string;
  proposedRepaymentTermMonths: string;
  collateralOffered: string;
}

export interface CreditApplicationData {
  personalInfo: PersonalInfoData;
  financialData: FinancialData;
  alternativeData: AlternativeData;
  loanDetails: LoanDetailsData;
}

export enum RiskTier {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export enum RecommendedAction {
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
  MANUAL_REVIEW = 'MANUAL_REVIEW',
}

export interface RiskScore {
  score: number;
  tier: RiskTier;
  probabilityOfDefault: string;
}

export interface KeyRiskFactors {
  positive: string[];
  negative: string[];
}

export interface DetailedAnalysis {
  personalInfoAnalysis: string;
  financialDataAnalysis: string;
  alternativeDataAnalysis: string;
  behavioralPatterns: string;
  psychometricElements: string;
  macroeconomicContext: string;
  loanDetailsAnalysis: string;
}

export interface FraudDetection {
  assessment: string;
  identifiedAnomalies: string[];
  inconsistencyFlags: string[];
}

export interface BiasMitigationAndFairLending {
  complianceStatement: string;
  biasCorrectionNotes: string;
  financialInclusionConsiderations: string;
}

export interface Recommendations {
  suggestedAction: RecommendedAction;
  loanTermsSuggestion?: string;
  interestRateSuggestion?: string;
  alternativeProducts?: string[];
  conditionsForApproval?: string[];
  humanReviewTriggers?: string[];
  additionalDocumentationRequired?: string[];
}

export interface RiskAssessmentOutput {
  executiveSummary: string;
  riskScore: RiskScore;
  keyRiskFactors: KeyRiskFactors;
  detailedAnalysis: DetailedAnalysis;
  fraudDetection: FraudDetection;
  biasMitigationAndFairLending: BiasMitigationAndFairLending;
  recommendations: Recommendations;
  monitoringAlerts: string[];
  complianceNotes: string;
}

// For main assessment form handling
export type AssessmentFormSectionKey = keyof Omit<CreditApplicationData, 'personalInfo'>;
export type AssessmentFormFieldKey<T extends AssessmentFormSectionKey> = keyof CreditApplicationData[T];

// For Settings Personal Info form handling
export type PersonalInfoFieldKey = keyof PersonalInfoData;

export type NotificationType = 'success' | 'error' | 'info';

// For Assessment History
export interface AssessmentHistoryItem {
  id: string; // Unique identifier (e.g., UUID)
  applicantName: string; // From PersonalInfoData for display
  timestamp: number; // Date of assessment
  inputData: CreditApplicationData;
  outputData: RiskAssessmentOutput;
}
