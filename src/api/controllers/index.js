const {
  addAdmin,
  loginAdmin,
  getAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
} = require("./admins");
//
const {
  postBrands,
  getBrands,
  getSingleBrands,
  updateBrands,
  deleteBrands,
} = require("./brands");
//
const {
  getCategory,
  postCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} = require("./category");
//
const {
  addLaptops,
  getLaptops,
  getSingleLaptops,
  updateLaptops,
  deleteLaptops,
} = require("./laptops");
//
const {
  postModel,
  getModel,
  getSingleModel,
  updateModel,
  deleteModel,
} = require("./models");

module.exports = {
  addAdmin,
  loginAdmin,
  getAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
  //
  postBrands,
  getSingleBrands,
  getBrands,
  updateBrands,
  deleteBrands,
  //
  getCategory,
  postCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
  //
  postModel,
  getModel,
  getSingleModel,
  updateModel,
  deleteModel,
  //
  addLaptops,
  getLaptops,
  getSingleLaptops,
  updateLaptops,
  deleteLaptops,
};
