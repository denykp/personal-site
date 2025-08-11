// server/utils/cloudinary.ts

import { v2 as cloudinary } from "cloudinary";
import { useRuntimeConfig } from "#imports";

const { cloudinary: cloudinaryConfig } = useRuntimeConfig();
console.log("cloudinaryConfig", cloudinaryConfig);

// Configure Cloudinary once when the module is imported
cloudinary.config({
  cloud_name: cloudinaryConfig.cloudName,
  api_key: cloudinaryConfig.apiKey,
  api_secret: cloudinaryConfig.apiSecret,
  secure: true,
});

export default cloudinary;
