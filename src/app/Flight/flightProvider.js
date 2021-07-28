const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const flightDao = require("./flightDao");

exports.retrieveFlightList = async function (departure, destination) {
    if (!departure && !destination) {
        const connection = await pool.getConnection(async (conn) => conn);
        const flightListResult = await flightDao.selectFlight(connection);
        connection.release();

        return flightListResult;

    } else if (!departure) {
        const connection = await pool.getConnection(async (conn) => conn);
        const flightListResult = await flightDao.selectDeatinationAirport(connection, destination);
        connection.release();

        return flightListResult;

    } else if (!destination) {
        const connection = await pool.getConnection(async (conn) => conn);
        const flightListResult = await flightDao.selectDepartureAirport(connection, departure);
        connection.release();

        return flightListResult;

    } else {
        const connection = await pool.getConnection(async (conn) => conn);
        const flightListResult = await flightDao.selectAirport(connection, departure, destination);
        connection.release();

        return flightListResult;
    }
};

exports.departureCheck = async function (departure) {
    const connection = await pool.getConnection(async (conn) => conn);
    const departureCheckResult = await flightDao.selectDepartureInAirport(connection, departure);
    connection.release();

    return departureCheckResult;
};

exports.destinationCheck = async function (destination) {
    const connection = await pool.getConnection(async (conn) => conn);
    const destinationCheckResult = await ktxDao.selectDestinationInAirport(connection, destination);
    connection.release();

    return destinationCheckResult;
};
