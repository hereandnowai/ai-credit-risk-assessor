import React from 'react';
import { BRANDING_INFO } from '../constants';
import Section from './Section'; // Reusing Section for consistent styling
import { HomeIcon, LinkIcon } from '@heroicons/react/24/outline'; // Example icons

interface AboutPageProps {
  onNavigateToAssessor: () => void;
}

const coreValues = [
  {
    name: "Innovation",
    description: "Relentlessly pursuing novel ideas and groundbreaking solutions to push the boundaries of artificial intelligence.",
  },
  {
    name: "Integrity",
    description: "Upholding the highest ethical standards in all our research, development, and operational activities.",
  },
  {
    name: "Collaboration",
    description: "Fostering a diverse and inclusive ecosystem that encourages teamwork, shared knowledge, and open dialogue.",
  },
  {
    name: "Excellence",
    description: "Committing to the highest quality and impact in our research, educational programs, and technological contributions.",
  },
  {
    name: "Responsibility",
    description: "Developing and deploying AI in a manner that is safe, fair, transparent, and beneficial to humanity as a whole.",
  },
];

const AboutPage: React.FC<AboutPageProps> = ({ onNavigateToAssessor }) => {
  return (
    <div className="animate-fadeIn text-gray-100">
      <header className="text-center mb-12 py-8 bg-gray-800 border-b-2 border-brand-secondary rounded-lg">
        <h1 className="text-4xl sm:text-5xl font-bold text-brand-primary">
          About {BRANDING_INFO.brand.shortName}
        </h1>
        <p className="mt-3 text-lg text-gray-300">
          {BRANDING_INFO.brand.longName}
        </p>
        <p className="mt-2 text-md text-gray-400 italic">
          "{BRANDING_INFO.brand.slogan}"
        </p>
      </header>

      <Section title="Our Story">
        <p className="text-gray-300 leading-relaxed">
          {BRANDING_INFO.brand.shortName} was founded with the ambition to be at the forefront of Artificial Intelligence research and development. We believe in the transformative power of AI to solve complex global challenges, drive innovation across industries, and enhance human potential. Our journey is one of continuous learning, exploration, and a commitment to creating intelligent solutions that are both powerful and ethically sound.
        </p>
      </Section>

      <Section title="Our Vision">
        <p className="text-gray-300 leading-relaxed">
          To be a globally recognized leader in artificial intelligence research, pioneering innovations that solve complex real-world challenges and empower a more intelligent, equitable, and sustainable future for all.
        </p>
      </Section>

      <Section title="Our Mission">
        <p className="text-gray-300 leading-relaxed">
          To advance the frontiers of AI through cutting-edge research and development; to foster a collaborative and inclusive ecosystem for learning and discovery; and to ethically translate AI breakthroughs into impactful solutions and knowledge that benefit society, drive progress, and inspire the next generation of innovators.
        </p>
      </Section>

      <Section title="Our Core Values">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreValues.map((value) => (
            <div key={value.name} className="bg-gray-700 p-6 rounded-lg shadow-md border border-brand-secondary/50">
              <h3 className="text-xl font-semibold text-brand-primary mb-2">{value.name}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </Section>
      
      <Section title="Connect With Us">
         <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
                href={BRANDING_INFO.brand.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-brand-primary text-brand-secondary font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75 transition duration-150 ease-in-out transform hover:scale-105"
            >
                <LinkIcon className="w-5 h-5 mr-2" />
                Visit Our Website
            </a>
            <button
                onClick={onNavigateToAssessor}
                className="inline-flex items-center bg-brand-secondary text-brand-primary font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-opacity-75 transition-colors duration-150 ease-in-out transform hover:scale-105"
                aria-label="Go to Credit Risk Assessor Tool"
            >
                <HomeIcon className="w-5 h-5 mr-2" />
                Credit Risk Assessor
            </button>
        </div>
        <p className="text-center text-gray-400 mt-6">
            Follow us on our social media channels to stay updated with our latest research and initiatives. Links can be found in the footer.
        </p>
      </Section>
    </div>
  );
};

export default AboutPage;
