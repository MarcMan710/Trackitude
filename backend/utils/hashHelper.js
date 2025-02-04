// Password Hashing and Verification using bcrypt
const bcrypt = require("bcryptjs");

const hashHelper = {
  hashPassword: async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  },
  comparePassword: async (password, hash) => {
    return await bcrypt.compare(password, hash);
  }
};

module.exports = hashHelper;
