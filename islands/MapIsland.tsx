import * as Leaflet from "https://esm.sh/v135/@types/leaflet@1.9.4/index.d.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useContext, useEffect, useState } from "preact/hooks";
import { ComponentChildren, createContext } from "preact";

// Create a context to hold Leaflet data/functions
const LeafletContext = createContext<typeof Leaflet | null>(null);

// LeafletProvider component manages Leaflet loading and context
function LeafletProvider(props: { children: ComponentChildren }) {
  if (!IS_BROWSER) {
    return <p>Leaflet must be loaded on the client. No children will render</p>;
  }
  const [value, setValue] = useState<typeof Leaflet | null>(null);
  return (
    <>
      {/* Load Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossorigin=""
      />
      {/* Load Leaflet JS */}
      <script
        onLoad={() => setValue(globalThis.L)}
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossorigin=""
      />
      {/* Provide Leaflet context to children */}
      <LeafletContext.Provider value={value}>
        {props.children}
      </LeafletContext.Provider>
    </>
  );
}

// MapComponent utilizes Leaflet context for rendering the map
function MapComponent() {
  const leaf = useContext(LeafletContext);
  if (!leaf) return <div>Component placeholder</div>;
  useEffect(() => {
    const map = leaf.map("map").setView(leaf.latLng(0, 0), 2);

    // Define bounds for the image
    const southWest = leaf.latLng(-100, -400),
    northEast = leaf.latLng(100, 400),
    bounds = leaf.latLngBounds(southWest, northEast);

    // Add the image overlay
    // Replace 'YOUR_IMAGE_URL_HERE' with the URL of your image
    leaf.imageOverlay('/temp_map.png', bounds).addTo(map);
    map.fitBounds(bounds);
    map.setMaxBounds(bounds);

    const location = leaf.latLng(-50, 100);
    const marker = leaf.marker(location).addTo(map)
    marker.bindPopup('Click to proceed to interview.')

   // Redirect on click
    marker.on('click', () => {
      window.location.href = '/interview';
    });

    marker.on('mouseover', function (e) {
      this.openPopup();
    });
  
    // Optional: Close popup on mouse out
    marker.on('mouseout', function (e) {
      this.closePopup();
    });
  });
  return <div id="map" class="relative w-[80vw] h-[50vh]" />;
}

// MapIsland is the parent component integrating LeafletProvider and MapComponent
export default function MapIsland() {
  return (
    <LeafletProvider>
      <MapComponent />
    </LeafletProvider>
  );
}