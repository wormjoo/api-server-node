const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const ktxDao = require("./ktxDao");

exports.retrieveKtxList = async function (departure, destination) {
    if (!departure && !destination) {
        const connection = await pool.getConnection(async (conn) => conn);
        const ktxListResult = await ktxDao.selectKtx(connection);
        connection.release();

        return ktxListResult;

    } else if (!departure) {
        const connection = await pool.getConnection(async (conn) => conn);
        const ktxListResult = await ktxDao.selectDeatination(connection, destination);
        connection.release();

        return ktxListResult;

    } else if (!destination) {
        const connection = await pool.getConnection(async (conn) => conn);
        const ktxListResult = await ktxDao.selectDeparture(connection, departure);
        connection.release();

        return ktxListResult;

    } else {
        const connection = await pool.getConnection(async (conn) => conn);
        const ktxListResult = await ktxDao.selectStation(connection, departure, destination);
        connection.release();

        return ktxListResult;
    }
};

exports.departureCheck = async function (departure) {
    const connection = await pool.getConnection(async (conn) => conn);
    const departureCheckResult = await ktxDao.selectDepartureStation(connection, departure);
    connection.release();

    return departureCheckResult;
};

exports.destinationCheck = async function (destination) {
    const connection = await pool.getConnection(async (conn) => conn);
    const destinationCheckResult = await ktxDao.selectDestinationStation(connection, destination);
    connection.release();

    return destinationCheckResult;
};
