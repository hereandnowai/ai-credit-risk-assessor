
import React from 'react';
import { BRANDING_INFO } from '../constants';
import BlogIcon from './icons/BlogIcon';
import LinkedInIcon from './icons/LinkedInIcon';
import InstagramIcon from './icons/InstagramIcon';
import GitHubIcon from './icons/GitHubIcon';
import XIcon from './icons/XIcon';
import YouTubeIcon from './icons/YouTubeIcon';

const socialLinks = [
  { name: 'Blog', href: BRANDING_INFO.brand.socialMedia.blog, Icon: BlogIcon },
  { name: 'LinkedIn', href: BRANDING_INFO.brand.socialMedia.linkedin, Icon: LinkedInIcon },
  { name: 'Instagram', href: BRANDING_INFO.brand.socialMedia.instagram, Icon: InstagramIcon },
  { name: 'GitHub', href: BRANDING_INFO.brand.socialMedia.github, Icon: GitHubIcon },
  { name: 'X', href: BRANDING_INFO.brand.socialMedia.x, Icon: XIcon },
  { name: 'YouTube', href: BRANDING_INFO.brand.socialMedia.youtube, Icon: YouTubeIcon },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-secondary text-gray-300 py-8 mt-12">
      <div className="container mx-auto px-6 text-center">
        <p className="font-semibold mb-4 text-brand-primary">{BRANDING_INFO.brand.slogan}</p>
        <div className="flex justify-center space-x-6 mb-4">
          {socialLinks.map(({ name, href, Icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="text-gray-300 hover:text-brand-primary transition-colors duration-300"
            >
              <Icon className="w-6 h-6" />
            </a>
          ))}
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} {BRANDING_INFO.brand.longName}. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          Developed by Adhithya J [ AI Products Engineering Team ]
        </p>
        <p className="text-xs mt-1">
          <a href={`mailto:${BRANDING_INFO.brand.email}`} className="hover:underline hover:text-brand-primary transition-colors duration-150">{BRANDING_INFO.brand.email}</a> | 
          <a href={`tel:${BRANDING_INFO.brand.mobile.replace(/\s/g, '')}`} className="hover:underline hover:text-brand-primary transition-colors duration-150"> {BRANDING_INFO.brand.mobile}</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
