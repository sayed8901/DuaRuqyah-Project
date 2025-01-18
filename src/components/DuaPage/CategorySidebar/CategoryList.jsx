import { useAppContext } from "@/contexts/ContextProvider";
import Image from "next/image";
import React, { useState, useEffect } from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import duaarrow_icon from "@/assets/duaarrow.svg";

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
  // getting contexts from the context provider
  const { language } = useAppContext();

  // Set loading state to true initially
  const [isLoading, setIsLoading] = useState(true);

  // Handling fetching data, & set isLoading to false once data is loaded
  useEffect(() => {
    if (categories && categories.length > 0) {
      setIsLoading(false);
    }
  }, [categories]);

  // filtering out the categories based on searched "category name"
  const filteredCategories = categories.filter((category) =>
    category.cat_name_en.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 px-4 mb-10 h-[75%] sm:h-[70%] md:h-[75%] lg:h-[80%] xl:h-[76%] overflow-y-auto">
      {isLoading
        ? // Show skeleton loading while data is loading
          Array.from({ length: 10 }).map((_, index) => {
            return (
              <div key={index} className="mb-4 flex items-center gap-4">
                <Skeleton className="rounded-3xl" height={60} width={60} />
                <div className="flex flex-col gap-2">
                  <Skeleton className="rounded-3xl" height={20} width={180} />
                  <Skeleton className="rounded-3xl" height={10} width={150} />
                </div>
              </div>
            );
          })
        : filteredCategories.map((category) => {
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
                    <Image
                      src={`/category_icon/${category.cat_icon}.svg`}
                      alt={category.cat_name_en}
                      width={40} // Equivalent to w-10 (10 * 4px)
                      height={40} // Equivalent to h-10 (10 * 4px)
                      className="object-cover rounded-lg"
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

                {expandedCategory === category.id &&
                  subCategories.length > 0 && (
                    <div className="ml-6 mt-2 subcategory-container">
                      {subCategories.map((subCategory) => (
                        <div key={subCategory.id} className="subcategory-item">
                          <div
                            className={`ml-1 p-1 my-1 cursor-pointer hover:bg-gray-200 rounded-lg ${
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
                                  className={`ml-2 p-1 my-1 cursor-pointer hover:bg-gray-200 rounded-lg ${
                                    selectedDua === dua.id ? "text-primary" : ""
                                  }`}
                                  onClick={() => handleDuaClick(dua.id)}
                                >
                                  {language === "english" ? (
                                    <div className="flex items-center gap-2">
                                      <Image
                                        src={duaarrow_icon}
                                        alt="duaarrow"
                                      />
                                      <p>
                                        {dua.dua_name_en
                                          ? dua.dua_name_en
                                          : "Anonymous Dua"}
                                      </p>
                                    </div>
                                  ) : (
                                    <div className="flex items-center gap-2">
                                      <Image
                                        src={duaarrow_icon}
                                        alt="duaarrow"
                                      />
                                      <p>
                                        {dua.dua_name_bn
                                          ? dua.dua_name_bn
                                          : "নামবিহীন দোয়া"}
                                      </p>
                                    </div>
                                  )}
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
      {filteredCategories.length === 0 && !isLoading && (
        <p className="text-center text-gray-500 mt-4">No categories found</p>
      )}
    </div>
  );
};

export default CategoryList;
