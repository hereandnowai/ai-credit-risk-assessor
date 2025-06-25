
import React from 'react';
import { BRANDING_INFO } from '../constants';
import { Cog6ToothIcon, HomeIcon, InformationCircleIcon, ArchiveBoxIcon } from '@heroicons/react/24/outline';

interface NavbarProps {
  onNavigateHome: () => void;
  onNavigateToAbout: () => void;
  onNavigateToSettings: () => void;
  onNavigateToHistory: () => void; // New prop for history
}

const Navbar: React.FC<NavbarProps> = ({ onNavigateHome, onNavigateToAbout, onNavigateToSettings, onNavigateToHistory }) => {
  return (
    <nav className="bg-brand-secondary shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={onNavigateHome} className="flex items-center focus:outline-none focus:ring-2 focus:ring-brand-primary rounded" aria-label="Go to Home Page">
            <img 
              src={BRANDING_INFO.brand.logo.title} 
              alt={`${BRANDING_INFO.brand.shortName} Logo`} 
              className="h-12 mr-3"
            />
          </button>
        </div>
        
        <div className="flex items-center space-x-1 sm:space-x-2">
           <button 
             onClick={onNavigateHome} 
             className="text-gray-200 hover:text-brand-primary font-medium px-2 py-2 sm:px-3 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors duration-150 flex items-center"
             aria-label="Go to Home Page"
           >
             <HomeIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-1.5" />
             Home
           </button>
            <button 
             onClick={onNavigateToHistory}
             className="text-gray-200 hover:text-brand-primary font-medium px-2 py-2 sm:px-3 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors duration-150 flex items-center"
             aria-label="Go to Assessment History Page"
           >
             <ArchiveBoxIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-1.5" />
             History
           </button>
           <button 
             onClick={onNavigateToAbout}
             className="text-gray-200 hover:text-brand-primary font-medium px-2 py-2 sm:px-3 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors duration-150 flex items-center"
             aria-label="Go to About Us Page"
           >
             <InformationCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-1.5" />
             About
           </button>
           <button 
             onClick={onNavigateToSettings}
             className="text-gray-200 hover:text-brand-primary font-medium px-2 py-2 sm:px-3 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors duration-150 flex items-center"
             aria-label="Go to Settings Page"
           >
             <Cog6ToothIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-1.5" />
             Settings
           </button>
            <img 
              src={BRANDING_INFO.brand.chatbot.avatar} 
              alt="Chatbot Avatar" 
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-full border-2 border-brand-primary"
            />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
