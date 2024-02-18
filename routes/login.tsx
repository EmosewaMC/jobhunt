import GoogleIcon from "icons/brand-google.tsx";
import { getUser } from "$utils/get_user.ts";
import { redirect } from "$utils/response.ts";

export default async function Login(req: Request) {
  const user = await getUser(req);
  if (user) return redirect("/");

  return (
    <>
      <header class="w-screen p-4 shadow fixed flex gap-4">
        <a href="/" class="font-titan-one text-xl uppercase">Risposta</a>
      </header>
      <div class="w-screen h-screen flex flex-col gap-4 justify-center items-center">
        <div class="text-center">
          <h1 class="text-4xl font-bold">Welcome Back!</h1>
          <p>We missed you. Sign in to continue.</p>
        </div>
        <a
          href="/api/auth/login"
          class="px-4 py-2 border rounded flex gap-4 hover:bg-gray-200 transition-all"
        >
          <GoogleIcon /> Continue with Google
        </a>
      </div>
    </>
  );
}
