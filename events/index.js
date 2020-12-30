const fs = require("fs");
const path = require("path");

const init = () => {
  fs.readdir(path.resolve(__dirname), (err, files) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    files.map((file) => {
      if (file === "index.js") return;
      module.exports[file] = require(path.resolve(__dirname, file));
    });
  });
};

module.exports = init;
