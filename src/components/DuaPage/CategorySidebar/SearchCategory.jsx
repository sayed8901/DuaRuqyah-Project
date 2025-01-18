import { FaSearch } from "react-icons/fa";
import { useAppContext } from "@/contexts/ContextProvider";

const SearchCategory = ({ searchTerm, setSearchTerm }) => {
  // getting contexts from the context provider
  const { language } = useAppContext();

  return (
    <div className="flex items-center xl:gap-2 px-2 xl:px-4 py-2 xl:py-4 border rounded-lg">
      <FaSearch className="text-gray-500" />

      {/* input field */}
      <input
        type="text"
        placeholder={
          language === "english" ? "Search Category" : "ক্যাটাগরি অনুযায়ী খুজুন"
        }
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-transparent outline-none w-full px-2 text-sm xl:text-base placeholder-gray-200 xl:placeholder-gray-500"
      />
    </div>
  );
};

export default SearchCategory;
