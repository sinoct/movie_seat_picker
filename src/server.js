import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "test",
  });
});

app.listen(3000, () => {
  console.log("Express started");
});
