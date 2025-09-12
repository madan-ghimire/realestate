import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Real Estate Swagger API docs",
      version: "1.0.0",
      description:
        "API documentation of Real Estate in Node.js with JWT authentication",
    },
    servers: [
      {
        url: "/",
        description: "API Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter JWT token here",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              description: "The auto-generated id of the user",
            },
            name: {
              type: "string",
              description: "The name of the user",
            },
            email: {
              type: "string",
              format: "email",
              description: "The email of the user",
            },
            role: {
              type: "string",
              enum: ["admin", "user"],
              description: "The role of the user",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "The date the user was created",
            },
          },
        },
        // Add other schemas as needed
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

export default swaggerJsDoc(swaggerOptions);
