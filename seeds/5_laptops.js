const config = require("../src/config");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const image_vivobook = `http://localhost:${config.port}/images/vivobook.jpg`;
  const image_msi = `http://localhost:${config.port}/images/msi.jpg`;
  const image_lenovo = `http://localhost:${config.port}/images/lenovo.jpg`;
  // Deletes ALL existing entries
  await knex("laptops").del();
  await knex("laptops").insert([
    {
      name: "Asus VivoBook 16 (R5-7530U)",
      description:
        "Добро пожаловать в магазин Nout.uz, посвященную ноутбуку Asus VivoBook 16 (R5-7530U)",
      price: 7580500,
      image: image_vivobook,
      brand_id: 1,
      model_id: 1,
      category_id: 1,
    },
    {
      name: "MSI Stealth 17 Studio (i9-13900H/RTX4080)",
      description:
        "Добро пожаловать в магазин Nout.uz, посвященную ноутбуку MSI Stealth 17 Studio (i9-13900H/RTX4080)",
      price: 6584600,
      image: image_msi,
      brand_id: 2,
      model_id: 2,
      category_id: 1,
    },
    {
      name: "Lenovo IdeaPad Gaming 3 (i5-12450H/RTX3050)",
      description:
        "Добро пожаловать в магазин Nout.uz, посвященную ноутбуку Lenovo IdeaPad Gaming 3 (i5-12450H/RTX3050)",
      price: 7623000,
      image: image_lenovo,
      brand_id: 3,
      model_id: 3,
      category_id: 2,
    },
  ]);
};
