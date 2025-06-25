
import React from 'react';

interface SelectFieldProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  required?: boolean;
  helpText?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  id,
  name,
  value,
  onChange,
  options,
  required = false,
  helpText
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-200 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-gray-100 bg-gray-700 border border-brand-secondary focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm rounded-md"
      >
        {options.map(option => (
          <option key={option} value={option} className="text-black bg-white"> {/* Ensure dropdown options are readable */}
            {option}
          </option>
        ))}
      </select>
      {helpText && <p className="mt-1 text-xs text-gray-400">{helpText}</p>}
    </div>
  );
};

export default SelectField;