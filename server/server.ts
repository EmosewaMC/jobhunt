Deno.serve((_req: Request) => {
  console.log("Request received");
  console.log(_req);
  return new Response("Hello, world!", {
    status: 404,
    headers: {
      "content-type": "text/plain",
      "positionX": "99",
      "positionY": "99",
      "positionZ": "99",
    },
  });
});
