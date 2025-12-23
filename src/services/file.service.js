import fs from "fs";
import path from "path";
import s3 from "../config/aws.js";
import { Upload } from "@aws-sdk/lib-storage";
import { GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

export const uploadToS3 = async (file) => {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${Date.now()}-${file.originalname}`,
    Body: fileStream,
    ContentType: file.mimetype
  };

  const uploader = new Upload({
    client: s3,
    params: uploadParams
  });

  const result = await uploader.done();

  // Remove file from local storage
  fs.unlinkSync(file.path);

  return result;
};

export const getFromS3 = async (key) => {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key
  });

  return await s3.send(command);
};

export const deleteFromS3 = async (key) => {
  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key
  });

  return await s3.send(command);
};
