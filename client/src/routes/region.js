import React, { useEffect, useRef } from "react";
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";

export default function Region() {
  const mapDiv = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {
      const webmap = new Map({
        basemap: "dark-gray-vector",
      });

      const view = new MapView({
        container: mapDiv.current,
        map: webmap,
        center: [-117.149, 32.7353],
        scale: 10000000,
      });

      return () => view && view.destroy();
    }
  }, []);

  return (
    <div
      className=""
      ref={mapDiv}
      style={{ height: "500px", width: "100%" }}
    ></div>
  );
}
