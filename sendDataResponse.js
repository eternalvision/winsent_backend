const {
    HttpCode: {
        OK,
        CREATED,
        UNAUTHORIZED,
        NOT_FOUND_MESSAGE,
        CONFLICT,
        BAD_REQUEST,
    },
    Messages: {
        AGAIN,
        LOGIN_EMAIL_WRONG,
        LOGIN_EMAIL_USED,
        BAD_DATA_REQUEST,
        NOT_FOUND,
        CHANGE_PASS,
        CHANGE_USER_PROFILE,
        DELETE_PROFILE,
        STAFF_ID_USED,
    },
    Statuses: { ERROR, SUCCESS },
    Operations: { REGISTERED, LOGIN, LOGOUT },
    Processes: { GET, PUT, POST, DELETE },
    ServerStatuses: {
        Success,
        Receipt,
        Created,
        Login,
        Logout,
        Register,
        Update,
        ProfileUpdate,
        ProfileDelete,
        PasswordUpdate,
        Delete,
        Conflict,
        LoginEmailUsed,
        NotFound,
        Unauthorized,
        BadRequest,
    },
} = require("./helpers");

const responseMap = {
    200: {
        Success: ({ res, data }) => Success(res, OK, SUCCESS, data),
        Delete: ({ res }) => Delete(res, OK, SUCCESS, DELETE),
        Login: ({ res, data }) => Login(res, OK, SUCCESS, LOGIN, data),
        Receipt: ({ res, data }) => Receipt(res, OK, SUCCESS, GET, data),
        ProfileUpdate: ({ res, req }) =>
            ProfileUpdate(res, OK, SUCCESS, CHANGE_USER_PROFILE, req),
        PasswordUpdate: ({ res }) =>
            PasswordUpdate(res, OK, SUCCESS, CHANGE_PASS),
        ProfileDelete: ({ res }) =>
            ProfileDelete(res, OK, SUCCESS, DELETE_PROFILE),
        Logout: ({ res }) => Logout(res, OK, SUCCESS, LOGOUT),
    },
    201: {
        Created: ({ res, req }) => Created(res, CREATED, SUCCESS, POST, req),
        Register: ({ res, token, req }) =>
            Register(res, CREATED, SUCCESS, REGISTERED, token, req),
        Update: ({ res, req }) => Update(res, OK, SUCCESS, PUT, req),
    },
    400: {
        BadRequest: ({ res, error }) =>
            BadRequest(res, BAD_REQUEST, ERROR, BAD_DATA_REQUEST, error),
    },
    401: {
        Unauthorized: ({ res }) =>
            Unauthorized(res, UNAUTHORIZED, ERROR, LOGIN_EMAIL_WRONG),
    },
    404: {
        NotFound: ({ res }) =>
            NotFound(res, NOT_FOUND, ERROR, NOT_FOUND_MESSAGE),
    },
    409: {
        Conflict: ({ res }) => Conflict(res, CONFLICT, ERROR, AGAIN),
        LoginEmailUsed: ({ res }) =>
            LoginEmailUsed(res, CONFLICT, ERROR, LOGIN_EMAIL_USED),
        StaffIdUsed: ({ res }) =>
            LoginEmailUsed(res, CONFLICT, ERROR, STAFF_ID_USED),
    },
};

const SendDataResponse = (options) => {
    const responseFunc =
        responseMap[options.code] &&
        responseMap[options.code][options.processResponse];
    if (responseFunc) {
        return responseFunc(options);
    }
};

module.exports = { SendDataResponse };
