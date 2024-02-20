// layouts/asyncLayout.tsx

import { FunctionComponent, h } from "preact";
import { Player } from "gameData/playerStats.ts";

interface AsyncLayoutProps {
  player: Player; // Passed in pre-fetched data
  children: (data: { player: Player }) => h.JSX.Element;
}

const AsyncLayout: FunctionComponent<AsyncLayoutProps> = ({ player, children }) => {
  // Directly use the pre-fetched `player` data
  return children({ player });
};

export default AsyncLayout;
