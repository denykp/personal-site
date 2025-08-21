import { dbAdmin } from "../../../utils/firebase-admin";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    dbAdmin.collection("portfolios").doc(id!).delete();
    const docRef = dbAdmin.collection("portfolios").doc(id!);
    if (docRef) {
      const oldImages: string[] = JSON.parse(
        JSON.stringify(await docRef.get().then((doc) => doc.data()?.images))
      );
      await docRef.delete();
      if (oldImages.length) {
        oldImages.forEach(async (image) => {
          const publicId = cloudinary
            .url(image, { type: "upload" })
            .split("/")
            .slice(-3)
            .join("/")
            .split(".")[0];
          if (publicId) {
            await cloudinary.uploader.destroy(publicId);
          }
        });
      }
      return { message: "Document deleted successfully" };
    }
    return { message: "Document not found" };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw createError({ statusCode: 500, statusMessage: message });
  }
});
