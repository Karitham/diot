import React, { useState } from 'react';
import '../styles/compo/MultiSelectDropdown.css';

type Option = {
  value: string;
  label: string;
};

type MultiSelectDropdownProps = {
  options: Option[];
  selectedValues: string[];
  onChange: (selectedValues: string[]) => void;
  closedLabel: string;
};

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
  selectedValues,
  onChange,
  closedLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionToggle = (optionValue: string) => {
    const updatedValues = [...selectedValues];
    const index = updatedValues.indexOf(optionValue);

    if (index !== -1) {
      updatedValues.splice(index, 1);
    } else {
      updatedValues.push(optionValue);
    }

    onChange(updatedValues);
  };

  return (
    <div className={`dropdown-container ${isOpen ? 'open' : ''}`}>
      <div className="dropdown-header" onClick={handleToggleDropdown}>
        <span>
          {selectedValues.length > 0
            ? `${selectedValues.length} selected`
            : closedLabel}
        </span>
        <span className="dropdown-icon">{isOpen ? '-' : '+'}</span>
      </div>
      {isOpen ? (
        <ul className="dropdown-options">
          {options.map((option) => (
            <li
              key={option.value}
              className={`dropdown-option-singulier ${
                selectedValues.includes(option.value) ? 'selected' : ''
              }`}
              onClick={() => handleOptionToggle(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default MultiSelectDropdown;
