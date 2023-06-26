const express = require("express");
const db = require("../../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../../../config");
const { BadRequest, NotFoundError } = require("../../helpers");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * POST
 */

const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existing = await db("admins")
      .where({ email })
      .select("id", "name", "email", "password", "image")
      .first();

    if (!existing) {
      throw new NotFoundError("Admin topilmadi");
    }

    const checkPassword = await bcrypt.hash(password, existing.password);

    if (!checkPassword) {
      throw new BadRequest("Password xato!");
    }

    const token = jwt.sign({ id: existing.id }, config.jwt.secret, {
      expiresIn: "1d",
    });

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * POST
 */

const addAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existing = await db("admins")
      .where({ email })
      .select("name", "email", "password", "image")
      .first();

    if (existing) {
      throw new BadRequest("Bunday emailga ega admin allaqachon mavjud!");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const image_name = `http://localhost:${config.port}/images/${req.file.filename}`;

    const admin = await db("admins")
      .insert({ name, email, password: hashPassword, image: image_name })
      .returning("*");

    res.status(201).json({ admin });
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

const getAdmins = async (req, res, next) => {
  try {
    const existing = await db("admins")
      .select("id", "name", "email", "image")
      .returning("*");

    if (!existing.length) {
      throw new NotFoundError("Admins topilmadi!");
    }

    res.status(201).json({ admin: existing });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * GET SINGLE ADMIN
 */

const getSingleAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await db("admins")
      .where({ id })
      .select("id", "name", "email", "image")
      .first();

    if (!existing) {
      throw new NotFoundError("Admins topilmadi!");
    }

    res.status(201).json({ admin: existing });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * UPDATE ADMIN
 */
/* admin faqat o'zini update qila oladi. */
const updateAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { ...changes } = req.body;

    const existing = await db("admins")
      .where({ id })
      .select("id", "name", "email", "image")
      .first();

    if (!existing) {
      throw new NotFoundError("Admins topilmadi!");
    }

    if (id != req.user.id) {
      throw new BadRequest("Siz faqat o'zingizni tahrirlay olasiz!");
    }

    if (changes.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(changes.password, salt);
      changes.password = hashedPassword;
    }

    if (req?.file?.filename) {
      changes.image = `http://localhost:${config.port}/images/${req.file.filename}`;
    }

    const updated = await db("admins")
      .where({ id })
      .update({ ...changes })
      .returning(["id", "name", "email", "image"]);

    res.status(200).json({ update: updated[0] });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * DELETE ADMIN
 */
/* admin faqat o'zidan tashqari hammani o'chira oladi */
const deleteAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await db("admins")
      .where({ id })
      .select("id", "name", "email", "image")
      .first();

    if (!existing) {
      throw new NotFoundError("Admins topilmadi!");
    }

    if (id == req.user.id) {
      throw new BadRequest("Siz o'zingizni o'chira olmaysiz!");
    }

    const deleted = await db("admins")
      .where({ id })
      .delete()
      .returning(["id", "name", "email", "image"]);

    res.status(200).json({
      deleted: deleted[0],
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginAdmin,
  addAdmin,
  getAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
