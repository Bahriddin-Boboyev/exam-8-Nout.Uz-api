const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../../../config");
const db = require("../../db");

/**
 * Login qilganligini tekshirish uchun
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const isLoggedIn = async (req, res, next) => {
  try {
    const { authorization: token } = req.headers;

    if (!token) {
      return res.status(401).json({
        error: "Login qilmagansiz.",
      });
    }

    const decoded = jwt.verify(token, config.jwt.secret);
    const user = (req.user = { id: decoded.id });

    const existing = await db("admins")
      .where({ id: user.id })
      .select("name", "email")
      .first();

    if (!existing) {
      return res.status(401).json({ error: "Bu token eskirgan ko'rinadi, login qiling!" });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Login qilmagansiz.",
    });
  }
};

module.exports = isLoggedIn;
