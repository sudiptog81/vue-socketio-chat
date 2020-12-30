require("dotenv").config();

const mongoose = require("mongoose");

(() => {
  mongoose.connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        console.error("DatabaseConnectionError: ", err);
      }
    }
  );

  mongoose.connection.on(
    "error",
    console.error.bind(console, "DatabaseConnectionError:")
  );
  mongoose.connection.once("open", () => console.log("Database Connected"));
})();
