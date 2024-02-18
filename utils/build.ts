/** This cursed function only runs when NOT on the build. When it's build mode, it returnds undefined */
export function noRunOnBuild<T>(input: () => T): T {
    if (Deno.env.get("BUILD")) return undefined as T;
    return input();
  }