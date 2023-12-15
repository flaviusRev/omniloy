/** @format */

// Table.tsx
import React, { useEffect, useState } from "react";
import { PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { ReactComponent as FiltersIcon } from "./../assets/icons/filters_icon.svg";
import { ReactComponent as SearchIcon } from "./../assets/icons/search_icon.svg";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

interface TableProps {
  title?: string;
  headers: string[];
  rows: { [key: string]: React.ReactNode }[];
  selectedRows?: { [key: number]: boolean };
  onSelectRow?: (index: number) => void;
  onSelectAllRows?: (isSelected: boolean) => void;
  onEdit?: (rowData: { [key: string]: React.ReactNode }) => void;
  onDelete?: (rowData: { [key: string]: React.ReactNode }) => void;
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onSearchChange?: (searchValue: string) => void;
  availableFilters?: string[]; // Names of available filters
  onApplyFilter?: (filters: Record<string, string>) => void;
  onRemoveFilter?: (filterName: string) => void;
  onClearAllFilters?: () => void;
  showFilterPanel?: boolean; // new prop to control the visibility of the filter panel
  initialFilterValues?: Record<string, string>; // new prop for initial filter values
}

const Table: React.FC<TableProps> = ({
  title,
  headers,
  rows,
  selectedRows = {},
  onSelectRow,
  onSelectAllRows,
  onEdit,
  onDelete,
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
  onSearchChange,
  availableFilters = [],
  onApplyFilter,
  onClearAllFilters,
  onRemoveFilter,
  showFilterPanel,
  initialFilterValues = {},
}) => {
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (filterName: string, value: string) => {
    setFilterValues({ ...filterValues, [filterName]: value });
  };

  useEffect(() => {
    setFilterValues(initialFilterValues);
    const areFiltersActive = Object.keys(initialFilterValues).length > 0;
    setShowFilters(areFiltersActive);
  }, [initialFilterValues]);

  useEffect(() => {
    if (showFilterPanel) {
      setShowFilters(true);
    } else {
      setShowFilters(false);
    }
  }, [showFilterPanel]);
  const resetFilter = (filterName: string) => {
    setFilterValues((prev) => {
      const newFilters = { ...prev, [filterName]: "" };
      // Apply all filters after resetting the specific one
      if (onApplyFilter) {
        onApplyFilter(newFilters);
      }
      return newFilters;
    });
  };

  // Function to apply a filter
  const applyAllFilters = () => {
    if (onApplyFilter) {
      onApplyFilter(filterValues);
    }
  };

  const clearAllFilters = () => {
    if (onClearAllFilters) {
      onClearAllFilters();
    }
    setFilterValues({});
  };

  selectedRows = selectedRows || {};
  const allSelected =
    Object.keys(selectedRows).length === rows.length && rows.length > 0;

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const rangeStart = (currentPage - 1) * itemsPerPage + 1;
  const rangeEnd = Math.min(currentPage * itemsPerPage, totalItems);

  const renderCheckbox = (
    checked: boolean,
    onChange: () => void,
    isInHeader: boolean = false
  ) => (
    <div
      className={`relative rounded border-[1px] ${
        isInHeader ? "border-black" : "border-[#0C1122]"
      } w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:${
        isInHeader ? "border-black" : "border-[#0C1122]"
      }`}
    >
      <input
        type="checkbox"
        className="opacity-0 absolute rounded-lg"
        checked={checked}
        onChange={onChange}
      />
      {checked && (
        <svg
          className={`fill-current visible w-4 h-4 ${
            isInHeader ? "text-black" : "text-[#0C1122]"
          } pointer-events-none`}
          viewBox="0 0 20 20"
        >
          <path d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" />
        </svg>
      )}
    </div>
  );

  return (
    <>
      <div className="pt-4">
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>
      <div className="flex justify-start items-center mb-[1.5rem] mt-[2rem]">
        <div className="flex items-center  text-[#3E54AC] px-4 py-2 rounded-lg border border-black w-[17.5rem] mr-6">
          <SearchIcon className="h-5 w-5 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent text-[#3E54AC] outline-none w-full"
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          />
        </div>
        <button
          className="flex items-center px-4 py-2 rounded-lg border border-black"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FiltersIcon className="h-5 w-5 mr-2" />
          Filters
        </button>
      </div>
      {showFilters && (
        <div className="flex items-center mb-4">
          {availableFilters.map((filterName) => (
            <div key={filterName} className="relative mr-2">
              <input
                type="text"
                placeholder={`${filterName}`}
                value={filterValues[filterName] || ""}
                onChange={(e) => handleFilterChange(filterName, e.target.value)}
                className="pl-4 pr-10 py-2 border border-black rounded-lg w-32"
              />
              {filterValues[filterName] && (
                <button
                  onClick={() => resetFilter(filterName)}
                  className="absolute inset-y-0 right-0 px-3 flex items-center"
                >
                  <XMarkIcon className="h-4 w-4 text-red-500" />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={applyAllFilters}
            className="flex items-center px-4 py-2 rounded-lg border border-black ml-2"
          >
            Apply
          </button>
          <button
            onClick={clearAllFilters}
            className="flex items-center px-4 py-2 rounded-lg border border-black text-red-500 ml-4"
          >
            Clear All
          </button>
        </div>
      )}
      <div className="overflow-x-auto relative sm:rounded-xl">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-sm bg-[#ECEEF7] text-black font-normal">
            <tr>
              <th
                scope="col"
                className="py-3 px-6"
                style={{ background: "transparent" }}
              >
                {onSelectAllRows &&
                  renderCheckbox(
                    allSelected,
                    () => onSelectAllRows(!allSelected),
                    true
                  )}
              </th>

              {headers.map((header, index) => (
                <th
                  key={index}
                  scope="col"
                  className={`py-3 px-6 ${
                    index === 0 ? "text-left" : "text-center"
                  }`}
                >
                  {header}
                </th>
              ))}
              <th scope="col" className="py-3 px-6 text-center"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="bg-white border-b text-base text-black font-medium"
              >
                <td className="py-4 px-6 text-left">
                  {onSelectRow &&
                    renderCheckbox(selectedRows[rowIndex] || false, () =>
                      onSelectRow(rowIndex)
                    )}
                </td>

                {headers.map((header, headerIndex) => (
                  <td
                    key={headerIndex}
                    className={`py-4 px-6 ${
                      headerIndex === 0 ? "text-left" : "text-center"
                    }`}
                  >
                    {row[header]}
                  </td>
                ))}
                <td className="py-4 px-6 flex justify-center space-x-3">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(row)}
                      className="text-black hover:underline mr-2"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(row)}
                      className="text-black hover:underline"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="py-2 px-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
          <div className="flex items-center">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className={`p-1 rounded-full ${
                currentPage <= 1
                  ? "text-gray-300"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => onPageChange(number)}
                className={`px-2 py-1 ${
                  currentPage === number
                    ? "text-white bg-[#3E54AC]"
                    : "text-black"
                } rounded-lg mx-1`}
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className={`p-1 rounded-full ${
                currentPage >= totalPages
                  ? "text-gray-300"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
          <span className="text-xs font-medium mt-2 text-black">
            {`${rangeStart}-${rangeEnd} of ${totalItems} results`}
          </span>
        </div>
      </div>
    </>
  );
};

export default Table;
