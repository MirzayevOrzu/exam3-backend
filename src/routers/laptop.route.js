const router = require("express").Router();
const { postLaptop, getLaptop } = require("../controller/laptops.controler/index");
// const hasRole = require("../shared/auth/has-role");
// !Validators
const genValidator = require('../shared/validator/index')
const { postLaptopsSchema } = require("../controller/laptops.controler/schemas/post-laptops");
const hasRole = require("../shared/auth/has-role");
const isLoggedIn = require("../shared/auth/is-logged-in");



router.post("/laptops" , hasRole(['admin']) , genValidator(postLaptopsSchema) , postLaptop);
router.get("/laptops" , isLoggedIn , getLaptop);

module.exports = router;
