import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { version } from "../../package.json";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce Inventory API",
      version,
      description: "API for managing products in an ecommerce store",
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
    security: {
      bearerAuth: [],
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local development server",
      },
    ],
  },
  apis: ["./src/app/**/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
  //Swagger page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  //Docs in JSON format
  app.get("/docs.json", (_req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.json(swaggerSpec);
  });

  console.log(`Swagger docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
