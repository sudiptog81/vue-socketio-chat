const fs = require("fs");
const path = require("path");

const init = (socket) => {
  fs.readdir(path.resolve(__dirname), (err, files) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    files.map((file) => {
      if (file === "index.js") return;
      require(path.resolve(__dirname, file))(socket);
    });
  });
};

module.exports = init;
