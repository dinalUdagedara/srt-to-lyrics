"use client";
import React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { AlbumCoverProps } from "@/utils/types";

function AlbumCover({
  currentLyric,
  albumArt,
  previousLyric,
  nextLyric,
}: AlbumCoverProps) {
  return (
    <div>
      {albumArt && (
        <div className="relative h-[250px] w-[250px] rounded-lg">
          <Image
            alt="Album cover"
            className="object-cover rounded-lg"
            fill
            sizes="(min-width: 808px) 50vw, 100vw"
            src={albumArt}
            style={{ objectFit: "fill" }}
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl overflow-hidden">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentLyric}
                initial={{
                  opacity: 0,
                  y: 50,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.6,
                    ease: "anticipate",
                  },
                }}
                exit={{
                  opacity: 0,
                  y: -50,
                  scale: 0.9,
                  transition: {
                    duration: 0.6,
                    ease: "anticipate",
                  },
                }}
                className="flex flex-col items-center justify-center text-center"
              >
                {previousLyric && (
                  <p className="text-sm text-gray-400 opacity-70 mb-2">
                    {previousLyric}
                  </p>
                )}
                <p className="font-semibold text-gray-200 px-4 py-2 rounded">
                  {currentLyric || "♪ ♪ ♪"}
                </p>
                {nextLyric && (
                  <p className="text-sm text-gray-400 opacity-70 mt-2">
                    {nextLyric}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}

export default AlbumCover;
