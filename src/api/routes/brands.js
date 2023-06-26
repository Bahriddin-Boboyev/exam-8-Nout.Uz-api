const genValidator = require("../validation");
const { isLoggedIn, uploads } = require("../middlewares");
const router = require("express").Router();

const {
  postBrands,
  getBrands,
  getSingleBrands,
  updateBrands,
  deleteBrands,
} = require("../controllers");
//
const {
  addBrandSchema,
  updateBrandSchema,
} = require("../controllers/brands/schema");
//

const mPostBrands = [uploads, isLoggedIn, genValidator(addBrandSchema)];
const mUpdateBrands = [uploads, isLoggedIn, genValidator(updateBrandSchema)];
const mDeleteBrands = [isLoggedIn];
//
router.post("/brands", mPostBrands, postBrands);
router.get("/brands", getBrands);
router.get("/brands/:brand", getSingleBrands);
router.patch("/brands/:id", mUpdateBrands, updateBrands);
router.delete("/brands/:id", mDeleteBrands, deleteBrands);

module.exports = router;
