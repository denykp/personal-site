import { dbAdmin } from "../../utils/firebase-admin";

export default defineEventHandler(async () => {
  try {
    const snapshot = await dbAdmin.collection("stacks").get();
    const data = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw createError({ statusCode: 500, statusMessage: message });
  }
});
