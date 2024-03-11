import * as Leaflet from "leaflet"; 
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useContext, useEffect, useState } from "preact/hooks";
import { ComponentChildren, createContext } from "preact";
import { PlayerStats } from "gameData/playerStats.ts";
import { Player } from "gameData/playerStats.ts";
import {language_translate} from "gameData/locale.ts";
import * as Interviews from "../gameData/interviewSettings.json" with {
  type: "json",
};


interface InterviewData {
  level: number;
  prompts: Array<PlayerStats>;
}
// Create a context to hold Leaflet data/functions
const LeafletContext = createContext<typeof Leaflet | null>(null);

// LeafletProvider component manages Leaflet loading and context
function LeafletProvider(props: { children: ComponentChildren }) {
  if (!IS_BROWSER) {
    return <></>;
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
interface MapComponentProps {
  level: number;
  player: Player;
}

const sendInterviewRequest = async (formData: FormData) => {
  const response = await fetch("/api/data/game", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  console.log("response on client", response);
  return response;
}
function MapComponent(props: MapComponentProps) {
  const leaf = useContext(LeafletContext);
  const interviewData = JSON.parse(JSON.stringify(Interviews.default));
  if (!leaf) return <div>Component placeholder</div>;
  useEffect(() => {
    const map = leaf.map("map").setView(leaf.latLng(0, 0), 2);

    // Define bounds for the image
    const southWest = leaf.latLng(-100, -400),
      northEast = leaf.latLng(100, 400),
      bounds = leaf.latLngBounds(southWest, northEast);

    // Add the image overlay
    // Replace 'YOUR_IMAGE_URL_HERE' with the URL of your image
    leaf.imageOverlay("/temp_map.png", bounds).addTo(map);
    map.fitBounds(bounds);
    map.setMaxBounds(bounds);
    const createMarker = (interviewerStats: PlayerStats) => {
      //generate random coordinates
      const lat = Math.random() * 100 - 100;
      const lng = Math.random() * 100 - 100;
      const location = leaf.latLng(lat, lng);
      const marker = leaf.marker(location).addTo(map);
      marker.bindPopup(language_translate("CLICK_TO_PROCEED_TO_INTERVIEW", props.player.lastLanguage));

      
      marker.on("mouseover", function (e) {
        marker.openPopup();
      });
      
      // Optional: Close popup on mouse out
      marker.on("mouseout", function (e) {
        marker.closePopup();
      });

      // Redirect on click
      marker.on("click", async () => {
        //we need to send the post req to generate the interview instead. 
        const formData = new FormData();
        formData.append("interviewerStats", JSON.stringify(interviewerStats));
         const response = await fetch("/api/data/game", {
          method: "POST",
          body: formData,
        });

        //cache the result in the db and then redirect to the interview page
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        globalThis.location.href = "/interview"; 

      });
    };

    const currentLevelPrompts =
      interviewData.find((interview: InterviewData) => {
        return interview.level == props.level;
      }).prompts;
    for (const prompt of currentLevelPrompts) {
      createMarker(prompt);
    }
  });
  return <div id="map" class="relative w-[80vw] h-[50vh]" />;
}

// MapIsland is the parent component integrating LeafletProvider and MapComponent
interface MapIslandProps {
  level: number;
  player: Player;
}
export default function MapIsland(props: MapIslandProps) {
  return (
    <LeafletProvider>
      <MapComponent level={props.level} player={props.player} />
    </LeafletProvider>
  );
}
