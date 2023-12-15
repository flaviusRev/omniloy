/** @format */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ArrowDownIcon } from "./../assets/icons/arrow_down_icon.svg";
import omniloyLogo from "./../assets/icons/omniloy_logo.svg";
import { useSelection } from "./../utils/SelectionContext";
import DropdownItem from "./DropdownItem";
import { sidebarOptions, staticOptions } from "./../utils/sidebarOptions";

interface SidebarOption {
  label: string;
  Icon: React.ElementType;
  selected?: boolean;
  arrowDown?: boolean;
  path?: string;
  dropdownOptions?: SidebarDropdownOption[];
}

interface SidebarItemProps extends SidebarOption {
  onSelect: () => void;
  isOpen?: boolean;
  toggleDropdown?: () => void;
  children?: React.ReactNode; // Children prop
}

interface SidebarDropdownOption {
  label: string;
  path: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  Icon,
  selected,
  onSelect,
  arrowDown = false,
  isOpen,
  toggleDropdown,
  children,
}) => {
  const iconClasses = selected ? "text-[#3E54AC]" : "text-[#0C1122]";

  const selectedItemStyle = selected
    ? "bg-[#ECEEF7] text-[#3E54AC]"
    : "text-[#0C1122]";

  return (
    <>
      <div
        className={`flex justify-between items-center rounded-[8px] p-2 mb-6 cursor-pointer ${selectedItemStyle}`}
        onClick={() => {
          if (arrowDown) {
            toggleDropdown?.();
          } else {
            onSelect();
          }
        }}
      >
        <div className="flex items-center">
          <Icon className={`w-6 h-6 ${iconClasses}`} />
          <span className="ml-3 text-sm">{label}</span>
        </div>
        {arrowDown && (
          <ArrowDownIcon
            className={`w-4 h-4 transition-transform ${iconClasses} ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        )}
      </div>
      {children}
    </>
  );
};

const Sidebar: React.FC = () => {
  const { selectedOption, setSelectedOption } = useSelection();
  const navigate = useNavigate();

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const handleSelect = (
    label: string,
    path?: string,
    isMainOption: boolean = false
  ) => {
    setSelectedOption(label);
    if (path) {
      navigate(path);
    }
    if (isMainOption) {
      setOpenDropdown(null);
    }
  };

  const isOptionSelected = (option: SidebarOption) => {
    if (selectedOption === option.label) {
      return true;
    }

    if (option.arrowDown) {
      return (
        option.dropdownOptions?.some(
          (dropdownOption) => selectedOption === dropdownOption.label
        ) ?? false
      );
    }

    return false;
  };
  const renderDropdown = (option: SidebarOption) => {
    return (
      option.dropdownOptions?.map((dropdownOption: SidebarDropdownOption) => (
        <DropdownItem
          key={dropdownOption.label}
          label={dropdownOption.label}
          onSelect={() =>
            handleSelect(dropdownOption.label, dropdownOption.path)
          }
          isSelected={selectedOption === dropdownOption.label}
        />
      )) || null
    );
  };

  return (
    <div className="flex flex-col w-auto h-screen bg-white rounded-r-[20px] p-10 flex-shrink-0 justify-between shadow-lg">
      <div>
        <div className="flex-shrink-0 mb-[2.5rem]">
          <img src={omniloyLogo} alt="Omniloy Logo" className="w-auto h-full" />
        </div>
        {sidebarOptions.map((option) => (
          <SidebarItem
            key={option.label}
            label={option.label}
            Icon={option.Icon}
            selected={isOptionSelected(option)}
            onSelect={() => handleSelect(option.label, option.path, true)}
            arrowDown={option.arrowDown}
            isOpen={openDropdown === option.label}
            toggleDropdown={() => toggleDropdown(option.label)}
          >
            {option.arrowDown && openDropdown === option.label
              ? renderDropdown(option)
              : null}
          </SidebarItem>
        ))}
        {staticOptions.map((option) => (
          <SidebarItem
            key={option.label}
            label={option.label}
            Icon={option.Icon}
            selected={selectedOption === option.label}
            onSelect={() => handleSelect(option.label, option.path, true)}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
