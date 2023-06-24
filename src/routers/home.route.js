const router = require("express").Router();
const { homeGet } = require("../controller/home.controller");

// const router = Router();

router.get("/", homeGet);

module.exports = router;
