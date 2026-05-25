import swaggerJSDoc from "swagger-jsdoc";

export const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Finances API",
      version: "1.0.0",
      description: "API for managing financial transactions",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  // src/*.ts em desenvolvimento, dist/*.js em produção (o container só tem dist/)
  apis: ["src/routes/*.ts", "dist/routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
