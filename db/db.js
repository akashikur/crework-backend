const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MONGODB CONNECTED");
  })
  .catch((e) => {
    console.log("failed to connect", e);
  });
