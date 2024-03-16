import { Button } from "../components/Button.tsx";
import type { Player } from "gameData/playerStats.ts";
import { language_translate } from "gameData/locale.ts";

interface NetworkListProps {
  playerRequested: Player;
  playerRequesting: Player;
}

export function NetworkList(prop: NetworkListProps) {

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("connection_name", prop.playerRequested.googleId);

    try {
      const response = await fetch("/api/data/network", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      
    } catch (error) {
      console.error("Failed to make network request", error);
    }
    window.location.href = "/network";
  };
	return (
    <>
      <li>
        <form name="AddConnectionForm" onSubmit={handleSubmit}>
          <div class="flex gap-8 py-6">
            <div>{prop.playerRequested.googleName}</div>
            <Button onClick={handleSubmit} type="submit">{language_translate("ADD_CONNECTION", prop.playerRequesting.lastLanguage)}</Button>
          </div>
        </form>  
      </li> 
    </>
	);
}
