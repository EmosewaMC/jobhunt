#!/bin/sh

# Install deno
curl -fsSL https://deno.land/x/install/install.sh | sh

# Install pagic
/cmpm171-game/.deno/bin/deno install --unstable --allow-read --allow-write --allow-net https://deno.land/x/pagic/mod.ts

# Pagic build
/cmpm171-game/.deno/bin/deno run --unstable --allow-read --allow-write --allow-net --allow-env --allow-run https://deno.land/x/pagic/mod.ts build
