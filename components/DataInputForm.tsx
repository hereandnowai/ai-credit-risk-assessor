
import React from 'react';
import { CreditApplicationData, AssessmentFormSectionKey, AssessmentFormFieldKey } from '../types';
import { LOAN_PURPOSE_OPTIONS } from '../constants';
import Section from './Section';
import InputField from './InputField';
import TextareaField from './TextareaField';
import SelectField from './SelectField';

// This form now only handles Financial, Alternative, and Loan Details
type AssessmentFormData = Omit<CreditApplicationData, 'personalInfo'>;

interface DataInputFormProps {
  assessmentFormData: AssessmentFormData;
  onFormChange: <S extends AssessmentFormSectionKey, F extends AssessmentFormFieldKey<S>>(
    section: S,
    field: F,
    value: AssessmentFormData[S][F]
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

const DataInputForm: React.FC<DataInputFormProps> = ({ assessmentFormData, onFormChange, onSubmit, isLoading }) => {
  
  const handleChange = <S extends AssessmentFormSectionKey, F extends AssessmentFormFieldKey<S>>(
    section: S,
    field: F
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    onFormChange(section, field, e.target.value as AssessmentFormData[S][F]);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Personal Information Section Removed - Managed in SettingsPage */}

      <Section title="Financial Data">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Current Annual Income (USD)" id="income" name="income" type="number" value={assessmentFormData.financialData.income} onChange={handleChange('financialData', 'income')} required />
          <InputField label="Income Stability (e.g., Stable, Variable, Seasonal)" id="incomeStability" name="incomeStability" value={assessmentFormData.financialData.incomeStability} onChange={handleChange('financialData', 'incomeStability')} />
          <InputField label="Total Employment History (Years)" id="employmentHistoryYears" name="employmentHistoryYears" type="number" value={assessmentFormData.financialData.employmentHistoryYears} onChange={handleChange('financialData', 'employmentHistoryYears')} />
          <InputField label="Current Job Tenure (Months)" id="jobTenureMonths" name="jobTenureMonths" type="number" value={assessmentFormData.financialData.jobTenureMonths} onChange={handleChange('financialData', 'jobTenureMonths')} />
          <InputField label="Credit Score (if known)" id="creditScore" name="creditScore" type="number" value={assessmentFormData.financialData.creditScore} onChange={handleChange('financialData', 'creditScore')} />
          <InputField label="Savings Account Balance (USD)" id="savingsAmount" name="savingsAmount" type="number" value={assessmentFormData.financialData.savingsAmount} onChange={handleChange('financialData', 'savingsAmount')} />
          <InputField label="Investment Account Balance (USD)" id="investmentAmount" name="investmentAmount" type="number" value={assessmentFormData.financialData.investmentAmount} onChange={handleChange('financialData', 'investmentAmount')} />
        </div>
        <TextareaField label="Existing Debts & Credit Obligations" id="existingDebts" name="existingDebts" value={assessmentFormData.financialData.existingDebts} onChange={handleChange('financialData', 'existingDebts')} helpText="E.g., Mortgage: $200k, Car Loan: $15k, Credit Card: $5k limit / $1k balance" />
        <TextareaField label="Payment History Notes" id="paymentHistoryNotes" name="paymentHistoryNotes" value={assessmentFormData.financialData.paymentHistoryNotes} onChange={handleChange('financialData', 'paymentHistoryNotes')} helpText="E.g., On-time payments for 5 years, 1 late payment 2 years ago" />
      </Section>

      <Section title="Alternative Data">
        <TextareaField label="Bank Transaction Patterns" id="bankTransactionPatterns" name="bankTransactionPatterns" value={assessmentFormData.alternativeData.bankTransactionPatterns} onChange={handleChange('alternativeData', 'bankTransactionPatterns')} helpText="Describe general patterns: regular salary, consistent utility payments, spending habits." />
        <TextareaField label="Utility & Subscription Payment Records" id="utilityPaymentHistory" name="utilityPaymentHistory" value={assessmentFormData.alternativeData.utilityPaymentHistory} onChange={handleChange('alternativeData', 'utilityPaymentHistory')} helpText="E.g., All utility bills paid on time for 3 years" />
        <TextareaField label="Rental History (if applicable)" id="rentalHistory" name="rentalHistory" value={assessmentFormData.alternativeData.rentalHistory} onChange={handleChange('alternativeData', 'rentalHistory')} helpText="E.g., Consistent rent payments, no issues reported by landlord" />
        <TextareaField label="Digital Payment & E-commerce Activity" id="digitalWalletUsage" name="digitalWalletUsage" value={assessmentFormData.alternativeData.digitalWalletUsage} onChange={handleChange('alternativeData', 'digitalWalletUsage')} helpText="Describe usage of digital wallets, P2P transfers, online shopping frequency." />
        <TextareaField label="Social Media Financial Behavior Indicators" id="socialMediaFinancialIndicators" name="socialMediaFinancialIndicators" value={assessmentFormData.alternativeData.socialMediaFinancialIndicators} onChange={handleChange('alternativeData', 'socialMediaFinancialIndicators')} helpText="Optional and subject to legal/ethical considerations. Enter 'N/A' if not applicable." />
      </Section>

      <Section title="Loan Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Requested Loan Amount (USD)" id="requestedLoanAmount" name="requestedLoanAmount" type="number" value={assessmentFormData.loanDetails.requestedLoanAmount} onChange={handleChange('loanDetails', 'requestedLoanAmount')} required />
          <SelectField label="Loan Purpose" id="loanPurpose" name="loanPurpose" value={assessmentFormData.loanDetails.loanPurpose} onChange={handleChange('loanDetails', 'loanPurpose')} options={LOAN_PURPOSE_OPTIONS} required />
          <InputField label="Proposed Repayment Term (Months)" id="proposedRepaymentTermMonths" name="proposedRepaymentTermMonths" type="number" value={assessmentFormData.loanDetails.proposedRepaymentTermMonths} onChange={handleChange('loanDetails', 'proposedRepaymentTermMonths')} required />
          <InputField label="Collateral or Security Offered" id="collateralOffered" name="collateralOffered" value={assessmentFormData.loanDetails.collateralOffered} onChange={handleChange('loanDetails', 'collateralOffered')} helpText="E.g., Property valued at $X, None" />
        </div>
      </Section>

      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-brand-primary text-brand-secondary font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
        >
          {isLoading ? 'Analyzing...' : 'Get Risk Assessment'}
        </button>
      </div>
    </form>
  );
};

export default DataInputForm;
