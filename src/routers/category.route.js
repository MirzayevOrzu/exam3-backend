const router = require("express").Router();
// !Validators
const genValidator = require("../shared/validator/index");
const isLoggedIn = require("../shared/auth/is-logged-in");
const hasRole = require("../shared/auth/has-role");
const {
  postCategory,
  getCategory,
  getBrands,
  getModels,
} = require("../controller/category.controller");
const {
  postCategorySchema,
} = require("../controller/category.controller/schemas");

const pCategoryValid = genValidator(postCategorySchema);

router.post(
  "/categories",
  [isLoggedIn, hasRole(["admin"]), pCategoryValid],
  postCategory
);
router.get("/categories", isLoggedIn, getCategory);
router.get("/brands", isLoggedIn, getBrands);
router.get("/models", isLoggedIn, getModels);

module.exports = router;
