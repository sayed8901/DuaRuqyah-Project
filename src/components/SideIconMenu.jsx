import React from "react";
import Image from "next/image";
import logo from "@/assets/dua-logo.svg";
import home_icon from "@/assets/home.svg";
import all_dua_icon from "@/assets/alldua.svg";
import memorize_icon from "@/assets/memorize.svg";
import bookmark_icon from "@/assets/bookmark.svg";
import ruqyah_icon from "@/assets/ruqyah.svg";
import dua_info_icon from "@/assets/dua-info.svg";
import books_icon from "@/assets/books.svg";

const SideIconMenu = () => {
  return (
    <div className="w-24 bg-white rounded-3xl h-[92vh] ml-4 px-4 py-6 flex flex-col justify-start items-center gap-20 overflow-y-auto scroll-smooth">
      <Image src={logo} alt="logo"></Image>
      <div className="flex flex-col justify-start items-center gap-6">
        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
          <Image src={home_icon} alt="home_icon"></Image>
        </div>
        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
          <Image src={all_dua_icon} alt="all_dua_icon"></Image>
        </div>
        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
          <Image src={memorize_icon} alt="memorize_icon"></Image>
        </div>
        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
          <Image src={bookmark_icon} alt="bookmark_icon"></Image>
        </div>
        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
          <Image src={ruqyah_icon} alt="ruqyah_icon"></Image>
        </div>
        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
          <Image src={dua_info_icon} alt="dua_info_icon"></Image>
        </div>
        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
          <Image src={books_icon} alt="books_icon"></Image>
        </div>
      </div>
      <Image src={logo} alt="logo"></Image>
    </div>
  );
};

export default SideIconMenu;
