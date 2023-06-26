const express = require("express");
const db = require("../../db");
const config = require("../../../config");
const { BadRequest, NotFoundError } = require("../../helpers");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * POST
 */

const postModel = async (req, res, next) => {
  try {
    const { name, brand_id } = req.body;

    const existing = await db("models")
      .where({ name })
      .select("id", "name", "image", "brand_id")
      .first();

    if (existing) {
      throw new BadRequest("Bu nomli model allaqachon mavjud!");
    }
    const image_name = `http://localhost:${config.port}/images/${req.file.filename}`;

    const model = await db("models")
      .insert({ name, brand_id, image: image_name })
      .returning("*");

    res.status(201).json({ model });
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

const getModel = async (req, res, next) => {
  try {
    const existing = await db("models")
      .select("id", "name", "image", "brand_id")
      .returning("*");

    if (!existing.length) {
      throw new NotFoundError("Models topilmadi!");
    }
    res.status(200).json({ models: existing });
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

const getSingleModel = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await db("models")
      .where({ id })
      .select("id", "name", "image", "brand_id")
      .first();

    if (!existing) {
      throw new NotFoundError("Models topilmadi!");
    }

    res.status(200).json({ models: existing });
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

const updateModel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { ...changes } = req.body;
    
    const existing = await db("models")
      .where({ id })
      .select("id", "name", "image", "brand_id")
      .first();

    if (!existing) {
      throw new NotFoundError("models not found.");
    }

    if (req?.file?.filename) {
      changes.image = `http://localhost:${config.port}/images/${req.file.filename}`;
    }

    const updated = await db("models")
      .where({ id })
      .update({ ...changes })
      .returning(["id", "name", "image", "brand_id"]);

    res.status(200).json({ update: updated[0] });
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

const deleteModel = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await db("models")
      .where({ id })
      .delete()
      .returning(["id", "name", "image", "brand_id"]);

    if (!existing) {
      throw new NotFoundError("models not found.");
    }

    res.status(200).json({ deleted: existing[0] });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postModel,
  getModel,
  getSingleModel,
  updateModel,
  deleteModel,
};
