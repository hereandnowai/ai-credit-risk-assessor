
import React from 'react';
import { RiskAssessmentOutput, RiskTier, RecommendedAction } from '../types';
import Section from './Section';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';

interface RiskAssessmentDisplayProps {
  assessment: RiskAssessmentOutput;
  contentRef: React.RefObject<HTMLDivElement>; // For PDF capture
  onDownloadPdf?: () => void; // Optional: If PDF download logic is handled outside
}

// Styling functions are simplified as cards are now consistently dark with light text.
// Specific highlights for tier/action can be done with text color if needed.
const getRiskTierStyling = (tier: RiskTier) => {
  // Example: Highlight text color for emphasis
  switch (tier) {
    case RiskTier.LOW:
      return 'text-green-400';
    case RiskTier.MEDIUM:
      return 'text-yellow-400';
    case RiskTier.HIGH:
      return 'text-red-400';
    default:
      return 'text-gray-100';
  }
};

const getRecommendationStyling = (action: RecommendedAction) => {
  switch (action) {
    case RecommendedAction.APPROVE:
      return 'text-green-400';
    case RecommendedAction.MANUAL_REVIEW:
      return 'text-yellow-400';
    case RecommendedAction.REJECT:
      return 'text-red-400';
    default:
      return 'text-gray-100';
  }
};

const Card: React.FC<{title: string, children: React.ReactNode, className?: string}> = ({ title, children, className }) => (
    <div className={`bg-gray-800 p-4 border border-brand-secondary rounded-lg shadow ${className}`}>
        <h4 className="text-md font-semibold text-gray-100 mb-2">{title}</h4>
        {children}
    </div>
);

const ListDisplay: React.FC<{items?: string[], title?: string, itemClassName?: string, className?: string}> = ({ items, title, itemClassName = "p-1 rounded", className }) => {
    if (!items || items.length === 0) {
        if (title) {
            return (
                <div className={className}>
                    <h5 className="text-sm font-medium text-gray-300 mb-1">{title}</h5>
                    <p className="text-sm text-gray-400">N/A</p>
                </div>
            );
        }
        return null;
    }
    return (
        <div className={className}>
            {title && <h5 className="text-sm font-medium text-gray-300 mb-1">{title}</h5>}
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-200">
                {items.map((item, index) => <li key={index} className={itemClassName}>{item}</li>)}
            </ul>
        </div>
    );
};


