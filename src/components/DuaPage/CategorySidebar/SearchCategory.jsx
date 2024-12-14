import { FaSearch } from "react-icons/fa";

const SearchCategory = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex items-center gap-2 px-4 py-2 border rounded-lg">
      <FaSearch className="text-gray-500" />
      <input
        type="text"
        placeholder="Search by Category Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-transparent outline-none w-full px-4"
      />
    </div>
  );
};

export default SearchCategory;
