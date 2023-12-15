/** @format */

// DropdownItem.tsx
import React from "react";

const DropdownItem: React.FC<{
  label: string;
  onSelect: () => void;
  isSelected: boolean;
}> = ({ label, onSelect, isSelected }) => {
  return (
    <div
      onClick={onSelect}
      className={`pl-10 py-2 cursor-pointer text-sm ${
        isSelected ? "text-[#3E54AC]" : "text-[#0C1122]"
      }`}
    >
      {label}
    </div>
  );
};

export default DropdownItem;
