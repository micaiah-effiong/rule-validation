const http = require("http");
const express = require("express");
const validateRule = require("./validateRuleController");

// environment variables
const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// First route
app.get("/", (req, res, next) => {
  const data = {
    name: "Micah Effiong",
    github: "@micaiah-effiong",
    email: "micaiah.effiong@gmail.com",
    mobile: "09024420018",
    twitter: "@micaiah_effiong",
  };

  res.json({
    message: "My Rule-Validation API",
    status: "success",
    data,
  });
});

// Rule validator route
app.post("/validate-rule", validateRule);

app.use((err, req, res, next) => {
  console.log(err);
  if (req.path === "/validate-rule") {
    return res.status(400).json({
      message: "Invalid JSON payload passed.",
      status: "error",
      data: null,
    });
  }

  return res.status(500).json({});
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
