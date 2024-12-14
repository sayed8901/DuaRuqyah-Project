import Image from "next/image";
import React from "react";
import language_icon from "@/assets/language.svg";
import general_icon from "@/assets/general.svg";
import font_icon from "@/assets/font.svg";

const SettingsMenu = () => {
  return (
    <div className="w-80 bg-white p-8 rounded-3xl h-[84vh]">
      <h1 className="text-xl font-semibold text-center py-4">Settings</h1>
      <div className="py-4">
        <div className="border-2 rounded-2xl my-4">
          <div className="border-l-4 border-primary p-2 bg-gray-100">
            <div className="flex justify-start items-center gap-4">
              <div className="bg-gray-200 w-10 h-10 flex justify-center items-center rounded-full">
                <Image src={language_icon} alt="language_icon"></Image>
              </div>
              <h2 className="text-primary font-semibold">
                Language Settings
              </h2>
            </div>
          </div>
          <div className="flex justify-between px-4 py-6 gap-4">
            <button className="border-2 rounded-lg w-full px-4 py-2 bg-primary text-white">
              English
            </button>
            <button className="border-2 rounded-lg w-full px-4 py-2">
              বাংলা
            </button>
          </div>
        </div>
        <div className="rounded-2xl bg-gray-100 my-4 p-2">
          <div className="flex justify-start items-center gap-4">
            <div className="bg-gray-200 w-10 h-10 flex justify-center items-center rounded-full">
              <Image src={general_icon} alt="general_icon"></Image>
            </div>
            <h2>General Settings</h2>
          </div>
        </div>
        <div className="rounded-2xl bg-gray-100 my-4 p-2">
          <div className="flex justify-start items-center gap-4">
            <div className="bg-gray-200 w-10 h-10 flex justify-center items-center rounded-full">
              <Image src={font_icon} alt="font_icon"></Image>
            </div>
            <h2>Font Settings</h2>
          </div>
        </div>
        <div className="rounded-2xl bg-gray-100 my-4 p-2">
          <div className="flex justify-start items-center gap-4">
            <div className="bg-gray-200 w-10 h-10 flex justify-center items-center rounded-full">
              <Image src={font_icon} alt="font_icon"></Image>
            </div>
            <h2>Apperance Settings</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsMenu;
