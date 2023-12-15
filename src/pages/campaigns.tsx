/** @format */

import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import { supabase } from "../supabaseClient";
import { useSelection } from "./../utils/SelectionContext";

interface Campaign {
  id: number;
  name: string;
  start_date: Date;
  budget: number;
  status: string;
}

interface FilterBoxProps {
  label: string;
  count: number;
  isSelected: boolean;
  onSelect: () => void;
}

type FilterCounts = {
  total: number;
  draft: number;
  disabled: number;
  scheduled: number;
  active: number;
  inactive: number;
};
const FilterBox: React.FC<FilterBoxProps> = ({
  label,
  count,
  isSelected,
  onSelect,
}) => (
  <div
    className={`flex flex-col justify-start items-start p-4 border rounded-lg cursor-pointer w-full ${
      isSelected ? "bg-[#ECEEF7] border-[#ECEEF7]" : "bg-white border-gray-300"
    }`}
    onClick={onSelect}
  >
    <div className="flex justify-between items-center w-full">
      <span className="text-sm font-medium">{label}</span>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onSelect} // Toggles selection on change
        className="form-checkbox text-blue-500 h-5 w-5"
      />
    </div>
    <div className="font-bold text-3xl mt-2 w-full text-left">{count}</div>
  </div>
);

export function Campaigns() {
  const { selectedOption } = useSelection();
  const [campaignsData, setCampaignsData] = useState<Campaign[]>([]);
  const [selectedRows, setSelectedRows] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalItems, setTotalItems] = useState(0);

  const [filters, setFilters] = useState<FilterCounts>({
    total: 0,
    draft: 0,
    disabled: 0,
    scheduled: 0,
    active: 0,
    inactive: 0,
  });
  const [currentFilter, setCurrentFilter] = useState("");

  const getCampaigns = async (page: number, filter: string) => {
    const from = (page - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;
    let query = supabase.from("campaigns").select("*", { count: "exact" });

    // If a filter is selected, use it in the query
    if (filter && filter !== "total") {
      query = query.eq(
        "status",
        filter.charAt(0).toUpperCase() + filter.slice(1)
      );
    }

    // If no filter is selected, don't apply any filter to the query
    const { data, error, count } = await query.range(from, to);

    if (error) {
      console.error("ERROR CAMPAIGNS: ", error);
    } else {
      setCampaignsData(data || []);
      setTotalItems(count || 0);
    }
  };

  const fetchFilterCounts = async () => {
    const statusCounts = {
      total: 0,
      draft: 0,
      disabled: 0,
      scheduled: 0,
      active: 0,
      inactive: 0,
    };

    // Fetch the total count of campaigns
    const { count: totalCount, error: totalError } = await supabase
      .from("campaigns")
      .select("*", { count: "exact" });

    if (totalError) {
      console.error("ERROR FETCHING TOTAL COUNT: ", totalError);
      return;
    }
    statusCounts["total"] = totalCount || 0;

    // Fetch counts for each status category
    const statuses: (keyof typeof statusCounts)[] = [
      "draft",
      "disabled",
      "scheduled",
      "active",
      "inactive",
    ];
    for (const status of statuses) {
      const { count, error } = await supabase
        .from("campaigns")
        .select("*", { count: "exact" })
        .eq("status", status.charAt(0).toUpperCase() + status.slice(1));

      if (error) {
        console.error(`ERROR FETCHING ${status.toUpperCase()} COUNT: `, error);
      } else {
        statusCounts[status] = count || 0; // Status is now a known key of statusCounts
      }
    }

    setFilters(statusCounts as any);
  };

  useEffect(() => {
    getCampaigns(currentPage, currentFilter);
    fetchFilterCounts();
  }, [currentPage, currentFilter]);

  const handleSelectFilter = (filter: string) => {
    // If the current filter is already selected, deselect it
    if (currentFilter === filter) {
      setCurrentFilter("");
    } else {
      setCurrentFilter(filter);
    }
    setCurrentPage(1); // Reset to page 1 when filter changes
  };

  const filterOptions = [
    "total",
    "draft",
    "disabled",
    "scheduled",
    "active",
    "inactive",
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatBudget = (budget: number) => {
    return budget.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const generateRows = () => {
    return campaignsData.map((campaign) => ({
      "Campaign Name": campaign.name,
      "Start Date": formatDate(new Date(campaign.start_date)),
      Budget: `$ ${formatBudget(campaign.budget)}`,
      Status: campaign.status,
    }));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEdit = (rowData: any) => {
    // Handle edit
    console.log("Edit row:", rowData);
  };

  const handleDelete = (rowData: any) => {
    // Handle delete
    console.log("Delete row:", rowData);
  };

  const handleSelectRow = (index: number) => {
    setSelectedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleSelectAllRows = (isSelected: boolean) => {
    const newSelectedRows = isSelected
      ? campaignsData.reduce((acc, _, index) => ({ ...acc, [index]: true }), {})
      : {};
    setSelectedRows(newSelectedRows);
  };

  const headers = ["Campaign Name", "Start Date", "Budget", "Status"];

  return (
    <div className="mx-8 my-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 pt-8">
        {filterOptions.map((filterKey) => {
          const filter = filterKey as keyof FilterCounts;

          return (
            <FilterBox
              key={filter}
              label={filter.charAt(0).toUpperCase() + filter.slice(1)}
              count={filters[filter]}
              isSelected={currentFilter === filter}
              onSelect={() => handleSelectFilter(filter)}
            />
          );
        })}
      </div>
      <Table
        title={selectedOption}
        headers={headers}
        rows={generateRows()}
        selectedRows={selectedRows}
        onSelectRow={handleSelectRow}
        onSelectAllRows={handleSelectAllRows}
        onEdit={handleEdit}
        onDelete={handleDelete}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
