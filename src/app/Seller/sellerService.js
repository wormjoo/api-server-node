const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const sellerProvider = require("./sellerProvider");
const sellerDao = require("./sellerDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

exports.editSeller = async function (id, address) {
    try {
        console.log(id)
        const connection = await pool.getConnection(async (conn) => conn);
        const editSellerResult = await sellerDao.updateSeller(connection, id, address)
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - editSeller Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}