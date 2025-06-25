
import React from 'react';
import { BRANDING_INFO } from '../constants';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 my-8">
        <img 
            src={BRANDING_INFO.brand.chatbot.face} 
            alt="AI Analyzing" 
            className="h-24 w-24 rounded-full animate-pulse border-4 border-brand-primary"
        />
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brand-primary"></div>
      <p className="text-gray-100 font-semibold text-lg">Analyzing Creditworthiness...</p>
      <p className="text-gray-300 text-sm">This may take a moment. "{BRANDING_INFO.brand.slogan}"</p>
    </div>
  );
};

export default LoadingSpinner;