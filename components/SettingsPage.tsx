
import React, { useState, useEffect } from 'react';
import { PersonalInfoData, PersonalInfoFieldKey, NotificationType } from '../types';
import { EMPLOYMENT_STATUS_OPTIONS, INITIAL_PERSONAL_INFO_DATA } from '../constants';
import Section from './Section';
import InputField from './InputField';
import SelectField from './SelectField';
import Notification from './Notification';
import { CogIcon, UserCircleIcon, IdentificationIcon } from '@heroicons/react/24/outline';

interface SettingsPageProps {
  savedData: PersonalInfoData;
  onSave: (data: PersonalInfoData) => void;
  onNavigateToAssessor: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ savedData, onSave, onNavigateToAssessor }) => {
  const [formData, setFormData] = useState<PersonalInfoData>(INITIAL_PERSONAL_INFO_DATA);
  const [notification, setNotification] = useState<{ message: string; type: NotificationType } | null>(null);

  useEffect(() => {
    setFormData(savedData);
  }, [savedData]);

  const handleChange = (field: PersonalInfoFieldKey) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.applicantName) {
      setNotification({ message: 'Applicant Name is required to save settings.', type: 'error' });
      window.scrollTo(0,0);
      return;
    }
    onSave(formData);
    setNotification({ message: 'Personal information saved successfully!', type: 'success' });
    window.scrollTo(0,0);
  };

  return (
    <div className="animate-fadeIn">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onDismiss={() => setNotification(null)}
        />
      )}
      <header className="text-center mb-10">
        <div className="inline-flex items-center justify-center">
            <CogIcon className="h-10 w-10 text-brand-primary mr-3" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-100">
                Application Settings
            </h1>
        </div>
        <p className="mt-2 text-lg text-gray-300">
          Manage your personal information for credit assessments. This information will be used for all assessments.
        </p>
      </header>

      <form onSubmit={handleSubmit}>
        <Section title="Personal Information" icon={<UserCircleIcon className="w-7 h-7" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField 
              label="Applicant Full Name" 
              id="applicantName" 
              name="applicantName" 
              value={formData.applicantName} 
              onChange={handleChange('applicantName')} 
              required 
              helpText="Used to identify assessments in history."
            />
            <InputField label="Age" id="age" name="age" value={formData.age} onChange={handleChange('age')} type="number" required />
            <InputField label="Location (City, Country)" id="location" name="location" value={formData.location} onChange={handleChange('location')} required />
            <SelectField label="Employment Status" id="employmentStatus" name="employmentStatus" value={formData.employmentStatus} onChange={handleChange('employmentStatus')} options={EMPLOYMENT_STATUS_OPTIONS} required />
            <InputField label="Educational Background" id="education" name="education" value={formData.education} onChange={handleChange('education')} />
            <InputField label="Professional Qualifications/Profession" id="profession" name="profession" value={formData.profession} onChange={handleChange('profession')} />
            <InputField label="Family Composition (e.g., Single, Married, Partnered)" id="familyComposition" name="familyComposition" value={formData.familyComposition} onChange={handleChange('familyComposition')} />
            <InputField label="Number of Dependents" id="dependents" name="dependents" type="number" value={formData.dependents} onChange={handleChange('dependents')} />
          </div>
        </Section>

        <div className="mt-8 flex flex-col sm:flex-row justify-end items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            type="button"
            onClick={onNavigateToAssessor}
            className="w-full sm:w-auto bg-brand-secondary text-brand-primary font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-opacity-75 transition-colors duration-150 ease-in-out"
            aria-label="Go to Credit Risk Assessor Tool"
          >
            Go to Assessor
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto bg-brand-primary text-brand-secondary font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;
