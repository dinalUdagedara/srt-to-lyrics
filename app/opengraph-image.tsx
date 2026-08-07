import { ImageResponse } from "next/og";
import { brand } from "@/lib/brand";

export const alt = `${brand.name} — ${brand.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: brand.ink,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            display: "flex",
            backgroundImage:
              "radial-gradient(ellipse 70% 55% at 12% 18%, rgba(212,146,74,0.28), transparent 58%), radial-gradient(ellipse 55% 45% at 88% 82%, rgba(80,110,120,0.22), transparent 52%)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 16,
              background: `linear-gradient(160deg, ${brand.ember} 0%, ${brand.emberDeep} 100%)`,
              color: brand.ink,
              fontSize: 34,
              fontWeight: 800,
            }}
          >
            L
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 36,
              fontWeight: 700,
              color: brand.cream,
              letterSpacing: -1,
            }}
          >
            {brand.name}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 22,
            position: "relative",
            maxWidth: 920,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2.5,
              color: brand.cream,
            }}
          >
            Synced lyrics from any .srt
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              lineHeight: 1.4,
              color: brand.creamMuted,
              maxWidth: 780,
            }}
          >
            Drop in audio and a subtitle file — watch lyrics stay locked to the
            beat, like Spotify, powered by standard SRT.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            position: "relative",
            color: brand.ember,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 0.5,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 3,
              background: brand.ember,
            }}
          />
          Real-time lyric player
        </div>
      </div>
    ),
    { ...size }
  );
}
