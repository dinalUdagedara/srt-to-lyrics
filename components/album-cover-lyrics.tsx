"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";

interface AlbumCoverProps {
  previousLyric: string;
  currentLyric: string;
  nextLyric: string;
  albumArt?: StaticImageData;
}

function AlbumCover({
  currentLyric,
  albumArt,
  previousLyric,
  nextLyric,
}: AlbumCoverProps) {
  return (
    <div>
      {albumArt && (
        <div className=" h-[200px] w-[150px] rounded-lg bg-slate-600">
          <Image
            alt="Album cover"
            className="object-cover rounded-lg"
            fill
            sizes="(max-width: 150px) 100vw"
            src={albumArt}
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl ">
            {previousLyric && (
              <p className="text-center text-sm text-gray-400 opacity-70 mb-1">
                {previousLyric}
              </p>
            )}
            <p className="text-center font-semibold text-gray-200 px-2 py-1 bg-black/50 rounded">
              {currentLyric || "♪ ♪ ♪"}
            </p>
            {nextLyric && (
              <p className="text-center text-sm text-gray-400 opacity-70 mt-1">
                {nextLyric}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AlbumCover;
