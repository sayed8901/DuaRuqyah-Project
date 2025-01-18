"use client";

import DuaPage from "@/components/DuaPage/DuaPage";
import NavSearchBar from "@/components/NavSearchBar";
import SettingsMenu from "@/components/SettingsMenu";
import SideIconMenu from "@/components/SideIconMenu";

import { useEffect, useState } from "react";

// getting custom data fetching functions from utility folder
import { getAllCategories, getAllDuas } from "@/utilities/dataFetch";

export default function Home() {
  const [allDuas, setAllDuas] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      const fetchedDuas = await getAllDuas();
      const fetchedCategories = await getAllCategories();
      setAllDuas(fetchedDuas);
      setCategories(fetchedCategories);
    };

    fetchData();
  }, []); // Run once on component mount

  // console.log(allDuas, categories);

  return (
    <div>
      <div className="flex gap-8">
        {/* Side Icon Menu on the left */}
        <SideIconMenu />

        {/* Nav Search Bar on the right */}
        <div className="flex-1">
          <NavSearchBar />

          <div className="flex justify-between">
            {/* dua category and dua cards */}
            <DuaPage duas={allDuas} categories={categories}></DuaPage>

            {/* settings panel */}
            <SettingsMenu />
          </div>
        </div>
      </div>
    </div>
  );
}
