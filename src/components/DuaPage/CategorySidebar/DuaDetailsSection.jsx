import { useAppContext } from "@/contexts/ContextProvider";
import DuaDetailsCard from "../DuaCard/DuaDetailsCard";
import DuaDetailsCardSkeleton from "../DuaCard/DuaDetailsCardSkeleton";

export default function DuaDetailsSection({
  sectionTitle,
  sectionRef,
  selectedCategory,
  duasByCategory,
  duaRefs,
  isLoading,
}) {
  // getting contexts from the context provider
  const { language } = useAppContext();

  return (
    <div className="flex-1 ml-2 pl-4 pr-2 rounded-2xl overflow-y-auto h-[81vh] md:h-[77vh] lg:h-[80vh] xl:h-[84vh] 2xl:h-[89vh] w-full">
      {/* Display section title dynamically for the selected category */}
      {sectionTitle && (
        <div ref={sectionRef} className="p-6 bg-white rounded-lg mb-4">
          <h2>
            <span className="text-primary font-semibold">
              {language === "english" ? "Section: " : "পরিচ্ছেদঃ "}
            </span>
            {sectionTitle}
          </h2>
        </div>
      )}

      {/* Show loading skeleton until data is loaded */}
      {isLoading || !selectedCategory ? (
        <div>
          <DuaDetailsCardSkeleton />
          <DuaDetailsCardSkeleton />
        </div>
      ) : !selectedCategory ||
        !Array.isArray(duasByCategory[selectedCategory]) ||
        duasByCategory[selectedCategory].length === 0 ? (
        // handling empty category
        <div className="w-full h-[78vh] flex justify-center items-center">
          <p className="text-center text-gray-500 text-lg font-semibold border p-4 rounded-xl bg-gray-50">
            {language === "english"
              ? "There is no dua data available in this category right now. Please select a different category to view other Duas of your preferences."
              : "এই বিভাগে বর্তমানে কোনো দোয়ার তথ্য নেই। আপনার পছন্দের অন্যান্য দোয়া দেখতে ভিন্ন বিভাগ নির্বাচন করুন।"}
          </p>
        </div>
      ) : (
        // showing dua cards
        duasByCategory[selectedCategory].map((dua, index) => (
          <DuaDetailsCard
            key={index}
            dua={dua}
            duaRef={(el) => (duaRefs.current[dua.id] = el)}
          />
        ))
      )}
    </div>
  );
}
