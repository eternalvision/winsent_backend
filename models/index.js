const { Staff, joiStaffSchema, joiStaffEditSchema } = require("./staffs");

const {
    Customer,
    joiSignUpSchema,
    joiLogInSchema,
    joiUpdatePasswordSchema,
    joiUpdateCustomerSchema,
} = require("./customer");

module.exports = {
    Staff,
    joiStaffSchema,
    joiStaffEditSchema,
    Customer,
    joiSignUpSchema,
    joiLogInSchema,
    joiUpdatePasswordSchema,
    joiUpdateCustomerSchema,
};
