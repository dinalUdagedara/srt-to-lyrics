"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";

interface AlbumCoverProps {
  currentLyric: string;
  albumArt?: StaticImageData;
}

function AlbumCover({ currentLyric, albumArt }: AlbumCoverProps) {
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
          <div className="absolute inset-0 flex items-center justify-center rounded-xl ">
            <p className="text-center font-semibold text-gray-200 text-lg  px-4">
              {currentLyric || "♪ ♪ ♪"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AlbumCover;
