import React from "react";
import Image from "next/image";
import duacard_icon from "@/assets/duacard.svg";
import copy_icon from "@/assets/copy.svg";
import bookmark_icon from "@/assets/bookmark.svg";
import memorize_icon from "@/assets/memorize.svg";
import share_icon from "@/assets/share.svg";
import report_icon from "@/assets/report.svg";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AudioPlayer from "./AudioPlayer";

export default function DuaDetailsCard({ dua, duaRef }) {
  const handleIconClick = () => {
    toast.success("Coming Soon In Sha Allah", {
      position: "bottom-center",
      className: "bg-black", // Tailwind class
    });
  };

  const tooltipTexts = ["Copy", "Bookmark", "Memorize", "Share", "Report"]; // Tooltip labels

  return (
    <div ref={duaRef} className="p-6 bg-white rounded-lg mb-6">
      <div className="space-y-7">
        <div className="flex justify-start items-center gap-3">
          <Image src={duacard_icon} alt="duacard_icon" />
          <h2 className="text-lg font-semibold text-primary">
            {dua?.dua_id}. {dua?.dua_name_en}
          </h2>
        </div>
        <p className="text-justify">{dua?.top_en}</p>

        {/* dua arabic */}
        <p className="text-3xl leading-loose text-right">{dua?.dua_indopak}</p>

        {dua?.transliteration_en && (
          <p className="text-justify italic">
            <span className="font-semibold">Transliteration:</span>{" "}
            {dua?.transliteration_en}
          </p>
        )}

        {dua?.translation_en && (
          <p className="text-justify">Translation: {dua?.translation_en}</p>
        )}
        <p className="text-justify font-medium">{dua?.bottom_en}</p>

        <div>
          <h3 className="text-lg font-semibold text-primary">Reference:</h3>
          <p>{dua?.refference_en}</p>
        </div>

        {/* icons part */}
        <div
          className={`flex flex-col sm:flex-row ${
            dua?.audio ? "justify-between" : "justify-end"
          } items-center`}
        >
          {/* Audio Player */}
          <div
            className={`flex justify-between items-center mb-4 sm:mb-0 ${
              dua?.audio ? "visible" : "hidden"
            }`}
          >
            {/* {console.log(dua.audio)} */}
            <AudioPlayer
              // audioSrc={dua.audio}
              // As {dua.audio} is not available, I have used demo audio here

              audioSrc={`https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${dua.id}.mp3`}
            />
          </div>

          {/* Icons Section */}
          <div className="flex justify-center items-center gap-6 xl:gap-8">
            {[
              copy_icon,
              bookmark_icon,
              memorize_icon,
              share_icon,
              report_icon,
            ].map((icon, index) => (
              <div
                key={index}
                className="relative group cursor-pointer"
                onClick={() => handleIconClick()}
              >
                <Image src={icon} alt={`icon-${index}`} />

                {/* Tooltip */}
                <span className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 bg-black text-white text-xs font-semibold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {tooltipTexts[index]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
