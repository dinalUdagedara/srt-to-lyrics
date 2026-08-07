import { ImageResponse } from "next/og";
import { brand } from "@/lib/brand";

function BrandMark({ size }: { size: number }) {
  const mark = Math.round(size * 0.72);
  const radius = Math.round(size * 0.18);
  const fontSize = Math.round(size * 0.4);

  return (
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
          width: mark,
          height: mark,
          borderRadius: radius,
          background: `linear-gradient(160deg, ${brand.ember} 0%, ${brand.emberDeep} 100%)`,
          color: brand.ink,
          fontSize,
          fontWeight: 800,
          letterSpacing: -2,
        }}
      >
        L
      </div>
    </div>
  );
}

export function createBrandIcon(size: number) {
  return new ImageResponse(<BrandMark size={size} />, {
    width: size,
    height: size,
  });
}
