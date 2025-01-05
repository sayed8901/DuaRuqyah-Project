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
  const { language } = useAppContext();

  return (
    <div className="flex-1 ml-2 pl-4 pr-2 rounded-2xl overflow-y-auto h-[81vh] md:h-[77vh] lg:h-[80vh] xl:h-[84vh] 2xl:h-[89vh]">
      {/* Display section title dynamically for the selected category */}
      {sectionTitle && (
        <div ref={sectionRef} className="p-6 bg-white rounded-lg mb-4">
          <h2>
            <span className="text-primary font-semibold"></span>
            {language === "english" ? "Section: " : "পরিচ্ছেদঃ "}
            {sectionTitle}
          </h2>
        </div>
      )}

      {/* Show loading skeleton until data is loaded */}
      {isLoading ||
      !selectedCategory ||
      !Array.isArray(duasByCategory[selectedCategory]) ? (
        // Always show skeleton during loading or if data isn't ready
        <div>
          <DuaDetailsCardSkeleton />
          <DuaDetailsCardSkeleton />
        </div>
      ) : (
        // Render the duas once data is ready
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