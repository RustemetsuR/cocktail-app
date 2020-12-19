const path = require("path");

const rootPath = __dirname;

module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, "public/uploads"),
  db: {
    name: 'cocktail-app',
    url: 'mongodb://localhost',
  },
  fb: {
    appId: "1066173810511403",
    appSecret: "8704a4fb4087721f4c2767f3480d997d"
  }
};