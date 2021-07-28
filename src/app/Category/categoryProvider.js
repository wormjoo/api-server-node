const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const categoryDao = require("./categoryDao");

exports.retrieveCategoryList = async function (type) {
    if (!type) {
        const connection = await pool.getConnection(async (conn) => conn);
        const categoryListResult = await categoryDao.selectCategory(connection);
        connection.release();

        return categoryListResult;

    } else {
        const connection = await pool.getConnection(async (conn) => conn);
        const categoryListResult = await categoryDao.selectType(connection, type);
        connection.release();

        return categoryListResult;
    }
};

exports.detailCategoryCheck = async function (detailType) {
    const connection = await pool.getConnection(async (conn) => conn);
    const detailCategoryCheckResult = await categoryDao.selectDetailType(connection, detailType);
    connection.release();

    return detailCategoryCheckResult;
};