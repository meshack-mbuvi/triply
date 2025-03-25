import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Trip Management API",
    version: "1.0.0",
    description: "API documentation for the trip management system",
  },
  servers: [
    { url: "http://localhost:8000" },
    { url: "https://triply-api.vercel.app" },
  ],
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
          bio: { type: "string", example: "A full stack software developer" },
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

      Trip: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          title: { type: "string", example: "Beach Vacation" },
          description: {
            type: "string",
            example: "A relaxing trip to the Maldives.",
          },
          destination: { type: "string", example: "Maldives" },
          startDate: { type: "string", format: "date", example: "2025-06-01" },
          endDate: { type: "string", format: "date", example: "2025-06-10" },
          price: { type: "number", example: 1500.0 },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2025-03-22T12:00:00Z",
          },
          user: { $ref: "#/components/schemas/User" }, // Link trip to a user
        },
      },
    },
  },
};

const isProd = process.env.NODE_ENV === "production";

const options = {
  definition: swaggerDefinition,
  apis: isProd
    ? ["./dist/docs/routes/**/*.js"] // Use compiled .js files in production
    : ["./src/docs/routes/**/*.ts"], // Use .ts files locally
};

export const swaggerSpec = swaggerJSDoc(options);
