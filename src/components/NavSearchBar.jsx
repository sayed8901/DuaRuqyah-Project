"use client";

import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";

import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import profile_icon from "@/assets/profile.svg";
import support_icon from "@/assets/support.svg";
import download_icon from "@/assets/download.svg";
import privacy_icon from "@/assets/privacy.svg";
import credit_icon from "@/assets/credit.svg";
import about_icon from "@/assets/about.svg";
import copyright_icon from "@/assets/copyright.svg";
import projects_icon from "@/assets/projects.svg";
import settings_icon from "@/assets/settings.svg";

import { useAppContext } from "@/contexts/ContextProvider";

const NavSearchBar = () => {
  const { toggleSettings, language, isSidebarOpen, setSidebarOpen } = useAppContext();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Close the settings dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close dropdown if clicked outside the dropdown or click the button
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false); // Close the dropdown
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener when component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle Sidebar for small screen (hamburger menu)
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev); // Toggle dropdown visibility
  };

  return (
    <div className="flex justify-between items-center px-2">
      <div className="flex flex-grow justify-between items-center py-1 md:py-4">
        <div className="w-52 sm:w-96 flex justify-between items-center">
          {/* Title */}
          <h1 className="text-xl xl:text-2xl font-semibold">
            {language === "english" ? "Duas Page" : "দোয়া পেজ"}
          </h1>

          <button
            className="mx-4 px-2 py-1 visible md:hidden"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? (
              <div className="flex items-center border-2 border-primary rounded-lg p-1 gap-2">
                <p className="text-sm">Hide Categories</p>
                {/* // Close icon */}
                <FaTimes className="text-2xl text-gray-600" />
              </div>
            ) : (
              <div className="flex items-center border-2 border-primary rounded-lg p-1 gap-2">
                <p className="text-sm">Show Categories</p>
                {/* // Hamburger icon */}
                <FaBars className="text-2xl text-gray-600" />
              </div>
            )}
          </button>
        </div>

        {/* Search Box */}
        <div className="hidden md:block">
          <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
            <input
              type="text"
              placeholder="Search by Dua Name"
              className="bg-transparent outline-none w-full px-4"
            />
            <div className="bg-gray-200 w-16 h-8 flex justify-center items-center rounded-lg">
              <FaSearch className="text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Profile Icon with Dropdown */}
      <div className="relative w-28 sm:w-36 lg:w-52 xl:w-80 flex justify-end">
        <button
          ref={buttonRef} // Attach ref to the button
          onClick={toggleDropdown} // Toggle dropdown visibility when clicked
          className="flex items-center focus:outline-none"
        >
          <Image src={profile_icon} alt="profile_icon" />
          <IoMdArrowDropdown className="text-3xl text-gray-600" />
        </button>

        {isDropdownOpen && (
          <div
            ref={dropdownRef} // Attach the ref to the dropdown
            className="absolute right-0 mt-10 w-[300px] bg-white border rounded-3xl z-10"
          >
            <ul className="px-3 py-8">
              <li className="px-4 py-2 hover:bg-gray-100 hover:rounded-2xl cursor-pointer flex justify-start items-center gap-4">
                <Image src={support_icon} alt="support_icon" />
                <p>{language === "english" ? "Support Us" : "সাপোর্ট করুন"}</p>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 hover:rounded-2xl cursor-pointer flex justify-start items-center gap-4">
                <Image src={download_icon} alt="download_icon" />
                <p>
                  {language === "english"
                    ? "Download the App"
                    : "দোয়া অ্যাপ ডাউনলোড করুন"}
                </p>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 hover:rounded-2xl cursor-pointer flex justify-start items-center gap-4">
                <Image src={privacy_icon} alt="privacy_icon" />
                <p>
                  {language === "english"
                    ? "Privacy Policy"
                    : "প্রাইভেসি পলিসি"}
                </p>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 hover:rounded-2xl cursor-pointer flex justify-start items-center gap-4">
                <Image src={credit_icon} alt="credit_icon" />
                <p>
                  {language === "english" ? "Thanks & Credits" : "কৃতজ্ঞতা"}
                </p>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 hover:rounded-2xl cursor-pointer flex justify-start items-center gap-4">
                <Image src={about_icon} alt="about_icon" />
                <p>{language === "english" ? "About Us" : "আমাদের সম্পর্কে"}</p>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 hover:rounded-2xl cursor-pointer flex justify-start items-center gap-4">
                <Image src={copyright_icon} alt="copyright_icon" />
                <p>
                  {language === "english"
                    ? "Copyright Warning"
                    : "কপিরাইট সতর্কতা"}
                </p>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 hover:rounded-2xl cursor-pointer flex justify-start items-center gap-4">
                <Image src={projects_icon} alt="projects_icon" />
                <p>
                  {language === "english"
                    ? "Our Other Projects"
                    : "আমাদের অন্যান্য প্রজেক্টস"}
                </p>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Settings Icon */}
      <div className="ml-6 visible 2xl:hidden">
        <button onClick={toggleSettings}>
          <Image src={settings_icon} alt="settings_icon" />
        </button>
      </div>
    </div>
  );
};

export default NavSearchBar;
