import { dbAdmin } from "../../../utils/firebase-admin";

export default defineEventHandler(async () => {
  try {
    const snapshot = await dbAdmin.collection("portfolios").get();
    const portfolios: Portfolio[] = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));

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
