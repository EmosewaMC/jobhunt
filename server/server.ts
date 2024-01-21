Deno.serve((_req: Request) => {
  console.log("Request received");
  console.log(_req);
  return new Response("Hello, world!", {
    status: 404,
  });
});
