// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.

import { assertEquals } from "std/assert/mod.ts";
import * as mod from "./mod.ts";

Deno.test({
  name: "/mod.ts has expected exports",
  fn() {
    assertEquals(typeof mod.Chart, "function");
    assertEquals(typeof mod.renderChart, "function");
  },
});
