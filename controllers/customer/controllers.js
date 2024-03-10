const SECRET_KEY = process.env.SECRET_KEY;
const short = require("short-uuid");
const jwt = require("jsonwebtoken");
const { SendDataResponse } = require("../../sendDataResponse");
const {
    findOneAndUpdate,
    findBycustomerId,
    findAllUsers,
    findByEmail,
    findByPhoneNumber,
    findByUsername,
    createUser,
    deleteUserInfo,
    updatePassword,
    updateToken,
} = require("./repositories");

const register = async (req, res, next) => {
    try {
        const customerId = short.generate();
        const { email, phoneNumber, password } = req.body.personal;
        const existingEmail = await findByEmail(email);
        const existingPhoneNumber = await findByPhoneNumber(phoneNumber);
        req.body.customerId = customerId;
        req.body.expiresToken = "3600";
        if (existingEmail || existingPhoneNumber) {
            return SendDataResponse({
                res: res,
                code: 409,
                processResponse: "LoginEmailUsed",
            });
        }
        const newUser = await createUser(req.body, password);
        if (!newUser) {
            return SendDataResponse({
                res: res,
                code: 409,
                processResponse: "Conflict",
            });
        }
        const payload = {
            id: newUser._id,
        };
        const token = jwt.sign(payload, SECRET_KEY, {
            expiresIn: "1d",
        });
        await updateToken(payload.id, token);
        return SendDataResponse({
            res: res,
            code: 201,
            processResponse: "Register",
            token,
            req,
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return BadRequest({
                res: res,
                code: 400,
                error: error.message,
            });
        } else if (error.name === "MongoError" && error.code === 11000) {
            return SendDataResponse({
                res: res,
                code: 409,
                processResponse: "LoginEmailUsed",
            });
        } else {
            return next(error);
        }
    }
};

const login = async (req, res, next) => {
    try {
        const user = await findByEmail(req.body.email);
        if (!user) {
            return SendDataResponse({
                res: res,
                code: 401,
                processResponse: "Unauthorized",
            });
        }
        const isValidPassword = await user.personal.comparePassword(
            req.body.password,
        );
        if (!isValidPassword) {
            return SendDataResponse({
                res: res,
                code: 401,
                processResponse: "Unauthorized",
            });
        }

        const payload = {
            id: user._id,
        };
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
        await updateToken(payload.id, token);

        const { personal, address, customization, customerId, expiresToken } =
            user;

        let data = {
            personal,
            address,
            customization,
            token,
            expiresToken,
            customerId,
        };

        if (res.status(200)) {
            return SendDataResponse({
                res: res,
                code: 200,
                processResponse: "Login",
                data: data,
            });
        } else {
            return SendDataResponse({
                res: res,
                code: 409,
                processResponse: "Conflict",
            });
        }
    } catch (error) {
        next(error);
    }
};

const updateUserPassword = async (req, res, next) => {
    try {
        await updatePassword(req.user.customerId, req.body.password);
        await updateToken(req.user._id, null);
        return SendDataResponse({
            res: res,
            code: 200,
            processResponse: "PasswordUpdate",
        });
    } catch (error) {
        next(error);
    }
};

const updateAnotherUserPassword = async (req, res, next) => {
    try {
        const { customerId } = req.params;
        const data = await findBycustomerId(customerId);
        await updatePassword(customerId, req.body.password);
        await updateToken(data, null);
        return SendDataResponse({
            res: res,
            code: 200,
            processResponse: "PasswordUpdate",
        });
    } catch (error) {
        next(error);
    }
};

const updateUserFinanceInfo = async (req, res, next) => {
    try {
        const data = await findOneAndUpdate(req, req.user.customerId);

        if (!data) {
            return SendDataResponse({
                res: res,
                code: 409,
                processResponse: "Conflict",
            });
        } else {
            return SendDataResponse({
                res: res,
                code: 201,
                processResponse: "Update",
                req: req,
            });
        }
    } catch (error) {
        next(error);
    }
};

const getCurrent = async (req, res, next) => {
    try {
        const data = await findBycustomerId(req.user.customerId);

        if (!data) {
            SendDataResponse({
                res: res,
                code: 409,
                processResponse: "Conflict",
            });
        } else {
            SendDataResponse({
                res: res,
                code: 200,
                processResponse: "Receipt",
                data: data,
            });
        }
    } catch (error) {
        next(error);
    }
};

const getAnotherUser = async (req, res, next) => {
    try {
        const data = await findBycustomerId(req.params.customerId);
        if (!data) {
            return SendDataResponse({
                res: res,
                code: 409,
                processResponse: "Conflict",
            });
        } else {
            return SendDataResponse({
                res: res,
                code: 200,
                processResponse: "Success",
                data: data,
            });
        }
    } catch (error) {
        next(error);
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const data = await findAllUsers();
        if (!data) {
            return SendDataResponse({
                res: res,
                code: 409,
                processResponse: "Conflict",
            });
        } else {
            return SendDataResponse({
                res: res,
                code: 200,
                processResponse: "Success",
                data: data,
            });
        }
    } catch (error) {
        next(error);
    }
};

const getUserByUsername = async (req, res, next) => {
    try {
        const { username } = req.params;
        const user = await findByUsername(username);

        if (!user) {
            return SendDataResponse({
                res: res,
                code: 404,
                processResponse: "UserNotFound",
            });
        }

        return SendDataResponse({
            res: res,
            code: 200,
            processResponse: "Success",
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

const logout = async (req, res, next) => {
    try {
        const _id = req.user;
        await updateToken(_id, null);
        return res.status(204).json({});
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const user = await deleteUserInfo(req.user.customerId);
        if (!user) {
            return SendDataResponse({
                res: res,
                code: 409,
                processResponse: "Conflict",
            });
        } else {
            return SendDataResponse({
                res: res,
                code: 200,
                processResponse: "ProfileDelete",
            });
        }
    } catch (error) {
        next(error);
    }
};

const deleteAnotherUser = async (req, res, next) => {
    try {
        const user = await deleteUserInfo(req.params.customerId);
        if (!user) {
            return SendDataResponse({
                res: res,
                code: 409,
                processResponse: "Conflict",
            });
        } else {
            return SendDataResponse({
                res: res,
                code: 200,
                processResponse: "ProfileDelete",
            });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
    logout,
    deleteUser,
    getCurrent,
    getAnotherUser,
    getAllUsers,
    updateAnotherUserPassword,
    updateUserPassword,
    updateUserFinanceInfo,
    deleteAnotherUser,
    getUserByUsername,
};
