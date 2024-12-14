"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import profile_icon from "@/assets/profile.svg";
import support_icon from "@/assets/support.svg";
import download_icon from "@/assets/download.svg";
import privacy_icon from "@/assets/privacy.svg";
import credit_icon from "@/assets/credit.svg";
import about_icon from "@/assets/about.svg";
import copyright_icon from "@/assets/copyright.svg";
import projects_icon from "@/assets/projects.svg";


const NavSearchBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="flex justify-between items-center">
      {/* Title */}
      <div className="flex flex-grow justify-between items-center py-4">
        <h1 className="text-2xl font-semibold">Duas Page</h1>

        {/* Search Box */}
        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
          <input
            type="text"
            placeholder="Search by Dua Name"
            className="bg-transparent outline-none w-full px-4"
          />
          <div className="bg-gray-200 w-16 h-10 flex justify-center items-center rounded-lg">
            <FaSearch className="text-gray-500" />
          </div>
        </div>
      </div>

      {/* Profile Icon with Dropdown */}
      <div className="relative w-80 flex justify-end">
        <button
          onClick={toggleDropdown}
          className="flex items-center focus:outline-none"
        >
          <Image src={profile_icon} alt="profile_icon"></Image>
          <IoMdArrowDropdown className="text-3xl text-gray-600" />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-12 w-72 bg-white border rounded-3xl z-10">
            <ul className="px-8 py-4">
              <li className="px-4 py-2 hover:bg-gray-100 hover:rounded-2xl cursor-pointer flex justify-start items-center gap-4">
                <Image src={support_icon} alt="support_icon"></Image>
                <p>Support Us</p>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 hover:rounded-2xl cursor-pointer flex justify-start items-center gap-4">
                <Image src={download_icon} alt="support_icon"></Image>
                <p>Download the App</p>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 hover:rounded-2xl cursor-pointer flex justify-start items-center gap-4">
                <Image src={privacy_icon} alt="support_icon"></Image>
                <p>Privacy Policy</p>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 hover:rounded-2xl cursor-pointer flex justify-start items-center gap-4">
                <Image src={credit_icon} alt="support_icon"></Image>
                <p>Thanks & Credits</p>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 hover:rounded-2xl cursor-pointer flex justify-start items-center gap-4">
                <Image src={about_icon} alt="support_icon"></Image>
                <p>About Us</p>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 hover:rounded-2xl cursor-pointer flex justify-start items-center gap-4">
                <Image src={copyright_icon} alt="support_icon"></Image>
                <p>Copyright Warning</p>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 hover:rounded-2xl cursor-pointer flex justify-start items-center gap-4">
                <Image src={projects_icon} alt="support_icon"></Image>
                <p>Our Other Projects</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavSearchBar;
