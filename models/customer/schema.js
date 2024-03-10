module.exports = (Schema) => {
    return {
        addressSchema: new Schema(
            {
                district: {
                    type: String,
                    required: true,
                },
                city: {
                    type: String,
                    required: true,
                },
                country: {
                    type: String,
                    required: true,
                },
                street: {
                    type: String,
                    required: true,
                },
                houseNumber: {
                    type: Number,
                    required: true,
                },
                entrance: {
                    type: Number,
                    required: false,
                },
                floor: {
                    type: Number,
                    required: false,
                },
                apartmentNumber: {
                    type: Number,
                    required: false,
                },
                squareMeters: {
                    type: Number,
                    required: true,
                },
                rooms: {
                    type: Number,
                    required: true,
                },
                bathrooms: {
                    type: Number,
                    required: true,
                },
                occupants: {
                    type: Number,
                    required: true,
                },
                animals: {
                    type: Boolean,
                    required: true,
                },
            },
            { _id: false },
        ),
        customizationSchema: new Schema(
            {
                theme: {
                    type: String,
                    required: false,
                    default: "light",
                },
                language: {
                    type: String,
                    required: false,
                    default: "cz",
                },
            },
            { _id: false },
        ),
        personalSchema: new Schema(
            {
                username: {
                    type: String,
                    required: true,
                    max: 15,
                    min: 5,
                },
                name: {
                    type: String,
                    required: true,
                    max: 20,
                    min: 3,
                },
                surname: {
                    type: String,
                    required: true,
                    max: 20,
                    min: 3,
                },
                email: {
                    type: String,
                    required: true,
                    max: 256,
                    unique: true,
                },
                phoneNumber: {
                    type: String,
                    required: true,
                    max: 15,
                },
                password: {
                    type: String,
                    required: true,
                    min: 8,
                },
            },
            { _id: false },
        ),
    };
};
