import { dbAdmin } from "../../../utils/firebase-admin";
import cloudinary from "~~/server/utils/cloudinary";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    dbAdmin.collection("stacks").doc(id!);
    const docRef = dbAdmin.collection("stacks").doc(id!);
    if (docRef) {
      const oldLogo: string = await docRef
        .get()
        .then((doc) => doc.data()?.logo);
      await docRef.delete();
      if (oldLogo) {
        const publicId = cloudinary
          .url(oldLogo, { type: "upload" })
          .split("/")
          .slice(-3)
          .join("/")
          .split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }
      return { message: "Document deleted successfully" };
    }
    return { message: "Document not found" };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw createError({ statusCode: 500, statusMessage: message });
  }
});
