import { Button } from "../components/Button.tsx";
import type { Player, PlayerStats} from "gameData/playerStats.ts";
import { language_translate } from "gameData/locale.ts";

interface MockInterviewProps {
  playerRequested: Player;
  playerRequesting: Player;
}

export  function MockInterview(prop: MockInterviewProps) {
  const handleSubmit = async () => {
    const interviewerStats: PlayerStats = {
        charisma: 0,
        motivation: 0,
        technicalSkills: 0,
        likability: 0,
    }; //make one with the friends stats
    for(const move of prop.playerRequested.moves){
        interviewerStats.charisma += move.pointsAllocated.charisma;
        interviewerStats.motivation += move.pointsAllocated.motivation;
        interviewerStats.technicalSkills += move.pointsAllocated.technicalSkills;
        interviewerStats.likability += move.pointsAllocated.likability;
    }
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
  };
  return (
    <>
      <li>
        <form name="AddConnectionForm" onSubmit={handleSubmit}>
          <div class="flex gap-8 py-6">
            <div>{prop.playerRequested.googleName}</div>
            {prop.playerRequested.moves.length
              ? (
                <Button onClick={handleSubmit} type="submit">
                  {language_translate(
                    "INTERVIEW",
                    prop.playerRequesting.lastLanguage,
                  )}
                </Button>
              )
              : (
                <Button disabled>
                  {language_translate(
                    "FRIEND_NOT_READY",
                    prop.playerRequesting.lastLanguage,
                  )}
                </Button>
              )}
          </div>
        </form>
      </li>
    </>
  );
}
