import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import {
  getAllDuasByCategoryID,
  getAllSubCategoriesByCategoryID,
} from "@/utilities/dataFetch";

import DuaDetailsSection from "./DuaDetailsSection";
import CategoryList from "./CategoryList";
import SearchCategory from "./SearchCategory";

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

  const handleDuaClick = (duaId) => {
    setSelectedDua(duaId);
    const duaElement = duaRefs.current[duaId];
    if (duaElement) {
      duaElement.scrollIntoView({ behavior: "smooth", block: "start" });
      const offset = 80;
      window.scrollBy(0, -offset);
    }
  };

  return (
    // main part
    <div className="flex">
      <div className="w-96 h-[83vh] bg-white rounded-2xl flex flex-col">
        <div className="text-lg font-semibold text-center bg-primary text-white p-4 mb-2 rounded-t-2xl flex justify-between items-center gap-12">
          <h1>Categories</h1>
          {/* search field in small screen */}
          <div className="visible lg:hidden">
            <SearchCategory
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
        </div>

        {/* search field in big screen */}
        <div className="hidden lg:block m-4">
          <SearchCategory
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
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
