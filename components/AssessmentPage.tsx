import React from 'react';
import DataInputForm from './DataInputForm';
import RiskAssessmentDisplay from './RiskAssessmentDisplay';
import LoadingSpinner from './LoadingSpinner';
import { 
  CreditApplicationData, 
  RiskAssessmentOutput,
  PersonalInfoData,
  AssessmentFormSectionKey,
  AssessmentFormFieldKey
} from '../types';

interface AssessmentPageProps {
  personalInfoSettings: PersonalInfoData;
  assessmentFormData: Omit<CreditApplicationData, 'personalInfo'>;
  assessmentResult: RiskAssessmentOutput | null;
  isLoading: boolean;
  error: string | null;
  isViewingHistoryItem: boolean;
  assessmentDisplayRef: React.RefObject<HTMLDivElement>;
  
  onAssessmentFormChange: <S extends AssessmentFormSectionKey, F extends AssessmentFormFieldKey<S>>(
    section: S,
    field: F,
    value: Omit<CreditApplicationData, 'personalInfo'>[S][F]
  ) => void;
  onSubmitAssessment: (e: React.FormEvent<HTMLFormElement>) => void;
  onStartNewAssessment: () => void;
  onDownloadPdf: () => void;
}

const AssessmentPage: React.FC<AssessmentPageProps> = ({
  personalInfoSettings,
  assessmentFormData,
  assessmentResult,
  isLoading,
  error,
  isViewingHistoryItem,
  assessmentDisplayRef,
  onAssessmentFormChange,
  onSubmitAssessment,
  onStartNewAssessment,
  onDownloadPdf,
}) => {
  return (
    <div className="animate-fadeIn">
      <header className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-100">
          {isViewingHistoryItem && assessmentResult 
            ? `Viewing Assessment: ${personalInfoSettings.applicantName || 'N/A'}` 
            : "Credit Application Assessment"}
        </h1>
        {!assessmentResult && !isLoading && !isViewingHistoryItem && (
          <p className="mt-2 text-lg text-gray-300">
            Please provide the applicant's financial, alternative, and loan details below. 
            Ensure Personal Information is up-to-date in Settings.
          </p>
        )}
         {isViewingHistoryItem && assessmentResult && (
          <p className="mt-2 text-md text-yellow-300 bg-gray-800 border border-yellow-500 p-3 rounded-md">
            You are viewing a historical assessment. The form data is pre-filled. To make changes and run a new assessment, use the "Use as Template" option from the History page or click "Start New Assessment" below.
          </p>
        )}
      </header>

      {(!assessmentResult || !isViewingHistoryItem || (isViewingHistoryItem && !assessmentResult)) && !isLoading && (
          <DataInputForm
            assessmentFormData={assessmentFormData}
            onFormChange={onAssessmentFormChange}
            onSubmit={onSubmitAssessment}
            isLoading={isLoading}
          />
      )}
      
      {isLoading && <LoadingSpinner />}

      {error && !isLoading && !assessmentResult && ( 
        <div className="my-6 p-4 bg-gray-800 border border-brand-secondary text-red-400 rounded-lg shadow" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      )}

      {assessmentResult && !isLoading && (
        <>
          <RiskAssessmentDisplay 
              assessment={assessmentResult} 
              contentRef={assessmentDisplayRef}
              onDownloadPdf={onDownloadPdf}
          />
          <div className="mt-8 text-center">
            <button
              onClick={onStartNewAssessment} 
              className="bg-brand-secondary text-brand-primary font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-brand-primary hover:text-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-opacity-75 transition-colors duration-150 ease-in-out"
            >
              Start New Assessment
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AssessmentPage;
