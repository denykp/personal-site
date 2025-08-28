import { dbAdmin } from "../../utils/firebase-admin";

export default defineEventHandler(async (event) => {
  try {
    const snapshot = await dbAdmin.collection("stacks").get();
    const data: Stack[] = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // Prioritize highlighted
    const highlighted = data
      .filter((s) => s.highlight)
      .sort((a, b) => (a.name === b.name ? 0 : a.name > b.name ? -1 : 1));
    const nonHighlighted = data.filter((s) => !s.highlight);
    return [...highlighted, ...nonHighlighted] as Stack[];
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw createError({ statusCode: 500, statusMessage: message });
  }
});
