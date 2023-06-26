const router = require("express").Router();
const { postLaptop, getLaptop, deleteLaptop, updateLaptop, getOneLaptop } = require("../controller/laptops.controler/index");
// const hasRole = require("../shared/auth/has-role");
// !Validators
const genValidator = require('../shared/validator/index')
const { postLaptopsSchema } = require("../controller/laptops.controler/schemas/post-laptops");
const hasRole = require("../shared/auth/has-role");
const isLoggedIn = require("../shared/auth/is-logged-in");



router.post("/laptops" , isLoggedIn , hasRole(['admin']) , genValidator(postLaptopsSchema) , postLaptop);
router.get("/laptops" , isLoggedIn , getLaptop);
router.get("/laptops/:id" , isLoggedIn  , getOneLaptop);
router.delete("/laptops/:id" , isLoggedIn ,  hasRole(['admin']) , deleteLaptop);
router.put("/laptops/:id" , isLoggedIn ,  hasRole(['admin']) , updateLaptop);

module.exports = router;
