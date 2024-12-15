import { FaSearch } from "react-icons/fa";

const SearchCategory = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex items-center xl:gap-2 px-2 xl:px-4 py-2 xl:py-4 border rounded-lg">
      <FaSearch className="text-gray-500" />
      <input
        type="text"
        placeholder="Search Category"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-transparent outline-none w-full px-2 text-sm xl:text-base placeholder-gray-200 xl:placeholder-gray-500"
      />
    </div>
  );
};

export default SearchCategory;
