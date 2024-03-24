import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const cloudinary = cloudinary.config({
  cloud_name: "dx78ez1cn",
  api_key: "833539611812658",
  api_secret: "dVILI7XcxNCjdJtRiEc2hCmiIqI",
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "autp",
    });

    console.log("file uploaded on cloudinary", response.url);

    return response;
  } catch (err) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadOnCloudinary };
