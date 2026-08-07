import { ImageResponse } from "next/og";
import { brand } from "@/lib/brand";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: brand.ink,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 132,
            height: 132,
            borderRadius: 32,
            background: `linear-gradient(160deg, ${brand.ember} 0%, ${brand.emberDeep} 100%)`,
            color: brand.ink,
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: -2,
          }}
        >
          L
        </div>
      </div>
    ),
    { ...size }
  );
}
