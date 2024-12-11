const app = require("./src/app");

const PORT = process.env.PORT;

const server = app.listen(PORT || 3001, () => {
  console.log(`eCommerce starts with port ${PORT}`);
});

// ctrl + c: close server
process.on("SIGINT", () => {
  server.close(() => console.log("Exit server"));
});
