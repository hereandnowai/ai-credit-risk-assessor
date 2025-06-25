
import { PersonalInfoData, CreditApplicationData } from './types';

export const BRANDING_INFO = {
  brand: {
    shortName: "HERE AND NOW AI",
    longName: "HERE AND NOW AI - Artificial Intelligence Research Institute",
    website: "https://hereandnowai.com",
    email: "info@hereandnowai.com",
    mobile: "+91 996 296 1000",
    slogan: "designed with passion for innovation",
    colors: {
      primary: "#FFDF00",
      secondary: "#004040"
    },
    logo: {
      title: "https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/HNAI%20Title%20-Teal%20%26%20Golden%20Logo%20-%20DESIGN%203%20-%20Raj-07.png",
      favicon: "https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/favicon-logo-with-name.png"
    },
    chatbot: {
      avatar: "https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/caramel.jpeg",
      face: "https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/caramel-face.jpeg"
    },
    socialMedia: {
      blog: "https://hereandnowai.com/blog",
      linkedin: "https://www.linkedin.com/company/hereandnowai/",
      instagram: "https://instagram.com/hereandnow_ai",
      github: "https://github.com/hereandnowai",
      x: "https://x.com/hereandnow_ai",
      youtube: "https://youtube.com/@hereandnow_ai"
    }
  }
};

export const GEMINI_API_MODEL = 'gemini-2.5-flash-preview-04-17';

export const EMPLOYMENT_STATUS_OPTIONS = [
  "Employed", "Self-Employed", "Unemployed", "Student", "Retired"
];

export const LOAN_PURPOSE_OPTIONS = [
  "Debt Consolidation", "Home Improvement", "Major Purchase", "Business", "Education", "Medical Expenses", "Other"
];

export const INITIAL_PERSONAL_INFO_DATA: PersonalInfoData = {
  applicantName: '', // Added for identifying history items
  age: '',
  location: '',
  employmentStatus: EMPLOYMENT_STATUS_OPTIONS[0],
  education: '',
  profession: '',
  familyComposition: '',
  dependents: '',
};

export const INITIAL_ASSESSMENT_FORM_DATA: Omit<CreditApplicationData, 'personalInfo'> = {
  financialData: {
    income: '',
    incomeStability: '', // e.g., Stable, Variable
    employmentHistoryYears: '',
    jobTenureMonths: '',
    existingDebts: '', // e.g., Mortgage: $200k, Car Loan: $15k
    savingsAmount: '',
    investmentAmount: '',
    creditScore: '',
    paymentHistoryNotes: '', // e.g., "On-time payments for 5 years, 1 late payment 2 years ago"
  },
  alternativeData: {
    bankTransactionPatterns: '', // e.g., "Regular salary deposits, consistent utility payments, moderate discretionary spending"
    utilityPaymentHistory: '', // e.g., "All utility bills paid on time for 3 years"
    rentalHistory: '', // e.g., "Consistent rent payments, no issues reported by landlord"
    digitalWalletUsage: '', // e.g., "Frequent use for P2P transfers and online shopping"
    ecommerceActivity: '', // e.g., "Regular online purchases, diverse categories"
    socialMediaFinancialIndicators: '', // (Optional, if legally permissible and ethical) "N/A"
  },
  loanDetails: {
    requestedLoanAmount: '',
    loanPurpose: LOAN_PURPOSE_OPTIONS[0],
    proposedRepaymentTermMonths: '',
    collateralOffered: '', // e.g., "Property valued at $X", "None"
  },
};

export const LOCAL_STORAGE_PERSONAL_INFO_KEY = 'hnaiCreditAssessorPersonalInfo';
export const LOCAL_STORAGE_HISTORY_KEY = 'hnaiCreditAssessorHistory'; // New key for history
