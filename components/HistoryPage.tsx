
import React from 'react';
import { AssessmentHistoryItem, RiskTier } from '../types';
import { ArchiveBoxIcon, EyeIcon, PencilSquareIcon, DocumentArrowDownIcon, TrashIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { BRANDING_INFO } from '../constants';

interface HistoryPageProps {
  history: AssessmentHistoryItem[];
  onViewDetails: (item: AssessmentHistoryItem) => void;
  onUseAsTemplate: (item: AssessmentHistoryItem) => void;
  onDownloadPdf: (item: AssessmentHistoryItem) => void;
  onDelete: (itemId: string) => void;
  onNavigateToAssessor: () => void;
}

const getRiskTierBadgeColor = (tier: RiskTier) => {
  switch (tier) {
    case RiskTier.LOW: return 'bg-green-700 text-green-100';
    case RiskTier.MEDIUM: return 'bg-yellow-700 text-yellow-100';
    case RiskTier.HIGH: return 'bg-red-700 text-red-100';
    default: return 'bg-gray-600 text-gray-100';
  }
};

const HistoryPage: React.FC<HistoryPageProps> = ({ 
  history, 
  onViewDetails, 
  onUseAsTemplate, 
  onDownloadPdf, 
  onDelete,
  onNavigateToAssessor
}) => {
  return (
    <div className="animate-fadeIn">
      <header className="text-center mb-10">
        <div className="inline-flex items-center justify-center">
            <ArchiveBoxIcon className="h-10 w-10 text-brand-primary mr-3" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-100">
                Assessment History
            </h1>
        </div>
        <p className="mt-2 text-lg text-gray-300">
          Review, reuse, or download your past credit risk assessments.
        </p>
      </header>

      {history.length === 0 ? (
        <div className="text-center py-12 bg-gray-800 rounded-lg border border-brand-secondary shadow-lg">
          <ExclamationTriangleIcon className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-100 mb-2">No History Yet</h2>
          <p className="text-gray-300 mb-6">You haven't performed any assessments. <br/>Your completed assessments will appear here.</p>
          <button
            onClick={onNavigateToAssessor}
            className="bg-brand-primary text-brand-secondary font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75 transition duration-150 ease-in-out"
            aria-label="Start a new assessment"
          >
            Start New Assessment
          </button>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg shadow-xl border border-brand-secondary overflow-hidden">
          <ul role="list" className="divide-y divide-gray-700">
            {history.sort((a,b) => b.timestamp - a.timestamp).map((item) => (
              <li key={item.id} className="px-4 py-5 sm:px-6 hover:bg-gray-700/50 transition-colors duration-150">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-lg font-semibold text-brand-primary truncate">{item.applicantName || 'N/A'}</p>
                    <p className="text-sm text-gray-300">
                      Assessed on: {new Date(item.timestamp).toLocaleDateString()} at {new Date(item.timestamp).toLocaleTimeString()}
                    </p>
                     <p className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskTierBadgeColor(item.outputData.riskScore.tier)}`}>
                        Risk Tier: {item.outputData.riskScore.tier} (Score: {item.outputData.riskScore.score})
                    </p>
                  </div>
                  <div className="flex flex-shrink-0 space-x-2 mt-2 sm:mt-0">
                    <button
                      onClick={() => onViewDetails(item)}
                      title="View Details"
                      className="p-2 text-gray-300 hover:text-brand-primary rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:bg-gray-600 transition-colors"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onUseAsTemplate(item)}
                      title="Use as Template & Re-run"
                      className="p-2 text-gray-300 hover:text-brand-primary rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:bg-gray-600 transition-colors"
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onDownloadPdf(item)}
                      title="Download PDF"
                      className="p-2 text-gray-300 hover:text-brand-primary rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:bg-gray-600 transition-colors"
                    >
                      <DocumentArrowDownIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to delete the assessment for ${item.applicantName || 'this applicant'}? This action cannot be undone.`)) {
                          onDelete(item.id);
                        }
                      }}
                      title="Delete Assessment"
                      className="p-2 text-red-400 hover:text-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-gray-600 transition-colors"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
       <div className="mt-12 text-center">
          <button
            onClick={onNavigateToAssessor}
            className="bg-brand-primary text-brand-secondary font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
            >
            Start New Assessment
          </button>
        </div>
    </div>
  );
};

export default HistoryPage;
