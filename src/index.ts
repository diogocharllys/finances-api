import express from "express";
import { Request, Response, NextFunction } from "express";
import routes from "./routes/index";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs-swagger/swagger.config";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(routes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

app.get("/", (_, res) => {
  res.send("Finances API is running");
});

const PORT = process.env.PORT || 3333;

// Não inicia o servidor durante os testes (supertest usa a app diretamente).
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
}

export default app;
