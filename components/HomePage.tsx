
import React from 'react';
import { BRANDING_INFO } from '../constants';
import Section from './Section';
import DataAnalysisIcon from './icons/DataAnalysisIcon';
import RiskScoringIcon from './icons/RiskScoringIcon';
import FraudDetectionIcon from './icons/FraudDetectionIcon';
import BiasMitigationIcon from './icons/BiasMitigationIcon';
import MonitoringIcon from './icons/MonitoringIcon';

interface HomePageProps {
  onStartAssessment: () => void;
}

const functionalities = [
  {
    title: "Comprehensive Data Analysis",
    description: "Integrates diverse data - traditional finance, alternative sources, behavioral insights, and market trends - for a holistic borrower view.",
    icon: <DataAnalysisIcon />,
  },
  {
    title: "Multi-Dimensional Risk Scoring",
    description: "Employs dynamic scoring models to categorize applicants, predict default probability, and uncover complex risk patterns.",
    icon: <RiskScoringIcon />,
  },
  {
    title: "Fraud Detection & Anomaly ID",
    description: "Utilizes real-time analysis to identify suspicious activities, application inconsistencies, and potential fraudulent behavior.",
    icon: <FraudDetectionIcon />,
  },
  {
    title: "Bias Mitigation & Fair Lending",
    description: "Ensures objectivity by identifying and correcting biases in data, promoting fair lending and financial inclusion.",
    icon: <BiasMitigationIcon />,
  },
  {
    title: "Real-Time Monitoring & Alerts",
    description: "Continuously tracks borrower financial health post-loan, issuing early warnings for deteriorating credit conditions.",
    icon: <MonitoringIcon />,
  },
];

const HomePage: React.FC<HomePageProps> = ({ onStartAssessment }) => {
  return (
    <div className="animate-fadeIn">
      <header className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-100">
          Welcome to <span className="text-brand-primary">{BRANDING_INFO.brand.shortName}</span> Credit Assessor
        </h1>
        <p className="mt-3 text-lg text-gray-300">
          Leveraging AI for accurate, fair, and efficient lending decisions.
        </p>
        <p className="mt-2 text-md text-gray-400 italic">
          "{BRANDING_INFO.brand.slogan}"
        </p>
      </header>

      <Section title="Our Core Functionalities">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {functionalities.map((func, index) => (
            <div 
              key={func.title} 
              className="bg-gray-800 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-brand-secondary hover:border-brand-primary flex flex-col items-center text-center transform hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-brand-primary mb-5 p-3 bg-brand-secondary/30 rounded-full">
                {React.cloneElement(func.icon, { className: "w-12 h-12 text-brand-primary" })}
              </div>
              <h3 className="text-xl font-semibold text-gray-100 mb-3">{func.title}</h3>
              <p className="text-sm text-gray-300 flex-grow leading-relaxed">{func.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <div className="mt-16 text-center">
        <button
          onClick={onStartAssessment}
          className="bg-brand-primary text-brand-secondary font-bold py-4 px-10 text-lg rounded-lg shadow-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75 transition duration-150 ease-in-out transform hover:scale-105"
          aria-label="Get started with credit risk assessment"
        >
          Get Started with Risk Assessment
        </button>
      </div>
    </div>
  );
};

export default HomePage;