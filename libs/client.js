import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: "nom",
  apiKey: process.env.API_KEY,
});



