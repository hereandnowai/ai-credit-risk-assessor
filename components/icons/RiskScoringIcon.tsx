import React from 'react';

const RiskScoringIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
    className="w-12 h-12"
  >
    <path d="M21.21 15.89A10 10 0 1 1 8.11 2.99"></path>
    <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
    <path d="M12 12l8 4.5"></path>
  </svg>
);

export default RiskScoringIcon;