const router = require("express").Router();
const adminsRoutes = require("./admins");
const brandsRoutes = require("./brands");
const categorysRoutes = require("./categorys");
const modelsRoutes = require("./models");
const laptopsRoutes = require("./laptops");
const { BadRequest, NotFoundError } = require("../helpers");

// ROUTES
router.use(adminsRoutes);
router.use(brandsRoutes);
router.use(categorysRoutes);
router.use(modelsRoutes);
router.use(laptopsRoutes);

// ERROR HANDLING
router.use((err, req, res, next) => {
  let status = 500;
  if (err instanceof NotFoundError) {
    status = 404;
    return res.status(status).json({ error: err.message });
  }

  if (err instanceof BadRequest) {
    status = 400;
    return res.status(status).json({ error: err.message });
  }

  res.status(status).json({ error: err.message });
});

module.exports = router;