const RiskAssessmentDisplay: React.FC<RiskAssessmentDisplayProps> = ({ assessment, contentRef, onDownloadPdf }) => {
  return (
    <div ref={contentRef} className="space-y-8 mt-10 bg-gray-900 p-4 sm:p-6 rounded-lg"> {/* Added background for PDF capture consistency */}
      <Section title="Credit Risk Assessment Report">
        {onDownloadPdf && (
            <button
                onClick={onDownloadPdf}
                className="float-right -mt-2 mb-2 inline-flex items-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-150 ease-in-out"
                aria-label="Download Assessment as PDF"
            >
                <DocumentArrowDownIcon className="w-5 h-5 mr-2" />
                Download PDF
            </button>
        )}
        <Card title="Executive Summary" className="bg-gray-700"> {/* Slightly different shade for emphasis */}
          <p className="text-lg text-gray-100">{assessment.executiveSummary}</p>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card title="Risk Score & Tier">
                <p className={`text-3xl font-bold text-brand-primary`}> {/* Score prominent with primary color */}
                    {assessment.riskScore.score}
                </p>
                <p className={`text-xl font-semibold mt-2 ${getRiskTierStyling(assessment.riskScore.tier)}`}>
                    Tier: {assessment.riskScore.tier}
                </p>
                <p className="text-sm text-gray-300 mt-1">
                    Probability of Default: {assessment.riskScore.probabilityOfDefault}
                </p>
            </Card>
            <Card title="Overall Recommendation">
                <p className={`text-2xl font-bold ${getRecommendationStyling(assessment.recommendations.suggestedAction)}`}>
                    {assessment.recommendations.suggestedAction.replace('_', ' ')}
                </p>
                {assessment.recommendations.loanTermsSuggestion && <p className="text-sm text-gray-300 mt-2">Suggested Terms: {assessment.recommendations.loanTermsSuggestion}</p>}
                {assessment.recommendations.interestRateSuggestion && <p className="text-sm text-gray-300">Interest Rate: {assessment.recommendations.interestRateSuggestion}</p>}
            </Card>
        </div>
      </Section>

      <Section title="Key Risk Factors">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Positive Indicators">
            <ListDisplay items={assessment.keyRiskFactors.positive} itemClassName="text-green-300 p-1"/>
          </Card>
          <Card title="Negative Indicators / Concerns">
            <ListDisplay items={assessment.keyRiskFactors.negative} itemClassName="text-red-300 p-1"/>
          </Card>
        </div>
      </Section>

      <Section title="Detailed Analysis">
        <div className="space-y-4">
            <Card title="Personal Information Analysis"><p className="text-sm text-gray-200">{assessment.detailedAnalysis.personalInfoAnalysis || "N/A"}</p></Card>
            <Card title="Financial Data Analysis"><p className="text-sm text-gray-200">{assessment.detailedAnalysis.financialDataAnalysis || "N/A"}</p></Card>
            <Card title="Alternative Data Analysis"><p className="text-sm text-gray-200">{assessment.detailedAnalysis.alternativeDataAnalysis || "N/A"}</p></Card>
            <Card title="Behavioral Patterns & Spending Habits"><p className="text-sm text-gray-200">{assessment.detailedAnalysis.behavioralPatterns || "N/A"}</p></Card>
            <Card title="Psychometric Elements (Skills, Competency, Growth Potential)"><p className="text-sm text-gray-200">{assessment.detailedAnalysis.psychometricElements || "N/A"}</p></Card>
            <Card title="Macroeconomic Indicators & Market Conditions"><p className="text-sm text-gray-200">{assessment.detailedAnalysis.macroeconomicContext || "N/A"}</p></Card>
            <Card title="Loan Details Analysis"><p className="text-sm text-gray-200">{assessment.detailedAnalysis.loanDetailsAnalysis || "N/A"}</p></Card>
        </div>
      </Section>

      <Section title="Fraud Detection & Anomaly Identification">
         <Card title="Fraud Assessment">
            <p className="text-sm text-gray-200 mb-2">{assessment.fraudDetection.assessment || "N/A"}</p>
            <ListDisplay items={assessment.fraudDetection.identifiedAnomalies} title="Identified Anomalies:" itemClassName="text-yellow-300 p-1"/>
            <ListDisplay items={assessment.fraudDetection.inconsistencyFlags} title="Inconsistency Flags:" itemClassName="text-yellow-300 p-1 mt-2"/>
         </Card>
      </Section>
      
      <Section title="Bias Mitigation & Fair Lending">
        <Card title="Fair Lending Overview">
            <p className="text-sm text-gray-200 mb-2"><strong>Compliance Statement:</strong> {assessment.biasMitigationAndFairLending.complianceStatement || "N/A"}</p>
            <p className="text-sm text-gray-200 mb-2"><strong>Bias Correction Notes:</strong> {assessment.biasMitigationAndFairLending.biasCorrectionNotes || "N/A"}</p>
            <p className="text-sm text-gray-200"><strong>Financial Inclusion Considerations:</strong> {assessment.biasMitigationAndFairLending.financialInclusionConsiderations || "N/A"}</p>
        </Card>
      </Section>

      <Section title="Recommendations & Next Steps">
        <Card title="Specific Recommendations">
            <ListDisplay items={assessment.recommendations.alternativeProducts} title="Alternative Products Suggested:" itemClassName="text-gray-200 p-1"/>
            <ListDisplay items={assessment.recommendations.conditionsForApproval} title="Conditions for Approval (if any):" className="mt-2 text-gray-200 p-1"/>
            <ListDisplay items={assessment.recommendations.humanReviewTriggers} title="Triggers for Manual Review:" className="mt-2 text-gray-200 p-1"/>
            <ListDisplay items={assessment.recommendations.additionalDocumentationRequired} title="Additional Documentation Required:" className="mt-2 text-gray-200 p-1"/>
        </Card>
      </Section>

      <Section title="Post-Approval Monitoring">
        <Card title="Monitoring Alerts">
            <ListDisplay items={assessment.monitoringAlerts} title="Metrics to Track:" itemClassName="text-gray-200 p-1"/>
        </Card>
      </Section>
      
      <Section title="Compliance & Regulatory Notes">
        <Card title="Compliance Observations">
            <p className="text-sm text-gray-200">{assessment.complianceNotes || "N/A"}</p>
        </Card>
      </Section>

    </div>
  );
};

export default RiskAssessmentDisplay;
