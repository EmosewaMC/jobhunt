// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $_authError from "./routes/_authError.tsx";
import * as $_layout from "./routes/_layout.tsx";
import * as $about from "./routes/about.tsx";
import * as $api_auth_callback from "./routes/api/auth/callback.ts";
import * as $api_auth_login from "./routes/api/auth/login.ts";
import * as $api_auth_logout from "./routes/api/auth/logout.ts";
import * as $api_data_experience from "./routes/api/data/experience.ts";
import * as $api_data_game from "./routes/api/data/game.ts";
import * as $api_data_network from "./routes/api/data/network.ts";
import * as $api_data_player from "./routes/api/data/player.ts";
import * as $index from "./routes/index.tsx";
import * as $interview from "./routes/interview.tsx";
import * as $network from "./routes/network.tsx";
import * as $resume from "./routes/resume.tsx";
import * as $worldMap from "./routes/worldMap.tsx";
import * as $CreateMoveForm from "./islands/CreateMoveForm.tsx";
import * as $MapIsland from "./islands/MapIsland.tsx";
import * as $MockInterview from "./islands/MockInterview.tsx";
import * as $Nav from "./islands/Nav.tsx";
import * as $NavLoggedIn from "./islands/NavLoggedIn.tsx";
import * as $NetworkButton from "./islands/NetworkButton.tsx";
import * as $P5Canvas from "./islands/P5Canvas.tsx";
import * as $ResumeIsland from "./islands/ResumeIsland.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/_authError.tsx": $_authError,
    "./routes/_layout.tsx": $_layout,
    "./routes/about.tsx": $about,
    "./routes/api/auth/callback.ts": $api_auth_callback,
    "./routes/api/auth/login.ts": $api_auth_login,
    "./routes/api/auth/logout.ts": $api_auth_logout,
    "./routes/api/data/experience.ts": $api_data_experience,
    "./routes/api/data/game.ts": $api_data_game,
    "./routes/api/data/network.ts": $api_data_network,
    "./routes/api/data/player.ts": $api_data_player,
    "./routes/index.tsx": $index,
    "./routes/interview.tsx": $interview,
    "./routes/network.tsx": $network,
    "./routes/resume.tsx": $resume,
    "./routes/worldMap.tsx": $worldMap,
  },
  islands: {
    "./islands/CreateMoveForm.tsx": $CreateMoveForm,
    "./islands/MapIsland.tsx": $MapIsland,
    "./islands/MockInterview.tsx": $MockInterview,
    "./islands/Nav.tsx": $Nav,
    "./islands/NavLoggedIn.tsx": $NavLoggedIn,
    "./islands/NetworkButton.tsx": $NetworkButton,
    "./islands/P5Canvas.tsx": $P5Canvas,
    "./islands/ResumeIsland.tsx": $ResumeIsland,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
