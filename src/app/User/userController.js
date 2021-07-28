const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");


/**
 * API No. 1
 * API Name : 유저 조회 API (+ 아이디로 검색 조회)
 * [GET] /app/users
 */
exports.getUsers = async function (req, res) {

    /**
     * Query String: userId
     */
    const userId = req.query.userId;

    if (!userId) {
        // 유저 전체 조회
        const userListResult = await userProvider.retrieveUserList();
        return res.send(response(baseResponse.SUCCESS, userListResult));
    } else {
        // 유저 검색 조회
        const userListByUserId = await userProvider.retrieveUserList(userId);
        return res.send(response(baseResponse.SUCCESS, userListByUserId));
    }
};

/**
 * API No. 2
 * API Name : 유저 생성 (회원가입) API
 * [POST] /app/users
 */
exports.postUsers = async function (req, res) {

    /**
     * Body: userId, password, name, nickname
     */
    const {userId, password, name, nickname} = req.body;

    // ID 빈 값 체크
    if (!userId)
        return res.send(response(baseResponse.SIGNUP_ID_EMPTY));

    // ID 길이 체크
    if (userId.length > 20)
        return res.send(response(baseResponse.SIGNUP_ID_LENGTH));

    // password 빈 값 체크
    if (!password)
        return res.send(response(baseResponse.SIGNUP_PASSWORD_EMPTY));

    // password 길이 체크
    if (password.length < 4 && password.length > 30)
        return res.send(response(baseResponse.SIGNUP_PASSWORD_LENGTH));

    // 이름 빈 값 체크
    if (!name)
        return res.send(response(baseResponse.SIGNUP_NAME_EMPTY));

    // 닉네임 빈 값 체크
    if (!nickname)
        return res.send(response(baseResponse.SIGNUP_NICKNAME_EMPTY));

    // ID 길이 체크
    if (nickname.length > 20)
        return res.send(response(baseResponse.SIGNUP_NICKNAME_LENGTH));


    const signUpResponse = await userService.createUser(
        userId,
        password,
        name,
        nickname
    );

    return res.send(signUpResponse);
};

/**
 * API No. 3
 * API Name : 특정 유저 조회 API (id 이용)
 * [GET] /app/users/{id}
 */
exports.getUserById = async function (req, res) {

    /**
     * Path Variable: id
     */
    const id = req.params.id;

    if (!id) return res.send(errResponse(baseResponse.USER_ID_EMPTY));

    const userById = await userProvider.retrieveUser(id);
    return res.send(response(baseResponse.SUCCESS, userById));
};

/**
 * API No. 4
 * API Name : 로그인 API
 * [POST] /app/login
 * body : userId, passsword
 */
exports.login = async function (req, res) {

    const {userId, password} = req.body;

    // TODO: userId, password 형식적 Validation

    // ID 빈 값 체크
    if (!userId)
        return res.send(response(baseResponse.SIGNUP_ID_EMPTY));

    // ID 길이 체크
    if (userId.length > 20)
        return res.send(response(baseResponse.SIGNUP_ID_LENGTH));

    // password 빈 값 체크
    if (!password)
        return res.send(response(baseResponse.SIGNUP_PASSWORD_EMPTY));

    // password 길이 체크
    if (password.length < 4 && password.length > 30)
        return res.send(response(baseResponse.SIGNUP_PASSWORD_LENGTH));

    const signInResponse = await userService.postSignIn(userId, password);

    return res.send(signInResponse);
};

/**
 * API No. 5
 * API Name : 회원 정보 수정 API + JWT + Validation
 * [PATCH] /app/users/:id
 * path variable : id
 * body : nickname
 */
exports.patchUsers = async function (req, res) {

    // jwt - id, path variable :id

    const idFromJWT = req.verifiedToken.id

    const id = req.params.id;
    const nickname = req.body.nickname;

    if (idFromJWT != id) {
        res.send(errResponse(baseResponse.ID_NOT_MATCH));
    } else {
        if (!nickname) return res.send(errResponse(baseResponse.USER_NICKNAME_EMPTY));

        const editUserInfo = await userService.editUser(id, nickname)
        return res.send(editUserInfo);
    }
};