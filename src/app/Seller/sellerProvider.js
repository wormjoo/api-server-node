const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const sellerDao = require("./sellerDao");

exports.retrieveSellerList = async function (representative) {
    if (!representative) {
        const connection = await pool.getConnection(async (conn) => conn);
        const sellerListResult = await sellerDao.selectSeller(connection);
        connection.release();

        return sellerListResult;

    } else {
        const connection = await pool.getConnection(async (conn) => conn);
        const sellerListResult = await sellerDao.selectRepresentative(connection, representative);
        connection.release();

        return sellerListResult;
    }
};