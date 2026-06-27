import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import recipesRoutes from "./routes/recipes.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

app.get("/api/health", (request, response) => {
  response.json({
    message: "API Receitas Food funcionando corretamente.",
    status: "ok",
  });
});

app.use("/api/recipes", recipesRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`API Receitas Food rodando na porta ${PORT}`);
});
