import { cloud } from "~~/server/utils/cloudinary";
import { dbAdmin } from "../../utils/firebase-admin";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    const docRef = dbAdmin.collection("stacks").doc(id!);

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
      const result = await cloud().uploader.upload(
        `data:${logoField.type};base64,${logoField.data.toString("base64")}`,
        {
          folder: "portfolio/stacks", // Optional: specify a folder
          transformation: {
            format: "webp", // Optional: specify the desired format
          },
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
    };
    await docRef.update(body);
    return { message: "Document updated successfully" };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw createError({ statusCode: 500, statusMessage: message });
  }
});
