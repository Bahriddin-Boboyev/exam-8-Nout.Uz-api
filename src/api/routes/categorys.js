const router = require("express").Router();
const { isLoggedIn } = require("../middlewares");
const genValidator = require("../validation");
//
const {
  getCategory,
  postCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers");
//
const {
  addCategorySchema,
  updateCategorySchema,
} = require("../controllers/category/schemas");
//
const mPostCategory = [isLoggedIn, genValidator(addCategorySchema)];
const mUpdateCategory = [isLoggedIn, genValidator(updateCategorySchema)];
const mDeleteCategory = [isLoggedIn];
//
router.post("/categorys", mPostCategory, postCategory);
router.get("/categorys", getCategory);
router.get("/categorys/:id", getSingleCategory);
router.patch("/categorys/:id", mUpdateCategory, updateCategory);
router.delete("/categorys/:id", mDeleteCategory, deleteCategory);

module.exports = router;
