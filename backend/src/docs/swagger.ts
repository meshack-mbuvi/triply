import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Trip Management API",
    version: "1.0.0",
    description: "API documentation for the trip management system",
  },
  servers: [{ url: "http://localhost:8000" }],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          fullName: { type: "string", example: "John Doe" },
          email: {
            type: "string",
            format: "email",
            example: "johndoe@example.com",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2024-03-21T10:00:00Z",
          },
        },
      },
    },
  },
};

const options = {
  definition: swaggerDefinition,
  apis: ["./src/docs/routes/*.ts"], // Separate API route documentation
};

export const swaggerSpec = swaggerJSDoc(options);
