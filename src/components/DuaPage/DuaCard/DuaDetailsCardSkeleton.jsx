import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// it resembles the skeleton of a dua card
export default function DuaDetailsCardSkeleton() {
  return (
    <div className="p-6 bg-white rounded-lg mb-6 w-full">
      <div className="space-y-8">
        {/* Icon and Title Skeleton */}
        <div className="flex justify-start items-center gap-3">
          <Skeleton circle={true} height={40} width={40} />
          <Skeleton height={20} width={200} />
        </div>

        {/* Transliteration Skeleton */}
        <div className="flex flex-col space-y-3">
          <Skeleton height={15} width={"100%"} />
          <Skeleton height={15} width={"100%"} />
          <Skeleton height={15} width={"50%"} />
        </div>

        {/* Reference Skeleton */}
        <div>
          <Skeleton height={20} width={100} />
        </div>

        {/* Icons Skeleton */}
        <div className="flex justify-between items-center gap-10 sm:gap-52 md:gap-28 lg:gap-32 xl:gap-52 2xl:gap-64">
          <div className="flex items-center">
            <Skeleton circle={true} height={40} width={40} />
          </div>

          <div className="flex gap-4 xl:gap-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                key={index}
                rounded={true}
                height={25}
                width={25}
                style={{ marginLeft: "10px" }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
