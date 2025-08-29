import { dbAdmin } from "../../utils/firebase-admin";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const highlight = query.highlight === "true";
    const role = String(query.role || "");
    const stacks = JSON.parse(String(query.stacks || "[]"));
    let querySnapshot: FirebaseFirestore.Query =
      dbAdmin.collection("portfolios");
    if (highlight) {
      querySnapshot = querySnapshot.where("highlight", "==", true);
    }
    if (role) {
      querySnapshot = querySnapshot.where("role", "==", role);
    }
    if (stacks.length > 0) {
      querySnapshot = querySnapshot.where(
        "stacks",
        "array-contains-any",
        stacks
      );
    }
    const snapshot = await querySnapshot.get();
    const portfolios: Portfolio[] = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Prioritize highlighted
    portfolios.sort((a, b) =>
      a.highlight === b.highlight ? 0 : a.highlight ? -1 : 1
    );

    // Collect Stack Ids
    const stackIds = [...new Set(portfolios.flatMap((p) => p.stacks))];
    if (stackIds.length === 0) {
      return portfolios; // No stacks to map
    }

    // Batch read stacks
    const stackRefs = stackIds.map((id) =>
      dbAdmin.collection("stacks").doc(id)
    );
    const stacksSnapshot = await dbAdmin.getAll(...stackRefs);
    const stacksMap = new Map();
    stacksSnapshot.forEach((doc) => {
      stacksMap.set(doc.id, doc.data());
    });

    // Map stack names to portfolios
    const portfoliosWithStacks = portfolios.map((p) => {
      const stacks = p.stacks.map((id: string) => ({
        id,
        ...(stacksMap.get(id) || {}), // Handle cases where a stack ID doesn't exist
      }));
      return { ...p, stacks };
    });

    return portfoliosWithStacks as PortfolioData[];
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw createError({ statusCode: 500, statusMessage: message });
  }
});
