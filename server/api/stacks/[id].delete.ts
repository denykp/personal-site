import { dbAdmin } from "../../utils/firebase-admin";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    dbAdmin.collection("stacks").doc(id!).delete();
    const docRef = dbAdmin.collection("stacks").doc(id!);
    if (docRef) {
      await docRef.delete();
      return { message: "Document deleted successfully" };
    }
    return { message: "Document not found" };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw createError({ statusCode: 500, statusMessage: message });
  }
});
