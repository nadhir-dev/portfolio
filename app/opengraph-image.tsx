import { ImageResponse } from "next/og";

import { site } from "@/data/site";

export const alt = `${site.name} — ${site.role}`;
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
          padding: "72px",
          background: "#0a0a0a",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              width: "58px",
              height: "58px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "999px",
              background: "#3b82f6",
              color: "#ffffff",
              fontSize: "28px",
              fontWeight: 700,
            }}
          >
            N
          </div>
          <div style={{ fontSize: "24px", color: "#a3a3a3" }}>
            {site.domain}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "92px",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
            }}
          >
            <span>Nadhir</span>
            <span>Bendraou</span>
          </div>
          <div style={{ fontSize: "34px", color: "#93c5fd" }}>
            {site.role}
          </div>
          <div style={{ fontSize: "24px", color: "#a3a3a3", maxWidth: "900px" }}>
            Building fast, scalable web, desktop, mobile, and AI products.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
