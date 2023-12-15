/** @format */

import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import { supabase } from "../supabaseClient";
import { useSelection } from "../utils/SelectionContext";
import { useFilter } from "../utils/FilterContext";
import InfoCard from "../components/InfoCard";

interface Member {
  id: number;
  full_name: string;
  points: number;
  total_transactions: number;
  points_redeem: number;
  activated_campaigns: number;
  status: string;
}

export function Members() {
  const { filters: globalFilters } = useFilter();
  const [membersData, setMembersData] = useState<Member[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const itemsPerPage = 10;
  const [totalItems, setTotalItems] = useState(0);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [activeMembers, setActiveMembers] = useState(0);
  const [selectedRows, setSelectedRows] = useState<{ [key: number]: boolean }>(
    {}
  );

  useEffect(() => {
    const combinedFilters = { ...filters, ...globalFilters };
    setFilters(combinedFilters);
  }, [globalFilters]);

  const getMembers = async () => {
    const from = (currentPage - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    let query = supabase
      .from("profiles")
      .select("*", { count: "exact" })
      .range(from, to);

    Object.entries(filters).forEach(([key, value]) => {
      if (!value) return;
      if (key === "full_name" || key === "status") {
        query = query.ilike(key, `%${value}%`);
      } else {
        query = query.eq(key, isNaN(Number(value)) ? value : Number(value));
      }
    });

    const { data, error, count } = await query;
    setMembersData(data || []);
    setTotalItems(count || 0);
  };

  const getTotalActiveMembers = async () => {
    let { data, error, count } = await supabase
      .from("profiles")
      .select("*", { count: "exact" })
      .eq("status", "Active");

    setActiveMembers(count || 0);
  };

  useEffect(() => {
    // Call this function when the component mounts or filters change
    getTotalActiveMembers();
  }, [filters]);

  useEffect(() => {
    getMembers();
  }, [currentPage, searchInput, filters]);

  const handleSearchChange = (searchValue: string) => {
    setSearchInput(searchValue);
    setCurrentPage(1); // Reset to the first page when search changes
  };

  const generateRows = () => {
    return membersData.map((member) => ({
      Name: member.full_name,
      Points: member.points,
      "Total transactions": member.total_transactions,
      "Points redeem": member.points_redeem,
      "Activated campaigns": member.activated_campaigns,

      Status:
        member.status === "Active" ? (
          <span className="bg-[#EAFBD5] text-[#387D00] px-4 py-2 inline-flex text-sm leading-5 font-semibold rounded-lg">
            Active
          </span>
        ) : (
          <span className="bg-[#FBD7D5] text-[#D50000] px-4 py-2 inline-flex text-sm leading-5 font-semibold rounded-lg">
            Inactive
          </span>
        ),
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
      ? membersData.reduce((acc, _, index) => ({ ...acc, [index]: true }), {})
      : {};
    setSelectedRows(newSelectedRows);
  };

  const headers = [
    "Name",
    "Points",
    "Total transactions",
    "Points redeem",
    "Activated campaigns",
    "Status",
  ];

  const handleApplyFilter = (newFilters: Record<string, string>) => {
    setFilters(newFilters);
  };

  const handleRemoveFilter = (filterName: string) => {
    const newFilters = { ...filters };
    delete newFilters[filterName];
    setFilters(newFilters);
  };

  const handleClearAllFilters = () => {
    setFilters({});
  };

  return (
    <div className="mx-8 my-8">
      <div className="grid grid-cols-3 gap-4 pt-12">
        <InfoCard
          title="Total Members"
          data={totalItems}
          percentage={0} // Calculate this percentage based on your requirement
        />
        <InfoCard
          title="Total Active Members"
          data={activeMembers}
          percentage={0} // Calculate this percentage based on your requirement
        />
        <InfoCard
          title="Members with activity in the last 7 days"
          data={45} // Sample data
          percentage={8} // Sample data
        />
      </div>
      <Table
        headers={headers}
        rows={generateRows()}
        selectedRows={selectedRows}
        onSelectRow={handleSelectRow}
        onSelectAllRows={handleSelectAllRows}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        onPageChange={handlePageChange}
        onSearchChange={handleSearchChange}
        availableFilters={[
          "full_name",
          "status",
          "points",
          "total_transactions",
          "points_redeem",
          "activated_campaigns",
        ]}
        onApplyFilter={handleApplyFilter}
        onRemoveFilter={handleRemoveFilter}
        onClearAllFilters={handleClearAllFilters}
        showFilterPanel={showFilterPanel}
        initialFilterValues={filters}
      />
    </div>
  );
}
