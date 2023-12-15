/** @format */

// PopupToolInput.tsx
import React, { useState, useEffect } from "react";

interface PopupToolInputProps {
  isVisible: boolean;
  initialValue: string;
  title: string;
  onConfirm: (value: string) => void;
  onCancel: () => void;
}

const PopupToolInput: React.FC<PopupToolInputProps> = ({
  isVisible,
  initialValue,
  title,
  onConfirm,
  onCancel,
}) => {
  const [inputValue, setInputValue] = useState(initialValue);

  useEffect(() => {
    if (initialValue !== inputValue) {
      setInputValue(initialValue);
    }
  }, [initialValue, inputValue]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-xl">{title}</h2>
        <textarea
          className="w-full p-2 my-2 border border-gray-300 rounded"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        ></textarea>
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600 focus:outline-none focus:ring"
            onClick={() => onCancel()}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600 focus:outline-none focus:ring"
            onClick={() => onConfirm(inputValue)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupToolInput;
