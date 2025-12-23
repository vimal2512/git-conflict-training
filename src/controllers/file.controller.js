import { uploadToS3, getFromS3, deleteFromS3 } from "../services/file.service.js";

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "File missing" });

    const result = await uploadToS3(req.file);
    res.json({
      message: "File uploaded successfully",
      location: result.Location,
      key: result.Key
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const downloadFile = async (req, res) => {
  try {
    const { key } = req.params;
    const data = await getFromS3(key);

    res.setHeader("Content-Type", data.ContentType);
    data.Body.pipe(res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteFile = async (req, res) => {
  try {
    const { key } = req.params;
    await deleteFromS3(key);

    res.json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
