// Base URL for API calls, fetched from environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


// Function to fetch all Duas
export const getAllDuas = async () => {
  const response = await fetch(`${API_BASE_URL}/all_dua`); 
  const all_duas = await response.json();
  return all_duas;
};

// Function to fetch all categories
export const getAllCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories`);
  const categories = await response.json();
  return categories;
};

// Function to fetch all Duas for a specific category ID
export const getAllDuasByCategoryID = async (cat_id) => {
  const response = await fetch(`${API_BASE_URL}/dua_by_category/${cat_id}`);
  const duas_by_category = await response.json();
  return duas_by_category;
};

// Function to fetch all subcategories
export const getAllSubCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/sub_categories`);
  const sub_categories = await response.json();
  return sub_categories;
};

// Function to fetch all Duas for a specific subcategory ID
export const getAllDuasBySubCategoryID = async (sub_cat_id) => {
  const response = await fetch(
    `${API_BASE_URL}/dua_by_sub_category/${sub_cat_id}`
  );
  const duas_by_sub_category = await response.json();
  return duas_by_sub_category;
};

// Function to fetch all subcategories for a specific category ID
export const getAllSubCategoriesByCategoryID = async (cat_id) => {
  const response = await fetch(
    `${API_BASE_URL}/sub_categories_by_category/${cat_id}`
  );
  const sub_categories_of_category = await response.json();
  return sub_categories_of_category;
};
