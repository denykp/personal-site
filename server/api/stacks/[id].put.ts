import { dbAdmin } from "../../utils/firebase-admin";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    const body = await readBody(event);
    const docRef = dbAdmin.collection("stacks").doc(id!);
    await docRef.update(body);
    return { message: "Document updated successfully" };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw createError({ statusCode: 500, statusMessage: message });
  }
});
