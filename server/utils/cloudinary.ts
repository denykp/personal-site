// server/utils/cloudinary.ts

import { v2 as cloudinary } from "cloudinary";
import { useRuntimeConfig } from "#imports";

const { cloudinary: cloudinaryConfig } = useRuntimeConfig();

// Configure Cloudinary once when the module is imported
const cloud = () => {
  cloudinary.config({
    cloud_name: cloudinaryConfig.cloudName,
    api_key: cloudinaryConfig.apiKey,
    api_secret: cloudinaryConfig.apiSecret,
    secure: true,
  });

  return cloudinary;
};

export { cloud };
