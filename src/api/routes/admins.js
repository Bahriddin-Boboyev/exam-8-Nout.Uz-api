const router = require("express").Router();
const genValidator = require("../validation");
const { isLoggedIn, uploads } = require("../middlewares");
const {
  addAdmin,
  loginAdmin,
  getAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../controllers");
//
const {
  addAdminSchema,
  loginAdminSchema,
  updateAdminSchema,
} = require("../controllers/admins/schemas");

//
const mAddAmin = [uploads, isLoggedIn, genValidator(addAdminSchema)];
const mLoginAdmin = [genValidator(loginAdminSchema)];
const mGetAdmin = [isLoggedIn];
const mUpdateAdmin = [uploads, isLoggedIn, genValidator(updateAdminSchema)];
const mDeleteAdmin = [isLoggedIn];
//
router.post("/admins/", mAddAmin, addAdmin);
router.post("/admins/login", mLoginAdmin, loginAdmin);
router.get("/admins", mGetAdmin, getAdmins);
router.get("/admins/:id", mGetAdmin, getSingleAdmin);
router.patch("/admins/:id", mUpdateAdmin, updateAdmin);
router.delete("/admins/:id", mDeleteAdmin, deleteAdmin);

module.exports = router;
