const express = require("express");
const router = express.Router();
const userController = require("../app/controllers/UserController");
const { paramValidation, } = require("../app/requests/PostRequest");
const { validate } = require("../helpers");
const postController = require("../app/controllers/PostController");
const { validateCreatePost } = require("../app/requests/PostRequest");

// router.get("/", userController.getAllUser);

// router.get("/details-user/:id",
//     validate(paramValidation.detailsUser),
//     validateDetailsUser,
//     userController.detailsUser
// );

// router.put("/update-user/:id",
//     validate(paramValidation.updateUser),
//     validateUpdateUser,
//     userController.updateUser
// );
// router.delete("/delete-user/:id",
//     validate(paramValidation.deleteUser),
//     validateDeleteUser,
//     userController.deleteUser
// );

router.post("/:id",
    validate(paramValidation.createPost),
    validateCreatePost,
    postController.createPost
);

module.exports = router;
