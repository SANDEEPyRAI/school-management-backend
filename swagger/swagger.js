const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "School Management System API",
      version: "1.0.0",
      description: "Modular backend with RBAC and admin panel separation",
    },
    servers: [{ url: "http://localhost:5000" }],
  },
  apis: ["./routes/**/*.js"],
};

module.exports = swaggerJsdoc(options);
