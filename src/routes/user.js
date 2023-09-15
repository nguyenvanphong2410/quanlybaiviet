const express = require("express");
const router = express.Router();
const userController = require("../app/controllers/UserController");
const { paramValidation, validateCreateUser, validateUpdateUser, validateDeleteUser, validateDetailsUser } = require("../app/requests/UserRequest");
const { validate } = require("../helpers");

router.get("/", userController.getAllUser);

router.get("/details-user/:id",
    validate(paramValidation.detailsUser),
    validateDetailsUser,
    userController.detailsUser
);

router.post("/create-user",
    validate(paramValidation.createUser),
    validateCreateUser,
    userController.createUser
);

router.put("/update-user/:id",
    validate(paramValidation.updateUser),
    validateUpdateUser,
    userController.updateUser
);

// router.get("/search-user/:q",
//     validate(paramValidation.searchUser),
//     validateSearchUser,
//     userController.searchUser
// );

router.delete("/delete-user/:id",
    validate(paramValidation.deleteUser),
    validateDeleteUser,
    userController.deleteUser
);

module.exports = router;
