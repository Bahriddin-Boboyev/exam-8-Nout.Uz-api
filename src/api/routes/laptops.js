const router = require("express").Router();
const { isLoggedIn, uploads } = require("../middlewares");
const genValidator = require("../validation");
//
const {
  addLaptops,
  getLaptops,
  getSingleLaptops,
  updateLaptops,
  deleteLaptops,
} = require("../controllers/laptops");
//
const {
  addLaptopsSchema,
  updateLaptopsSchema,
} = require("../controllers/laptops/schemas");
//
const mAddLaptops = [uploads, isLoggedIn, genValidator(addLaptopsSchema)];
const mUpdateLaptops = [uploads, isLoggedIn, genValidator(updateLaptopsSchema)];
const mDeleteLaptops = [isLoggedIn];
//
router.post("/laptops", mAddLaptops, addLaptops);
router.get("/laptops", getLaptops);
router.get("/laptops/:id", getSingleLaptops);
router.patch("/laptops/:id", mUpdateLaptops, updateLaptops);
router.delete("/laptops/:id", mDeleteLaptops, deleteLaptops);

//
module.exports = router;
