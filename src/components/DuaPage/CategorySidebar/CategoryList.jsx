import { useAppContext } from "@/contexts/ContextProvider";
import React from "react";

const CategoryList = ({
  categories,
  selectedCategory,
  subCategoriesByCategory,
  handleCategoryClick,
  handleSubCategoryClick,
  expandedCategory,
  expandedSubCategory,
  duaCounts,
  duasByCategory,
  searchTerm,
  selectedDua,
  handleDuaClick,
}) => {
  const { language } = useAppContext();

  const filteredCategories = categories.filter((category) =>
    category.cat_name_en.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto px-4 mb-10">
      {filteredCategories.map((category) => {
        const subCategories = subCategoriesByCategory[category.id] || [];

        return (
          <div key={category.id}>
            <div
              className={`p-2 my-2 cursor-pointer rounded-lg transition flex justify-start items-center gap-2 ${
                selectedCategory === category.id
                  ? "bg-gray-200"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="bg-gray-100 rounded-xl w-14 h-14 flex justify-center items-center">
                <img
                  src={`/category_icon/${category.cat_icon}.svg`}
                  alt={category.cat_name_en}
                  className="w-10 h-10 object-cover rounded-lg"
                />
              </div>
              <div className="flex-1 flex justify-between items-center">
                <div>
                  <h1
                    className={`text-lg font-semibold ${
                      selectedCategory === category.id && "text-primary"
                    }`}
                  >
                    {language === "english"
                      ? category.cat_name_en
                      : category.cat_name_bn}
                  </h1>
                  <p className="text-sm">
                    {language === "english"
                      ? "Subcategory: "
                      : "সাবক্যাটাগরিঃ "}
                    {subCategories.length || 0}
                  </p>
                </div>
                <div className="text-center">
                  <h3>{duaCounts[category.id] || "No"}</h3>
                  <p className="text-sm">
                    {language === "english" ? "Duas" : "দোয়া"}
                  </p>
                </div>
              </div>
            </div>

            {expandedCategory === category.id && subCategories.length > 0 && (
              <div className="ml-6 mt-2">
                {subCategories.map((subCategory) => (
                  <div key={subCategory.id}>
                    <div
                      className={`p-1 my-1 cursor-pointer hover:bg-gray-200 rounded-lg ${
                        expandedSubCategory === subCategory.id
                          ? "text-primary"
                          : ""
                      }`}
                      onClick={() =>
                        handleSubCategoryClick(
                          subCategory.id,
                          subCategory.subcat_name_en
                        )
                      }
                    >
                      {language === "english"
                        ? subCategory.subcat_name_en
                        : subCategory.subcat_name_bn}
                    </div>

                    {expandedSubCategory === subCategory.id &&
                      duasByCategory[category.id]
                        .filter((dua) => dua.subcat_id === subCategory.id)
                        .map((dua, index) => (
                          <div
                            key={index}
                            className={`ml-6 p-1 my-1 cursor-pointer hover:bg-gray-200 rounded-lg ${
                              selectedDua === dua.id ? "text-primary" : ""
                            }`}
                            onClick={() => handleDuaClick(dua.id)}
                          >
                            {language === "english"
                              ? dua.dua_name_en
                              : dua.dua_name_bn}
                          </div>
                        ))}

                    {expandedSubCategory === subCategory.id &&
                      duasByCategory[category.id].filter(
                        (dua) => dua.subcat_id === subCategory.id
                      ).length === 0 && (
                        <p className="text-gray-500 ml-6 mt-2">
                          No Duas found for this subcategory.
                        </p>
                      )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
      {filteredCategories.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No categories found</p>
      )}
    </div>
  );
};

export default CategoryList;
