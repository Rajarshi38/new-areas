const express = require("express");
const app = express();

const port = process.env.port || 8000;
app.listen(() => {
  console.log("server started on port", 5000);
});
