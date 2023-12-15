/** @format */

import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import { supabase } from "../supabaseClient";
import { useSelection } from "./../utils/SelectionContext";

interface Transaction {
  id: number;
  name: string;
  item_count: number;
  member_name: string;
  time: string; // Assuming ISO string format for timestamp
  price: number;
  product_id: number;
}

export function Transactions() {
  const { selectedOption } = useSelection();
  const [transactionsData, setTransactionsData] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const itemsPerPage = 10;
  const [totalItems, setTotalItems] = useState(0);

  const getTransactions = async (page: number, search: string) => {
    const from = (page - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;
    let query = supabase
      .from("transactions")
      .select("*", { count: "exact" })
      .range(from, to);

    if (search) {
      const searchQuery = buildOrSearchQuery(
        ["name", "member_name", "item_count", "price", "product_id"],
        search
      );
      query = query.or(searchQuery);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("ERROR TRANSACTIONS: ", error);
    } else {
      setTransactionsData(data || []);
      setTotalItems(count || 0);
    }
  };

  const buildOrSearchQuery = (fields: string[], searchTerm: string): string => {
    return fields
      .map((field) => {
        if (["item_count", "price", "product_id"].includes(field)) {
          // Handle numeric fields
          const numericValue = Number(searchTerm);
          return !isNaN(numericValue) ? `${field}.eq.${numericValue}` : "";
        } else {
          // Handle text fields
          return `${field}.ilike.%${searchTerm}%`;
        }
      })
      .filter((queryPart) => queryPart)
      .join(",");
  };
  useEffect(() => {
    getTransactions(currentPage, searchInput);
  }, [currentPage, searchInput]);

  const formatProductId = (id: number) => {
    return id.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const formatPrice = (price: number) => {
    return price.toFixed(2).replace(".", ",");
  };

  const generateRows = () => {
    return transactionsData.map((transaction) => ({
      "Transaction Name": transaction.name,
      "Item Count": transaction.item_count,
      "Member Name": transaction.member_name,
      Time: transaction.time,
      Price: `R$ ${formatPrice(transaction.price)}`,
      "Product ID": formatProductId(transaction.product_id),
    }));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (searchValue: string) => {
    setSearchInput(searchValue);
    setCurrentPage(1);
  };

  const headers = [
    "Transaction Name",
    "Item Count",
    "Member Name",
    "Time",
    "Price",
    "Product ID",
  ];

  return (
    <div className="mx-8 my-8">
      <Table
        title={selectedOption}
        headers={headers}
        rows={generateRows()}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        onPageChange={handlePageChange}
        onSearchChange={handleSearchChange}
      />
    </div>
  );
}
