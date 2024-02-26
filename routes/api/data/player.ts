import { Handlers } from "$fresh/server.ts";
import { deno_kv } from "$utils/db.ts"; // Assuming this is your custom module for database interactions


export const handler: Handlers = {
  async POST(request) {
    // Parse the request body as FormData
    const formData = await request.formData();

    // Convert FormData to a regular object for easier handling
    const moveData: { [key: string]: any } = {};
    for (const [key, value] of formData.entries()) {
        moveData[`${key}`] = value;
    }

    // Generate a unique key for this entry (e.g., using a timestamp or UUID)

    try {
        // Write the move data to the database using deno_kv
        // await deno_kv.set();

        // Respond with a success message
        console.log("Move data stored successfully:", moveData);
        return new Response(JSON.stringify({ message: "Move data stored successfully" }), {
            headers: { "Content-Type": "application/json" },
            status: 200, // OK
        });
    } catch (error) {
      console.error("Error writing move to deno_kv:", error);

      // Respond with an error message
      return new Response(JSON.stringify({ error: "Failed to store move data" }), {
        headers: { "Content-Type": "application/json" },
        status: 500, // Internal Server Error
      });
    }
  },
};
