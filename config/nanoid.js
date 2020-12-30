const { nanoid } = require("nanoid");
const { customAlphabet } = require("nanoid");

module.exports = {
  nanoid,
  userId: customAlphabet("1234567890abcdef", 4),
};
