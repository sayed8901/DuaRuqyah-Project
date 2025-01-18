"use client";

import { useEffect, useRef, useState } from "react";
import DuaCategorySidebar from "./CategorySidebar/DuaCategorySidebar";

export default function DuaPage({ duas, categories }) {
  const [duasList, setDuasList] = useState(duas || []);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const duaRefs = useRef({}); // Store refs for each dua card

  // Ensure categories are loaded before using them
  useEffect(() => {
    if (categories && categories.length > 0) {
      setSelectedCategory(categories[0]?.cat_id);
      setSelectedSubCategory(null); // Clear subcategory when category is selected
      setDuasList(duas || []);
    }
  }, [categories, duas]);

  // console.log("duas:", duasList);
  // console.log("categories:", categories);

  // Fetch Duas dynamically on category or subcategory change
  const fetchDuas = async (categoryId, subCategoryId = null) => {
    setLoading(true);
    setError(null);

    // loads the category data if there is no subCategoryId
    // otherwise, if there is a sub_category_id, it will load sub_category data
    try {
      const url = subCategoryId
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/dua_by_sub_category/${subCategoryId}`
        : `${process.env.NEXT_PUBLIC_API_BASE_URL}/dua_by_category/${categoryId}`;
      const response = await fetch(url);
      const data = await response.json();
      setDuasList(data);
    } catch (err) {
      setError("Error fetching duas. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle category selection
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubCategory(null); // Reset subcategory when a new category is selected
    fetchDuas(categoryId); // Fetch duas for the selected category
  };

  // Handle subcategory selection
  const handleSubCategorySelect = (subCategoryId) => {
    setSelectedSubCategory(subCategoryId);
    fetchDuas(selectedCategory, subCategoryId); // Fetch duas for the selected subcategory
  };

  // Scroll to the specific dua card
  const handleDuaClick = (duaId) => {
    setSelectedDuaId(duaId);
    duaRefs.current[duaId]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <div className="flex overflow-hidden">
      {/* Sidebar */}
      <DuaCategorySidebar
        categories={categories}
        selectedCategory={selectedCategory}
        selectedSubCategory={selectedSubCategory}
        onCategorySelect={handleCategoryClick}
        onSubCategorySelect={handleSubCategorySelect}
        onDuaSelect={handleDuaClick}
      />
    </div>
  );
}
