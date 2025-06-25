
import React from 'react';

interface InputFieldProps {
  label: string;
  id: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  helpText?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  helpText,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-200 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-brand-secondary rounded-md shadow-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
      />
      {helpText && <p className="mt-1 text-xs text-gray-400">{helpText}</p>}
    </div>
  );
};

export default InputField;