const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swagger");

dotenv.config();
connectDB();

// ✅ Allowed origins (frontend + local dev)
const allowedOrigins = [
  "https://school-management-admin-q82l.vercel.app",
  "http://localhost:5173",
];

app.use(express.json());

// ✅ Single CORS setup
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/students", require("./routes/student.routes"));
app.use("/api/teachers", require("./routes/teacher.routes"));
app.use("/api/classes", require("./routes/class.routes"));
app.use("/api/attendance", require("./routes/attendance.routes"));
app.use("/api/exams", require("./routes/exam.routes"));
app.use("/api/results", require("./routes/result.routes"));
app.use("/api/notices", require("./routes/notice.routes"));
app.use("/api/timetable", require("./routes/timetable.routes"));
app.use("/api/library", require("./routes/library.routes"));
app.use("/api/fees", require("./routes/fee.routes"));
app.use("/api/transport", require("./routes/transport.routes"));
app.use("/api/dashboard", require("./routes/dashboard.routes"));

module.exports = app;
