"use client";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function WorldMap() {
  return (
    <div className="w-full h-[500px]">
      <ComposableMap>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: "#111827",
                    outline: "none"
                  },
                  hover: {
                    fill: "#38bdf8",
                    outline: "none"
                  },
                  pressed: {
                    fill: "#0ea5e9",
                    outline: "none"
                  }
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}
