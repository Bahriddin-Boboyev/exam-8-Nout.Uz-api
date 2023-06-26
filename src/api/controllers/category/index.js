const express = require("express");
const db = require("../../db");
const { BadRequest, NotFoundError } = require("../../helpers");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * POST
 */

const postCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const existing = await db("categorys")
      .where({ name })
      .select("id", "name")
      .first();

    if (existing) {
      throw new BadRequest("Bu nomli category allaqachon mavjud!");
    }

    const category = await db("categorys").insert({ name }).returning("*");

    res.status(201).json(category);
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

const getCategory = async (req, res, next) => {
  try {
    const existing = await db("categorys").select("id", "name");

    if (!existing?.length) {
      throw new NotFoundError("categorys not found.");
    }

    res.status(201).json({ categorys: existing });
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

const getSingleCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await db("categorys")
      .leftJoin("laptops AS laptop", "laptop.category_id", "categorys.id")
      .leftJoin("brands AS brand", "brand.id", "laptop.id")
      .select(
        "categorys.id",
        "categorys.name",
        db.raw(`CASE WHEN brand.id IS NULL THEN '{}'
        ELSE
          json_build_object(
            'id', brand.id,
            'brand', brand.name) END AS brands
        `)
      )
      .where({ "categorys.id": id })
      .first();

    if (!result) {
      throw new NotFoundError("categorys not found.");
    }

    res.status(201).json({ categorys: result });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * UPDATE
 */

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const existing = await db("categorys")
      .where({ id })
      .select("id", "name")
      .first();

    if (!existing) {
      throw new NotFoundError("categorys not found.");
    }

    const existingName = await db("categorys")
      .where({ name })
      .select("id", "name")
      .first();

    if (existingName) {
      throw new BadRequest("Bunday category allaqachon mavjud!");
    }

    const updated = await db("categorys")
      .where({ id })
      .update({ name })
      .returning(["id", "name"]);

    res.status(200).json({ update: updated[0] });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * UPDATE
 */

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await db("categorys")
      .where({ id })
      .select("id", "name")
      .first();

    if (!existing) {
      throw new NotFoundError("categorys not found.");
    }

    const deleted = await db("categorys")
      .where({ id })
      .delete()
      .returning(["id", "name"]);

    res.status(200).json({ deleted: deleted[0] });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postCategory,
  getCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
