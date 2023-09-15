const { responseSuccess, responseError, responseValidateFailed } = require("../../utils/ResponseHandle");
const { logger } = require("../../configs/logger");
const { ObjectId } = require("mongodb");
const { User } = require("../models/UsersModel");
const { createUserService, getAllUserService, updateUserService, deleteUserService, detailsUserService } = require('../services/UserService');
const { param } = require("../../routes/user");

class UserController {

    //getAllUser
    getAllUser = async (req, res) => {
        try {
            const allUser = await getAllUserService(req, res);
            return responseSuccess(res, allUser, 200)
        } catch (e) {
            console.log("loi", e)
            return responseError(res, 500, "Server Error getAllUser ")
        }
    }

    // createUser
    createUser = async (req, res) => {
        try {
            const newUser = await createUserService(req.body);
            return responseSuccess(res, newUser, 200)
        } catch (error) {
            console.log('Lỗi =>', error)
            return responseError(res, 500, "Server Error 1")
        }
    }

    //updateUser
    updateUser = async (req, res) => {
        try {
            const idUser = req.params.id
            const data = req.body;
            console.log('id', idUser);
            console.log('data', data);

            const newUser = await updateUserService(res, idUser, data);
            return responseSuccess(res, newUser, 200)
        } catch (error) {
            console.log('Lỗi =>', error)
            return responseError(res, 500, "Server Error 1")
        }
    }

    //deleteUser
    deleteUser = async (req, res) => {
        try {
            const idUser = req.params.id
            await deleteUserService(res, idUser);
            return responseSuccess(res, 200)
        } catch (error) {
            console.log('Lỗi =>', error)
            return responseError(res, 500, "Server Error 6")
        }
    }

    //deleteUser
    detailsUser = async (req, res) => {
        try {
            const idUser = req.params.id
            console.log(idUser)
            const userDetails = await detailsUserService(res, idUser);
            return responseSuccess(res, userDetails, 200)
        } catch (error) {
            console.log('Lỗi =>', error)
            return responseError(res, 500, "Server Error 8")
        }
    }

}

module.exports = new UserController();
