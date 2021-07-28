const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const categoryProvider = require("./categoryProvider");
const categoryDao = require("./categoryDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createCategory = async function (type, subType, detailType) {
    try {
        // 디테일 카테고리 중복 확인
        const detailCategoryRows = await categoryProvider.detailCategoryCheck(detailType);
        if (detailCategoryRows.length > 0)
            return errResponse(baseResponse.SIGNUP_REDUNDANT_DETAILCATEGORY);

        const insertCategoryParams = [type, subType, detailType];

        const connection = await pool.getConnection(async (conn) => conn);

        const CategoryIdResult = await categoryDao.insertCategory(connection, insertCategoryParams);
        console.log(`추가된 카테고리 : ${CategoryIdResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createCategory Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};