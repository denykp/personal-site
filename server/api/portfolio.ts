import { dbAdmin } from "../utils/firebase-admin";

export default defineEventHandler(async (event) => {
  if (event.method === "GET") {
    try {
      const snapshot = await dbAdmin.collection("portfolio").get();
      const data = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return data;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw createError({ statusCode: 500, statusMessage: message });
    }
  } else if (event.method === "POST") {
    try {
      const body = await readBody(event);
      const docRef = await dbAdmin.collection("portfolio").add(body);
      return { id: docRef.id };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw createError({ statusCode: 500, statusMessage: message });
    }
  } else {
    throw createError({ statusCode: 405, statusMessage: "Method not allowed" });
  }
});
