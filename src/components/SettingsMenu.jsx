import React from "react";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import language_icon from "@/assets/language.svg";
import general_icon from "@/assets/general.svg";
import font_icon from "@/assets/font.svg";
import { useAppContext } from "@/contexts/ContextProvider";

const SettingsMenu = () => {
  // getting contexts from the context provider
  const { isSettingsOpen, toggleSettings, toggleLanguage, language } = useAppContext();

  return (
    // Displaying the "settings" side menu of a fixed width for min-w-80 or, 320px
    <div
      className={`fixed top-0 md:top-[40px] lg:top-[60px] -right-2 min-w-80 bg-white mx-2 p-4 mb-10 rounded-3xl min-h-[73vh] lg:min-h-[80vh] xl:min-h-[82vh] shadow-lg transition-transform duration-300 ${
        isSettingsOpen ? "translate-x-0" : "translate-x-full"
      } 2xl:translate-x-0 2xl:static 2xl:block`}
    >
      {/* Close button for smaller screens */}
      <button
        className="absolute top-4 right-4 text-gray-500 2xl:hidden"
        onClick={toggleSettings}
      >
        <AiOutlineClose size={24} /> {/* Close icon */}
      </button>

      <h1 className="text-xl font-semibold text-center py-0 lg:py-8">
        {language === "english" ? "Settings" : "সেটিংস"}
      </h1>

      <div className="px-2">
        {/* Language Settings Part */}
        <div className="border-2 rounded-2xl my-4">
          <div className="border-l-4 border-primary p-2 bg-gray-100">
            <div className="flex justify-start items-center gap-4">
              <div className="bg-gray-200 w-10 h-10 flex justify-center items-center rounded-full">
                <Image src={language_icon} alt="language_icon" />
              </div>
              <h2 className="text-primary font-semibold">
                {language === "english" ? "Language Settings" : "ভাষা সেটিংস"}
              </h2>
            </div>
          </div>

          {/* interactive language changes btn */}
          <div className="flex justify-between px-4 py-4 lg:py-6 gap-4">
            <button
              className={`border-2 rounded-lg w-full px-4 py-1 lg:py-2 ${
                language === "english" ? "bg-primary text-white" : ""
              }`}
              onClick={() => toggleLanguage("english")} // Toggle to English
            >
              English
            </button>
            <button
              className={`border-2 rounded-lg w-full px-4 py-1 lg:py-2 ${
                language === "bangla" ? "bg-primary text-white" : ""
              }`}
              onClick={() => toggleLanguage("bangla")} // Toggle to Bangla
            >
              বাংলা
            </button>
          </div>
        </div>

        {/* General Settings Part */}
        <div className="rounded-2xl bg-gray-100 my-4 p-2">
          <div className="flex justify-start items-center gap-4">
            <div className="bg-gray-200 w-10 h-10 flex justify-center items-center rounded-full">
              <Image src={general_icon} alt="general_icon" />
            </div>
            <h2>
              {language === "english" ? "General Settings" : "সাধারণ সেটিংস"}
            </h2>
          </div>
        </div>

        {/* Font Settings Part */}
        <div className="rounded-2xl bg-gray-100 my-4 p-2">
          <div className="flex justify-start items-center gap-4">
            <div className="bg-gray-200 w-10 h-10 flex justify-center items-center rounded-full">
              <Image src={font_icon} alt="font_icon" />
            </div>
            <h2>{language === "english" ? "Font Settings" : "ফন্ট সেটিংস"}</h2>
          </div>
        </div>

        {/* Appearance Settings Part */}
        <div className="rounded-2xl bg-gray-100 my-4 p-2">
          <div className="flex justify-start items-center gap-4">
            <div className="bg-gray-200 w-10 h-10 flex justify-center items-center rounded-full">
              <Image src={font_icon} alt="font_icon" />
            </div>
            <h2>
              {language === "english" ? "Appearance Settings" : "থিম সেটিংস"}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsMenu;
