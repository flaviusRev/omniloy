/** @format */

import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import { supabase } from "../supabaseClient";
import { useSelection } from "./../utils/SelectionContext";
import { useFilter } from "../utils/FilterContext";

interface Product {
  id: number;
  name: string;
  product_id: number;
  image: string | null;
  category_name: string;
  price: number;
}

export function Products() {
  const { filters: globalFilters } = useFilter();
  const { selectedOption } = useSelection();
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const itemsPerPage = 10;
  const [totalItems, setTotalItems] = useState(0);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  useEffect(() => {
    const areFiltersActive = Object.keys(filters).length > 0;
    setShowFilterPanel(areFiltersActive);
  }, [filters]);

  useEffect(() => {
    const combinedFilters = { ...filters, ...globalFilters };
    setFilters(combinedFilters);
  }, [globalFilters]);

  const getProducts = async () => {
    const from = (currentPage - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    let query = supabase
      .from("products")
      .select("*", { count: "exact" })
      .range(from, to);

    Object.entries(filters).forEach(([key, value]) => {
      switch (key) {
        case "name":
          query = query.ilike("name", `%${value}%`);
          break;
        case "category_name":
          query = query.ilike("category_name", `%${value}%`);
          break;
        case "price":
          query = query.eq("price", parseFloat(value));
          break;
        case "product_id":
          query = query.eq("product_id", parseInt(value, 10));
          break;
        default:
          break;
      }
    });

    const { data, error, count } = await query;
    if (error) {
      console.error("ERROR PRODUCTS:", error);
      return;
    }
    setProductsData(data || []);
    setTotalItems(count || 0);
  };

  useEffect(() => {
    getProducts();
  }, [currentPage, searchInput, filters]);

  const formatProductId = (id: number) => {
    return id.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const formatPrice = (price: number) => {
    return price.toFixed(2).replace(".", ",");
  };

  const generateRows = () => {
    return productsData.map((product) => ({
      "Product Name": product.name,
      "Product ID": formatProductId(product.product_id),
      "Product Photo": product.image,
      "Category Name": product.category_name,
      Price: `R$ ${formatPrice(product.price)}`,
    }));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (searchValue: string) => {
    setSearchInput(searchValue);
    setCurrentPage(1);
  };

  const handleApplyFilter = (newFilters: Record<string, string>) => {
    setFilters(newFilters);
  };

  const handleRemoveFilter = (filterName: string) => {
    const newFilters = { ...filters };
    delete newFilters[filterName];
    setFilters(newFilters);
    getProducts();
  };

  const handleClearAllFilters = () => {
    setFilters({});
  };

  const headers = [
    "Product Name",
    "Product ID",
    "Product Photo",
    "Category Name",
    "Price",
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
        availableFilters={["name", "category_name"]}
        onApplyFilter={handleApplyFilter}
        onRemoveFilter={handleRemoveFilter}
        onClearAllFilters={handleClearAllFilters}
        showFilterPanel={showFilterPanel}
        initialFilterValues={filters}
      />
    </div>
  );
}
