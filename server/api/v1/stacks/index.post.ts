import cloudinary from "~~/server/utils/cloudinary";
import { dbAdmin } from "../../../utils/firebase-admin";

export default defineEventHandler(async (event) => {
  try {
    const formData = await readMultipartFormData(event);

    if (!formData) {
      throw createError({
        statusCode: 400,
        statusMessage: "No form data found.",
      });
    }
    const logoField = formData.find((field) => field.name === "logo");
    let logoPath = undefined;
    if (logoField?.filename) {
      const result = await cloudinary.uploader.upload(
        `data:${logoField.type};base64,${logoField.data.toString("base64")}`,
        {
          folder: "portfolio/stacks", // Optional: specify a folder
          format: "webp", // Optional: specify the desired format
        }
      );

      if (result.secure_url) {
        logoPath = result.secure_url;
      }
    } else {
      logoPath = logoField?.data.toString();
    }
    const body = {
      name: formData.find((field) => field.name === "name")?.data.toString(),
      url: formData.find((field) => field.name === "url")?.data.toString(),
      logo: logoPath,
      color: formData.find((field) => field.name === "color")?.data.toString(),
      highlight:
        formData
          .find((field) => field.name === "highlight")
          ?.data.toString() === "true",
    };

    const docRef = await dbAdmin.collection("stacks").add(body);
    return { id: docRef.id };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw createError({ statusCode: 500, statusMessage: message });
  }
});
