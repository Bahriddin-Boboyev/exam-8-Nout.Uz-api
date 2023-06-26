const express = require("express");
const db = require("../../db");
const { BadRequest, NotFoundError } = require("../../helpers");
const config = require("../../../config");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * POST
 */

const postBrands = async (req, res, next) => {
  try {
    const { name } = req.body;
    const existing = await db("brands")
      .where({ name })
      .select("id", "name", "image")
      .first();

    if (existing) {
      throw new BadRequest("Bu nomli brend allaqachon mavjud!");
    }

    const image_name = `http://localhost:${config.port}/images/${req.file.filename}`;
    const brand = await db("brands")
      .insert({ name, image: image_name })
      .returning("*");

    res.status(201).json({ brand });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * GET
 */

const getBrands = async (req, res, next) => {
  try {
    const existing = await db("brands").select("id", "name").returning("*");

    if (!existing?.length) {
      throw new NotFoundError("brands not found.");
    }

    res.status(201).json({ brands: existing });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * GET SINGLE
 */
/* bu yerda 1ta brand ga tegishli kompyuterlarni va modelarni olish mumkin  */
const getSingleBrands = async (req, res, next) => {
  try {
    const { brand } = req.params;

    let existing = db("brands")
      .select("id", "name", "image")
      .returning("*")
      .andWhereILike("name", `${brand}`);

    existing = await existing;
    if (!existing?.length) {
      throw new NotFoundError("brands not found.");
    }

    const result = await db("brands")
      .leftJoin("laptops AS laptop", "laptop.brand_id", "brands.id")
      .leftJoin("models AS model_laptop", "model_laptop.id", "laptop.model_id")
      .select(
        "brands.id",
        "brands.name",
        "brands.image",
        db.raw(`
        json_agg(json_build_object(
          'id', laptop.id,
          'laptop', laptop.name,
          'description', laptop.description,
          'image', laptop.image,
          'price', laptop.price,
          'model', model_laptop.name
         )) AS laptops`)
      )
      .where({ "brands.name": existing[0].name })
      .groupBy("brands.id")
      .first();

    res.status(200).json({ brand: result });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * UPDATE BRANDS
 */

const updateBrands = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { ...changes } = req.body;
    const existing = await db("brands")
      .where({ id })
      .select("id", "name", "image")
      .first();

    if (!existing) {
      throw new NotFoundError("brands not found.");
    }

    if (req?.file?.filename) {
      changes.image = `http://localhost:${config.port}/images/${req.file.filename}`;
    }

    const updated = await db("brands")
      .where({ id })
      .update({ ...changes })
      .returning(["id", "name", "image"]);

    res.status(200).json({ update: updated[0] });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * GET SINGLE
 */

const deleteBrands = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await db("brands")
      .where({ id })
      .select("id", "name", "image")
      .first();

    if (!existing) {
      throw new NotFoundError("brands not found.");
    }

    const deleted = await db("brands")
      .where({ id })
      .delete()
      .returning(["id", "name", "image"]);

    res.status(200).json({
      deleted: deleted[0],
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postBrands,
  getBrands,
  getSingleBrands,
  updateBrands,
  deleteBrands,
};
