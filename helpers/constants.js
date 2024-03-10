const HttpCode = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    TOO_MANY_REQUEST: 429,
    INTERNAL_SERVER_ERROR: 500,
};

const Operations = {
    REGISTERED: "Registered",
    LOGIN: "Logged in",
    LOGOUT: "Signed out",
};

const Processes = {
    GET: "Accepted",
    PUT: "Updated",
    POST: "Created",
    DELETE: "SmazáDeletedno",
};

const Messages = {
    AGAIN: "Try it again!",
    LOGIN_EMAIL_WRONG: "The username or password is wrong!",
    LOGIN_EMAIL_USED: "Password or username already in use!",
    BAD_DATA_REQUEST: "Repeat the input!",
    NOT_FOUND_MESSAGE: "Not found!",
    CHANGE_PASS: "Password updated",
    CHANGE_USER_PROFILE: "Profile updated",
    DELETE_PROFILE: "Profile deleted",
    STAFF_ID_USED: "A worker record with this ID already exists!",
};

const Statuses = {
    ERROR: "Error",
    SUCCESS: "Success",
};

module.exports = { HttpCode, Operations, Processes, Messages, Statuses };
