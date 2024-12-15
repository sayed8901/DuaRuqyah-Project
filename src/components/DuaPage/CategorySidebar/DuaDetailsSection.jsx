import DuaDetailsCard from "../DuaCard/DuaDetailsCard";

export default function DuaDetailsSection({
  sectionTitle,
  sectionRef,
  selectedCategory,
  duasByCategory,
  duaRefs,
}) {
  return (
    <div className="flex-1 ml-2 pl-4 pr-2 rounded-2xl overflow-y-auto h-[73vh] lg:h-[80vh] xl:h-[84vh] 2xl:h-[89vh]">
      {/* Display section title dynamically for the selected category */}
      {sectionTitle && (
        <div ref={sectionRef} className="p-6 bg-white rounded-lg mb-4">
          <h2>
            <span className="text-primary font-semibold">Section: </span>{" "}
            {sectionTitle}
          </h2>
        </div>
      )}

      {/* Check if there are duas for the selected category */}
      {selectedCategory && Array.isArray(duasByCategory[selectedCategory]) ? (
        duasByCategory[selectedCategory].length > 0 ? (
          duasByCategory[selectedCategory].map((dua, index) => (
            <DuaDetailsCard
              key={index}
              dua={dua}
              duaRef={(el) => (duaRefs.current[dua.id] = el)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-4">
            No Duas found for this category.
          </p>
        )
      ) : (
        <div className="w-full h-[80vh] flex justify-center items-center">
          <p className="text-center text-gray-500 text-lg font-semibold border p-4 rounded-md bg-gray-50">
            There is no dua in this category right now. Please select a
            different category to view other Duas.
          </p>
        </div>
      )}
    </div>
  );
}
