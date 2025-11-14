const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "School Management System API v~0.0.1",
      version: "1.0.0",
      description: "Modular backend with RBAC and admin panel separation",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local server",
      },
      {
        url: "https://school-management-backend-tho4.onrender.com",
        description: "Production server",
      },
    ],
  },
  apis: ["./routes/**/*.js"],
};

module.exports = swaggerJsdoc(options);
