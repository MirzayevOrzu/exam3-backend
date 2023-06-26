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
  deleteCategory,
  postModels,
  postBrands,
} = require("../controller/category.controller");
const {
  postCategorySchema,
  postModelssSchema,
  postBrandSchema,
} = require("../controller/category.controller/schemas");

const pCategoryValid = genValidator(postCategorySchema);
const pBrandsValid = genValidator(postBrandSchema);
const pModelsyValid = genValidator(postModelssSchema);

router.post(
  "/categories",
  [isLoggedIn, hasRole(["admin"]), pCategoryValid],
  postCategory
);
router.get("/categories", isLoggedIn, getCategory);

router.delete(
  "/categories/:id",
  [isLoggedIn, hasRole(["admin"])],
  deleteCategory
);




router.get("/brands", isLoggedIn, getBrands);

router.post(
  "/brands",
  [isLoggedIn, hasRole(["admin"]) , pBrandsValid],
  postBrands
);
router.get("/models", isLoggedIn, getModels);
router.post(
  "/models",
  [isLoggedIn, hasRole(["admin"]), pModelsyValid],
  postModels
);

module.exports = router;
