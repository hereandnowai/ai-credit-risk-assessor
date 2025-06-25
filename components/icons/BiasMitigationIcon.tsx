import React from 'react';

const BiasMitigationIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M16.5 12c0-1.84-.75-3.51-1.97-4.73L12 5l-2.53 2.27A6.93 6.93 0 0 0 7.5 12c0 1.84.75 3.51 1.97 4.73L12 19l2.53-2.27A6.93 6.93 0 0 0 16.5 12z"></path>
    <line x1="3" y1="12" x2="21" y2="12"></line>
  </svg>
);

export default BiasMitigationIcon;