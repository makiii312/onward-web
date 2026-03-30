import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '../Icons';

type PasswordInputProps = {
  label: string;
  placeholder?: string;
  required?: boolean;
};

const PasswordInput = ({
  label,
  placeholder = '',
  required = false,
}: PasswordInputProps) => {
  const [isPasswordDisplayed, setPasswordDisplay] = useState(false);

  const placeholderMessage = placeholder || `Enter ${label.toLowerCase()}`;

  const togglePassword = () => {
    setPasswordDisplay(!isPasswordDisplayed);
  };

  return (
    <div className="w-full">
      <label className="w-full text-xs font-semibold text-gray-800">
        {label}
        {required && <span>*</span>}
      </label>

      <div className="relative">
        <input
          id="password"
          type={isPasswordDisplayed ? 'text' : 'password'}
          placeholder={placeholderMessage}
          className="w-full bg-grey-25 border-2 border-gray-100 rounded-md px-2 py-1"
        />

        <button
          type="button"
          onClick={() => togglePassword()}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
        >
          {isPasswordDisplayed ? <EyeSlashIcon /> : <EyeIcon />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
