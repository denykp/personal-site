// server/routes/.well-known/appspecific/[...].ts
import { defineEventHandler, setResponseStatus } from "h3";

export default defineEventHandler((event) => {
  setResponseStatus(event, 404);
  return { error: "Not Found" };
});
