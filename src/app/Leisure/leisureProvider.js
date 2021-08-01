const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const leisureDao = require("./leisureDao");

exports.retrieveTicketList = async function (id) {
    const connection = await pool.getConnection(async (conn) => conn);
    const ticketListResult = await leisureDao.selectTicket(connection, id);
    connection.release();

    return ticketListResult;
};

exports.retrieveCarList = async function (type) {
    if (!type) {
        const connection = await pool.getConnection(async (conn) => conn);
        const carListResult = await leisureDao.selectCar(connection);
        connection.release();

        return carListResult;

    } else {
        const connection = await pool.getConnection(async (conn) => conn);
        const carListResult = await leisureDao.selectCarByType(connection, type);
        connection.release();

        return carListResult;
    }
};