const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const csrProjectRoutes = require("./routes/csrProjectRoutes");
const blogRoutes = require("./routes/blogRoutes");
const ecosystemRoutes = require("./routes/ecosystemRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
	res.status(200).json({ status: "ok", service: "impactly-api" });
});

app.use("/api/csr-project", csrProjectRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/ecosystem", ecosystemRoutes);

app.use((req, res) => {
	res.status(404).json({ message: "Resource not found" });
});

app.listen(PORT, () => {
	console.log(`Impactly backend running on port ${PORT}`);
});
