const router = require("express").Router();
const { isLoggedIn, uploads } = require("../middlewares");
const genValidator = require("../validation");
//
const {
  addModelSchema,
  updateModelSchema,
} = require("../controllers/models/schemas");
//
const {
  postModel,
  getModel,
  getSingleModel,
  updateModel,
  deleteModel,
} = require("../controllers/models");
//
const mPostModel = [uploads, isLoggedIn, genValidator(addModelSchema)];
const mUpdateModel = [uploads, isLoggedIn, genValidator(updateModelSchema)];
const mDeleteModel = [isLoggedIn];
//
router.post("/models", mPostModel, postModel);
router.get("/models", getModel);
router.get("/models/:id", getSingleModel);
router.patch("/models/:id", mUpdateModel, updateModel);
router.delete("/models/:id", mDeleteModel, deleteModel);

module.exports = router;
