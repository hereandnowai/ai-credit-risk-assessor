
import React from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children, icon }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 border border-brand-secondary">
      <div className="flex items-center mb-4">
        {icon && <span className="mr-3 text-gray-100">{icon}</span>}
        <h2 className="text-2xl font-semibold text-gray-100">{title}</h2>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

export default Section;