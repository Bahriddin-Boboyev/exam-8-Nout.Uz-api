const express = require("express");
const config = require("../../../config");
const db = require("../../db");
const { BadRequest, NotFoundError } = require("../../helpers");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * POST
 */

const addLaptops = async (req, res, next) => {
  try {
    const { name, description, price, brand_id, category_id, model_id } =
      req.body;

    const existing = await db("laptops").where({ name }).select("name").first();

    if (existing) {
      throw new BadRequest("Laptop alaqachon mavjud!");
    }

    const image_name = `http://localhost:${config.port}/images/${req.file.filename}`;

    const laptops = await db("laptops")
      .insert({
        name,
        description,
        price,
        brand_id,
        model_id,
        category_id,
        image: image_name,
      })
      .returning("*");

    res.status(201).json({ laptops });
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

const getLaptops = async (req, res, next) => {
  try {
    const {
      q,
      limit = 16,
      offset = 0,
      sort_by = "id",
      sort_order = "DESC",
    } = req.query;

    const existing = db("laptops")
      .select("id", "name", "description", "price", "image")
      .returning("*");

    if (!existing) {
      throw new NotFoundError("Laptops not found!");
    }

    if (q) {
      existing.andWhereILike("name", `%${q}%`);
      existing.orWhereILike("description", `%${q}%`);
    }

    const count = await existing.clone().groupBy("id").count();
    existing.orderBy(sort_by, sort_order);
    existing.limit(limit).offset(offset);

    const result = await existing;

    res.status(201).json({
      laptops: result,
      laptopInfo: {
        laptopCount: count.length,
        limit,
        offset,
      },
    });
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

const getSingleLaptops = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db("laptops")
      .leftJoin("brands AS brand_laptop", "brand_laptop.id", "laptops.brand_id")
      .leftJoin("models AS model_laptop", "model_laptop.id", "laptops.model_id")
      .leftJoin(
        "categorys AS category_laptop",
        "category_laptop.id",
        "laptops.category_id"
      )
      .select(
        "laptops.id",
        "laptops.name",
        "laptops.description",
        "laptops.price",
        "laptops.image",
        db.raw(`
          json_build_object(
            'id', brand_laptop.id,
            'brand', brand_laptop.name) AS laptop_brand
        `),
        db.raw(`
          json_build_object(
            'id', model_laptop.id,
            'model', model_laptop.name) AS laptop_model
        `),
        db.raw(`
        json_build_object(
          'id', category_laptop.id,
          'category', category_laptop.name) AS laptop_category
        `)
      )
      .where({ "laptops.id": id })
      .first();

    if (!result) {
      throw new NotFoundError("Laptops not found!");
    }

    res.status(201).json({ laptop: result });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * UPDATE LAPTOP
 */

const updateLaptops = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { ...changes } = req.body;

    const existing = await db("laptops")
      .where({ id })
      .select("id", "name", "description", "image")
      .first();

    if (!existing) {
      throw new NotFoundError("Laptops not found!");
    }

    if (req?.file?.filename) {
      changes.image = `http://localhost:${config.port}/images/${req.file.filename}`;
    }

    const updated = await db("laptops")
      .where({ id })
      .update({ ...changes })
      .returning("*");

    res.status(200).json({ update: updated[0] });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * UPDATE LAPTOP
 */

const deleteLaptops = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await db("laptops")
      .where({ id })
      .select("id", "name", "description", "image")
      .first();

    if (!existing) {
      throw new NotFoundError("Laptops not found!");
    }

    const deleted = await db("laptops")
      .where({ id })
      .delete()
      .returning(["id", "name", "description", "image"]);

    res.status(200).json({ deleted: deleted[0] });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addLaptops,
  getLaptops,
  getSingleLaptops,
  updateLaptops,
  deleteLaptops,
};
