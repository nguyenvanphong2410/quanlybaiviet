const express = require("express");
const router = express.Router();
const { validate } = require("../helpers");
const { paramValidation, validateCreateCategory } = require("../app/requests/CategoryRequest");
const categoryController = require("../app/controllers/CategoryController");

router.post("/create-category",
    validate(paramValidation.createCategory),
    validateCreateCategory,
    categoryController.createCategory
);

module.exports = router;
