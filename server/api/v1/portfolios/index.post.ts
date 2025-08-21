import cloudinary from "~~/server/utils/cloudinary";
import { dbAdmin } from "../../../utils/firebase-admin";
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
          return result.secure_url;
        } else {
          return image.data.toString();
        }
      });
    });
    // let logoPath = undefined;
    // if (logoField?.filename) {
    //   const result = await cloudinary.uploader.upload(
    //     `data:${logoField.type};base64,${logoField.data.toString("base64")}`,
    //     {
    //       folder: "portfolio/stacks", // Optional: specify a folder
    //       format: "webp", // Optional: specify the desired format
    //     }
    //   );

    //   if (result.secure_url) {
    //     logoPath = result.secure_url;
    //   }
    // } else {
    //   logoPath = logoField?.data.toString();
    // }
    const body = {
      name: formData.find((field) => field.name === "name")?.data.toString(),
      description: formData
        .find((field) => field.name === "description")
        ?.data.toString(),
      url: formData.find((field) => field.name === "url")?.data.toString(),
      images: await Promise.all(imagesToUpload),
      stacks:
        formData
          .find((field) => field.name === "stacks")
          ?.data.toString()
          .split(",") || [],
      project_type: formData
        .find((field) => field.name === "project_type")
        ?.data.toString(),
      role: formData.find((field) => field.name === "role")?.data.toString(),
      highlight:
        formData
          .find((field) => field.name === "highlight")
          ?.data.toString() === "true",
    };
    const docRef = await dbAdmin.collection("portfolios").add(body);
    return { id: docRef.id };
    // return false;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw createError({ statusCode: 500, statusMessage: message });
  }
});
