const router = require("express").Router();
const { postLaptop } = require("../controller/laptops.controler/index");
// !Validators
const genValidator = require('../shared/validator/index')
const { postUser, loginUser, registerAdmin, getOneUser } = require("../controller/users.controler");
const { postUsersScheme } = require("../controller/users.controler/schemas/post-users");
const { loginUsersScheme } = require("../controller/users.controler/schemas/login-users");
const hasRole = require("../shared/auth/has-role");
const isLoggedIn = require("../shared/auth/is-logged-in");


const usersPostValidators = genValidator(postUsersScheme)
const usersLoginValidators = genValidator(loginUsersScheme)

router.post("/register" , usersPostValidators , postUser);
router.post("/login" , usersLoginValidators , loginUser);
router.post("/registerAdmin" , isLoggedIn , hasRole(['admin']), usersPostValidators , registerAdmin);
router.get("/user/:id"  ,isLoggedIn , hasRole(['admin' , 'user']) , getOneUser);


module.exports = router;
