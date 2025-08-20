import cloudinary from "~~/server/utils/cloudinary";
import { dbAdmin } from "../../utils/firebase-admin";
import pLimit from "p-limit";

export default defineEventHandler(async (event) => {
  try {
    const formData = await readMultipartFormData(event);

    if (!formData) {
      throw createError({
        statusCode: 400,
        statusMessage: "No form data found.",
      });
    }
    const imagesField = formData.filter((field) => field.name === "images");
    const limit = pLimit(5);

    let isNewImage = false;
    const imagesToUpload = imagesField.map((image) => {
      return limit(async () => {
        if (image.filename) {
          const result = await cloudinary.uploader.upload(
            `data:${image.type};base64,${image.data.toString("base64")}`,
            {
              folder: "portfolio/portfolios", // Optional: specify a folder
              format: "webp", // Optional: specify the desired format
            }
          );
          isNewImage = true;
          return result.secure_url;
        } else {
          return image.data.toString();
        }
      });
    });
    const body = {
      name: formData.find((field) => field.name === "name")?.data.toString(),
      description: formData
        .find((field) => field.name === "description")
        ?.data.toString(),
      url: formData.find((field) => field.name === "url")?.data.toString(),
      images: await Promise.all(imagesToUpload),
      stacks:
        formData
          .filter((field) => field.name === "stacks")
          ?.map((field) => field.data.toString()) || [],
      project_type: formData
        .find((field) => field.name === "project_type")
        ?.data.toString(),
      role: formData.find((field) => field.name === "role")?.data.toString(),
      highlight:
        formData
          .find((field) => field.name === "highlight")
          ?.data.toString() === "true",
    };

    const id = getRouterParam(event, "id");
    const docRef = dbAdmin.collection("portfolios").doc(id!);

    if (isNewImage) {
      const oldImages: string[] = await docRef
        .get()
        .then((doc) => doc.data()?.images);
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

    await docRef.update(body);
    return { message: "Document updated successfully" };
    // return false;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw createError({ statusCode: 500, statusMessage: message });
  }
});
