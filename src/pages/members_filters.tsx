/** @format */

import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import { supabase } from "../supabaseClient";
import { useSelection } from "../utils/SelectionContext";

interface Member {
  id: number;
  name: string;
  active_campaigns: number;
}

export function MembersFilters() {
  const { selectedOption } = useSelection();
  const [membersData, setMembersData] = useState<Member[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const itemsPerPage = 10;
  const [totalItems, setTotalItems] = useState(0);
  const [selectedRows, setSelectedRows] = useState<{ [key: number]: boolean }>(
    {}
  );

  const getMembers = async (page: number, search: string) => {
    const from = (page - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;
    let query = supabase
      .from("member_type")
      .select("*", { count: "exact" })
      .range(from, to);

    if (search) {
      let searchQuery = "";

      // Check if the search term can be parsed as a number for active_campaigns
      const numericSearchTerm = parseInt(search, 10);
      if (!isNaN(numericSearchTerm)) {
        // Searching for active_campaigns as an integer
        searchQuery = `active_campaigns.eq.${numericSearchTerm}`;
      } else {
        // Searching for name as a string
        searchQuery = `name.ilike.%${search}%`;
      }

      query = query.or(searchQuery);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("ERROR MEMBERS: ", error);
    } else {
      setMembersData(data || []);
      setTotalItems(count || 0);
    }
  };

  useEffect(() => {
    getMembers(currentPage, searchInput);
  }, [currentPage, searchInput]);

  const handleSearchChange = (searchValue: string) => {
    setSearchInput(searchValue);
    setCurrentPage(1); // Reset to the first page when search changes
  };

  const generateRows = () => {
    return membersData.map((member) => ({
      "Customer Filter Name": member.name,
      Members: Math.floor(Math.random() * (10000 - 100 + 1)) + 100,
      Status:
        member.active_campaigns > 0 ? (
          <span className="bg-[#EAFBD5] text-[#387D00] px-4 py-2 inline-flex text-sm leading-5 font-semibold rounded-lg">
            Active
          </span>
        ) : (
          <span className="bg-[#FBD7D5] text-[#D50000] px-4 py-2 inline-flex text-sm leading-5 font-semibold rounded-lg">
            Inactive
          </span>
        ),
      "No. of active campaigns": member.active_campaigns,
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
    "Customer Filter Name",
    "Members",
    "Status",
    "No. of active campaigns",
  ];

  return (
    <div className="mx-8 my-8">
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
        onSearchChange={handleSearchChange}
      />
    </div>
  );
}
