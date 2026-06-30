import { Router } from "express";
import express from "express";
import { mkdir, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const router = Router();
const __dirname = dirname(fileURLToPath(import.meta.url));
const uploadsDir = join(__dirname, "..", "uploads");

router.post(
  "/",
  expressRawImage(),
  async (request, response) => {
    if (!request.body?.length) {
      return response.status(400).json({ message: "Nenhuma imagem enviada." });
    }

    const originalName = request.headers["x-file-name"] || "imagem.jpg";
    const extension = extname(String(originalName)) || ".jpg";
    const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;
    const filePath = join(uploadsDir, fileName);

    await mkdir(uploadsDir, { recursive: true });
    await writeFile(filePath, request.body);

    return response.status(201).json({
      imageUrl: `http://localhost:3333/uploads/${fileName}`,
    });
  },
);

function expressRawImage() {
  return express.raw({
    type: ["image/png", "image/jpeg", "image/webp", "image/gif", "application/octet-stream"],
    limit: "5mb",
  });
}

export default router;
