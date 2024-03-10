const express = require("express");

const { ctrlWrapper, validation, auth } = require("../../middlewares");
const { customer: ctrl } = require("../../controllers");
const Schema = require("../../models");

const router = express.Router();

router.post(
    "/signup",
    validation(Schema.joiSignUpSchema),
    ctrlWrapper(ctrl.register),
);

router.post(
    "/login",
    validation(Schema.joiLogInSchema),
    ctrlWrapper(ctrl.login),
);

//! Profile
router.get("/profile", auth, ctrlWrapper(ctrl.getCurrent));

router.put(
    "/profile/update",
    auth,
    validation(Schema.joiUpdateSchema),
    ctrlWrapper(ctrl.updateUserFinanceInfo),
);

router.put(
    "/profile/update/password",
    auth,
    validation(Schema.joiUpdatePasswordSchema),
    ctrlWrapper(ctrl.updateUserPassword),
);

router.get("/profile/logout", auth, ctrlWrapper(ctrl.logout));

router.delete("/profile/delete", auth, ctrlWrapper(ctrl.deleteUser));

//! Another profiles
router.get("/profiles", auth, ctrlWrapper(ctrl.getAllUsers));

router.get("/profiles/:workerId", auth, ctrlWrapper(ctrl.getAnotherUser));

router.get(
    "/profiles/username/:username",
    auth,
    ctrlWrapper(ctrl.getUserByUsername),
);

// router.put(
//     "/profiles/update/password/:workerId",
//     auth,
//     validation(Schema.joiUpdatePasswordSchema, "Try it again"),
//     ctrlWrapper(ctrl.updateAnotherUserPassword)
// );

router.delete(
    "/profiles/delete/:workerId",
    auth,
    ctrlWrapper(ctrl.deleteAnotherUser),
);

module.exports = router;
