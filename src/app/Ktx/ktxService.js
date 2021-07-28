const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const ktxProvider = require("./ktxProvider");
const ktxDao = require("./ktxDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createKtx = async function (ktxNumber, departure, destination, price) {
    try {
        // ktx 역 존재 확인
        const departureRows = await ktxProvider.departureCheck(departure);
        if (departureRows[0] == undefined)
            return errResponse(baseResponse.ADDROOM_STATION_NOT_EXIST);

        const destinationRows = await ktxProvider.destinationCheck(destination);
        if (!destinationRows[0] == undefined)
            return errResponse(baseResponse.ADDROOM_STATION_NOT_EXIST);

        const insertKtxParams = [ktxNumber, departure, destination, price];

        const connection = await pool.getConnection(async (conn) => conn);

        const ktxResult = await ktxDao.insertKtx(connection, insertKtxParams);
        console.log(`추가된 ktx : ${ktxResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createKtx Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};