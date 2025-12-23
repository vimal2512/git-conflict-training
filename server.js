import express from "express";
import dotenv from "dotenv";
import fileRoutes from "./src/routes/file.routes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/file", fileRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`S3 File Upload Server running on port ${PORT}`));
