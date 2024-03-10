const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = Joi.extend(joiPasswordExtendCore);
const bcrypt = require("bcryptjs");
const { addressSchema, customizationSchema, personalSchema } =
    require("./schema")(Schema);

const customerSchema = Schema(
    {
        personal: personalSchema,
        address: addressSchema,
        customization: customizationSchema,
        token: {
            type: String,
            required: false,
            default: null,
        },
        expiresToken: {
            type: Number,
            required: false,
            default: null,
        },
        customerId: {
            type: String,
            required: false,
            default: null,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    },
);

personalSchema.methods.setPassword = function (password) {
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

personalSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

const joiAddressSchema = Joi.object({
    district: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    street: Joi.string().required(),
    houseNumber: Joi.number().required(),
    entrance: Joi.number().optional(),
    floor: Joi.number().optional(),
    apartmentNumber: Joi.number().optional(),
    squareMeters: Joi.number().required(),
    rooms: Joi.number().required(),
    bathrooms: Joi.number().required(),
    occupants: Joi.number().required(),
    animals: Joi.boolean().required(),
});

const joiCustomizationSchema = Joi.object({
    theme: Joi.string().valid("light", "dark").optional(),
    language: Joi.string().valid("cz", "en", "ua", "ru").optional(),
});

const joiPersonalSchema = Joi.object({
    username: Joi.string().min(5).max(15).required(),
    name: Joi.string().min(3).max(20).required(),
    surname: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().max(256).required(),
    phoneNumber: Joi.string().max(15).required(),
    password: joiPassword.string().min(8).required(),
});

const joiSignUpSchema = Joi.object({
    personal: joiPersonalSchema.required(),
    address: joiAddressSchema.required(),
    customization: joiCustomizationSchema.required(),
    customerId: Joi.string().optional(),
    expiresToken: Joi.number().optional(),
});

const joiLogInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const joiUpdatePasswordSchema = Joi.object({
    password: joiPassword.string().min(8).required(),
});

const joiUpdatePersonalSchema = Joi.object({
    username: Joi.string().min(5).max(15).optional(),
    name: Joi.string().min(3).max(20).optional(),
    surname: Joi.string().min(3).max(20).optional(),
    email: Joi.string().email().max(256).optional(),
    phoneNumber: Joi.string().max(15).optional(),
});

const joiUpdateAddressSchema = Joi.object({
    district: Joi.string().optional(),
    city: Joi.string().optional(),
    country: Joi.string().optional(),
    street: Joi.string().optional(),
    houseNumber: Joi.number().optional(),
    entrance: Joi.number().optional(),
    floor: Joi.number().optional(),
    apartmentNumber: Joi.number().optional(),
    squareMeters: Joi.number().optional(),
    rooms: Joi.number().optional(),
    bathrooms: Joi.number().optional(),
    occupants: Joi.number().optional(),
    animals: Joi.boolean().optional(),
});

const joiUpdateCustomizationSchema = Joi.object({
    theme: Joi.string().valid("light", "dark").optional(),
    language: Joi.string().valid("cz", "en", "ua", "ru").optional(),
});

const joiUpdateCustomerSchema = Joi.object({
    personal: joiUpdatePersonalSchema,
    address: joiUpdateAddressSchema,
    customization: joiUpdateCustomizationSchema,
});

const Customer = model("customer", customerSchema);

module.exports = {
    Customer,
    joiSignUpSchema,
    joiLogInSchema,
    joiUpdatePasswordSchema,
    joiUpdateCustomerSchema,
};
