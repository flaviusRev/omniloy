/** @format */

import React, { useState } from "react";
import { Select, Option, Input, Button } from "@material-tailwind/react";
import { ReactComponent as CloseIcon } from "./../assets/icons/close_icon.svg"; // Ensure you have this icon in your project
import { ReactComponent as SelectedFilterIcon } from "./../assets/icons/filter_selected_icon.svg"; // Ensure you have this icon in your project

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (filterDetails: FilterDetails) => void;
}

interface FilterDetails {
  selectedFilter: string;
  selectedAttribute: string;
  filterResults: string;
  description: string;
  // Add other fields as necessary...
}

const ToggleButton = ({ label, isActive, onClick }: any) => (
  <button
    className={`flex-1 ${
      isActive
        ? "bg-[#192245] text-white"
        : "bg-transparent border border-[#192245]"
    } py-2 px-4 rounded-full`}
    onClick={onClick}
  >
    {label}
  </button>
);

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<any>(null);
  const [selectedAttribute, setSelectedAttribute] = useState<string>("");
  const [filterResults, setFilterResults] = useState<string>("54 members");
  const [description, setDescription] = useState<string>("");
  const [operationType, setOperationType] = useState("AND");
  const [amountValue, setAmountValue] = useState<any>(0);
  const [minRange, setMinRange] = useState<any>(0);
  const [maxRange, setMaxRange] = useState<any>(0);

  const handleSave = () => {
    const filterDetails: FilterDetails = {
      selectedFilter,
      selectedAttribute,
      filterResults,
      description,
    };
    onSave(filterDetails);
    onClose();
  };

  if (!isOpen) return null;

  const mainContainerStyle =
    "relative w-full max-w-2xl p-8 bg-white rounded-lg shadow";

  // Adjust the range input container to distribute space evenly
  const rangeInputContainerStyle = "flex flex-row space-x-4 items-center";

  // Adjust individual range input style to take full width of its container
  const rangeInputStyle = "flex-1";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="relative w-full max-w-5xl p-8 bg-white rounded-lg shadow">
        <div className="flex justify-start items-center mb-4">
          <SelectedFilterIcon />
          <h3 className="text-xl font-semibold pl-4">Add Filter</h3>
          <CloseIcon
            onClick={onClose}
            className="cursor-pointer absolute top-2 right-2"
          />
        </div>

        <div className="flex justify-between items-center mb-6">
          <p className="mb-2 text-sm">
            Which customers do you want to target? Where do they live? How old
            are they? Filter them as you like.
          </p>
          <button
            className="bg-[#3E54AC] hover:bg-[#192245] text-white py-2 px-4 rounded-lg"
            onClick={() => console.log("use saved rewards")}
          >
            Use saved filters
          </button>
        </div>
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col space-y-4 w-1/2">
            <div className="flex flex-row justify-between space-x-4">
              <Select
                label="Filter"
                onChange={(e) => setSelectedFilter(e)}
                placeholder={undefined}
              >
                <Option value="Users">Users</Option>
              </Select>
              <Select
                label="Attribue"
                onChange={(e) => setSelectedFilter(e)}
                placeholder={undefined}
              >
                <Option value="Users">Users</Option>
              </Select>
            </div>
            <div className="flex flex-row justify-between space-x-4">
              <ToggleButton
                label="And"
                isActive={operationType === "AND"}
                onClick={() => setOperationType("AND")}
              />
              <ToggleButton
                label="Or"
                isActive={operationType === "OR"}
                onClick={() => setOperationType("OR")}
              />
            </div>
            <div className="flex flex-row justify-between space-x-4">
              <Select
                label="Filter"
                onChange={(e) => setSelectedFilter(e)}
                placeholder={undefined}
              >
                <Option value="Purchase amount">Purchase amount</Option>
              </Select>
              <Select
                onChange={(e) => setSelectedFilter(e)}
                placeholder={undefined}
              >
                <Option value="=">=</Option>
              </Select>
              <Input
                variant="standard"
                className="h-10 px-2 text-base bg-[#F6F6F6] border-b-[#192245]"
                label={"Amount"}
                onChange={(e) => setAmountValue(e)}
                crossOrigin={undefined}
              />
            </div>
            <div className="flex flex-row justify-between space-x-4">
              <ToggleButton
                label="And"
                isActive={operationType === "AND"}
                onClick={() => setOperationType("AND")}
              />
              <ToggleButton
                label="Or"
                isActive={operationType === "OR"}
                onClick={() => setOperationType("OR")}
              />
            </div>
            <div className={mainContainerStyle}>
              <div className="w-1/2">
                <Select
                  label="Filter"
                  onChange={(e) => setSelectedFilter(e)}
                  placeholder={undefined}
                >
                  <Option value="Age">Age</Option>
                </Select>
              </div>
              <div className={rangeInputContainerStyle}>
                <Input
                  variant="standard"
                  className={`${rangeInputStyle} px-2 h-10 text-base bg-[#F6F6F6] border-b-[#192245]`}
                  label={"Min Range"}
                  onChange={(e) => setMinRange(e.target.value)}
                  crossOrigin={undefined}
                />
                <Select
                  className={rangeInputStyle}
                  onChange={(e) => setSelectedFilter(e)}
                  placeholder={undefined}
                >
                  <Option value="<=>">{`<=>`}</Option>
                </Select>
                <Input
                  variant="standard"
                  className={`${rangeInputStyle} px-2 h-10 text-base bg-[#F6F6F6] border-b-[#192245]`}
                  label={"Max Range"}
                  onChange={(e) => setMaxRange(e.target.value)}
                  crossOrigin={undefined}
                />
              </div>
            </div>
            <div className="flex flex-row justify-between space-x-4">
              <Select
                label="Filter"
                onChange={(e) => setSelectedFilter(e)}
                placeholder={undefined}
              >
                <Option value="Members">Members</Option>
              </Select>
            </div>
          </div>
          <div className="flex flex-col space-y-4">RIGHT COLUMN </div>
        </div>

        {/* Buttons at the bottom */}
        <div className="flex items-center justify-end">
          <Button
            color="light-blue"
            onClick={handleSave}
            className="mr-4"
            placeholder={undefined}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
