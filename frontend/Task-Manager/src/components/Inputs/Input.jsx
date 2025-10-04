import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { HiOutlineExclamationCircle } from "react-icons/hi2";

const Input = ({ value, onChange, label, placeholder, type, error, required = false }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-1">
        {label}
        {required && <span className="text-error-500">*</span>}
      </label>

      <div className={`input-box relative ${error ? 'border-error-500 focus-within:ring-error-500 focus-within:border-error-500' : ''} ${isFocused ? 'ring-2 ring-primary-500 border-primary-500' : ''}`}>
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-neutral-900 dark:text-dark-text placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
          value={value}
          onChange={(e) => onChange(e)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {type === "password" && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
            onClick={toggleShowPassword}
          >
            {showPassword ? (
              <FaRegEye size={20} />
            ) : (
              <FaRegEyeSlash size={20} />
            )}
          </button>
        )}

        {error && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-error-500">
            <HiOutlineExclamationCircle size={20} />
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs text-error-600 dark:text-error-400 flex items-center gap-1">
          <HiOutlineExclamationCircle size={14} />
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
