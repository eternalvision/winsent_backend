const { Customer } = require("../../models");

const handleDatabaseOperation = async (operation) => {
    try {
        return await operation();
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createUser: async (userInfo, password) => {
        return handleDatabaseOperation(async () => {
            const user = new Customer(userInfo);
            user.personal.setPassword(password);
            return await user.save();
        });
    },
    findUserById: async (_id) => {
        return handleDatabaseOperation(async () => Customer.findById({ _id }));
    },
    findAllUsers: async () => {
        return handleDatabaseOperation(async () => Customer.find({}));
    },
    findByEmail: async (email) => {
        return handleDatabaseOperation(async () =>
            Customer.findOne({ "personal.email": email }),
        );
    },
    findByUsername: async (username) => {
        return handleDatabaseOperation(async () =>
            Customer.findOne({ username }),
        );
    },
    findByPhoneNumber: async (phoneNumber) => {
        return handleDatabaseOperation(async () =>
            Customer.findOne({ phoneNumber }),
        );
    },
    findByWorkerId: async (workerId) => {
        return handleDatabaseOperation(async () =>
            Customer.findOne({ workerId }),
        );
    },
    findOneAndUpdate: async (req, workerId) => {
        return handleDatabaseOperation(async () =>
            Customer.findOneAndUpdate(
                { workerId },
                { ...req.body },
                { new: true },
            ),
        );
    },
    updatePassword: async (workerId, password) => {
        return handleDatabaseOperation(async () => {
            const user = await Customer.findOne({ workerId });
            user.setPassword(password);
            return await user.save();
        });
    },
    updateToken: async (id, token) => {
        return handleDatabaseOperation(async () =>
            Customer.updateOne({ _id: id }, { token }, { new: true }),
        );
    },
    deleteUserInfo: async (workerId) => {
        return handleDatabaseOperation(async () =>
            Customer.findOneAndDelete({ workerId }),
        );
    },
};
