import { useEffect, useRef, useState } from "react";
import {
  getAllDuasByCategoryID,
  getAllSubCategoriesByCategoryID,
} from "@/utilities/dataFetch";

import DuaDetailsSection from "./DuaDetailsSection";
import CategoryList from "./CategoryList";
import SearchCategory from "./SearchCategory";
import { useAppContext } from "@/contexts/ContextProvider";

export default function DuaCategorySidebar({
  categories,
  selectedCategory,
  onCategorySelect,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [duaCounts, setDuaCounts] = useState({});
  const [duasByCategory, setDuasByCategory] = useState({});
  const [subCategoriesByCategory, setSubCategoriesByCategory] = useState({});
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedSubCategory, setExpandedSubCategory] = useState(null);
  const [selectedDua, setSelectedDua] = useState(null);
  const [sectionTitle, setSectionTitle] = useState("");
  const duaRefs = useRef({});
  const sectionRef = useRef(null);

  // Access sidebar state from the context
  const { isSidebarOpen, setSidebarOpen } = useAppContext();

  // Track the position to scroll to the section title
  const [scrollToSection, setScrollToSection] = useState(false);

  useEffect(() => {
    const fetchDuaData = async () => {
      const counts = {};
      const duasData = {};
      const subCategoriesData = {};

      for (const category of categories) {
        const duas = await getAllDuasByCategoryID(category.id);
        counts[category.id] = duas.length;
        duasData[category.id] = duas;

        const subCategories = await getAllSubCategoriesByCategoryID(
          category.id
        );
        subCategoriesData[category.id] = subCategories;
      }

      setDuaCounts(counts);
      setDuasByCategory(duasData);
      setSubCategoriesByCategory(subCategoriesData);
    };

    fetchDuaData();
  }, [categories]);

  const handleCategoryClick = (categoryId) => {
    if (duaCounts[categoryId] === 0) return; // Prevent clicking if no duas are present

    const selectedCategoryName = categories.find(
      (category) => category.id === categoryId
    )?.cat_name_en;

    const subCategories = subCategoriesByCategory[categoryId] || [];
    const firstSubCategoryName =
      subCategories[0]?.subcat_name_en || selectedCategoryName;

    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    setExpandedSubCategory(null); // Reset expanded subcategory
    onCategorySelect(categoryId);

    // Update section title to the first subcategory or category name
    setSectionTitle(firstSubCategoryName);
    setScrollToSection(true);

    if (sectionRef.current) {
      setTimeout(() => {
        sectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        const offset = 80; // Adjustment for fixed headers
        window.scrollBy(0, -offset);
      }, 100); // Ensure smooth scroll effect
    }
  };

  const handleSubCategoryClick = (subCategoryId, subCategoryName) => {
    // Update section title and trigger scroll
    setSectionTitle(subCategoryName);
    setScrollToSection(true);

    // Set expanded state for the subcategory
    setExpandedSubCategory(
      expandedSubCategory === subCategoryId ? null : subCategoryId
    );

    // Find the first Dua in the selected subcategory
    const categoryDuas = duasByCategory[selectedCategory] || [];
    const firstDua = categoryDuas.find(
      (dua) => dua.subcat_id === subCategoryId
    );

    if (firstDua && duaRefs.current[firstDua.id]) {
      // Delay the scroll to Dua to ensure section title is updated
      setTimeout(() => {
        duaRefs.current[firstDua.id].scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        const offset = 80; // Adjustment for fixed headers
        window.scrollBy(0, -offset);
      }, 200); // Delay ensures the section title scroll completes
    }
  };

  const handleDuaClick = (duaId) => {
    setSelectedDua(duaId);
    const duaElement = duaRefs.current[duaId];
    if (duaElement) {
      duaElement.scrollIntoView({ behavior: "smooth", block: "start" });
      const offset = 80;
      window.scrollBy(0, -offset);
    }

    // Close the sidebar overlay after clicking a Dua
    toggleSidebar();
  };

  // Toggle Sidebar Visibility
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    // main part
    <div className="flex">
      {/* Sidebar component that can toggle visibility */}
      <div
        className={`w-72 lg:w-96 h-full md:h-[73vh] lg:h-[80vh] xl:h-[82vh] bg-white rounded-2xl flex flex-col transition-all overflow-y-auto ${
          isSidebarOpen
            ? "fixed inset-0 md:hidden bg-white z-50"
            : "hidden md:block"
        }`}
      >
        {/* Fixed Header */}
        <div className="sticky top-0 bg-white z-10 xl:pb-1">
          <div className="text-lg font-semibold text-center bg-primary text-white p-4 mb-2 rounded-t-2xl flex justify-between items-center gap-4 sm:gap-16">
            <h1 className="text-center">Categories</h1>

            {/* search field in small screen */}
            <div className="visible xl:hidden">
              <SearchCategory
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </div>
          </div>

          {/* search field in big screen */}
          <div className="hidden xl:block m-4">
            <SearchCategory
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
        </div>

        {/* CategoryList component */}
        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          subCategoriesByCategory={subCategoriesByCategory}
          handleCategoryClick={handleCategoryClick}
          handleSubCategoryClick={handleSubCategoryClick}
          expandedCategory={expandedCategory}
          expandedSubCategory={expandedSubCategory}
          duaCounts={duaCounts}
          duasByCategory={duasByCategory}
          searchTerm={searchTerm}
          selectedDua={selectedDua}
          handleDuaClick={handleDuaClick}
        />
      </div>

      {/* Overlay for small screen */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* DuaDetailsSection component */}
      <DuaDetailsSection
        sectionTitle={sectionTitle}
        sectionRef={sectionRef}
        selectedCategory={selectedCategory}
        duasByCategory={duasByCategory}
        duaRefs={duaRefs}
      ></DuaDetailsSection>
    </div>
  );
}
