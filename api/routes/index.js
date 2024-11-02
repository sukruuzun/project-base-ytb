express = require('express');
var router = express.Router();

const config = require("../config");

const fs = require("fs");

// Bulunduğu klasördeki (routes) tüm dosyaları okur.
let routes = fs.readdirSync(__dirname);

// Tüm dosyaları döngüye alır ve gerekli rotaları ekler.
for (let route of routes) {
  // "index.js" hariç diğer tüm `.js` dosyalarını yükle.
  if (route.includes(".js") && route != "index.js") {
    router.use("/" + route.replace(".js", ""), require('./' + route));
  }
}

module.exports = router;
