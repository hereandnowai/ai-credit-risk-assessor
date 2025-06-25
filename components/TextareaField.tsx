
import React from 'react';

interface TextareaFieldProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  helpText?: string;
}

const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  id,
  name,
  value,
  onChange,
  placeholder,
  rows = 3,
  required = false,
  helpText
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-200 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-brand-secondary rounded-md shadow-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
      />
      {helpText && <p className="mt-1 text-xs text-gray-400">{helpText}</p>}
    </div>
  );
};

export default TextareaField;