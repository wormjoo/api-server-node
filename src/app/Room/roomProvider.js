const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const roomDao = require("./roomDao");

exports.retrieveRoomList = async function (accommodationId) {
    if (!accommodationId) {
        const connection = await pool.getConnection(async (conn) => conn);
        const roomListResult = await roomDao.selectRoom(connection);
        connection.release();

        return roomListResult;

    } else {
        const connection = await pool.getConnection(async (conn) => conn);
        const roomListResult = await roomDao.selectAccommodationId(connection, accommodationId);
        connection.release();

        return roomListResult;
    }
};

exports.retrieveReview = async function (id) {
    const connection = await pool.getConnection(async (conn) => conn);
    const reviewResult = await roomDao.selectReview(connection, id);

    connection.release();

    return reviewResult[0];
};

exports.accommodationCheck = async function (accommodationId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const accommodationCheckResult = await roomDao.selectAccommodation(connection, accommodationId);
    connection.release();

    return accommodationCheckResult;
};

exports.userIdCheck = async function (userId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userIdCheckResult = await roomDao.selectUserId(connection, userId);
    connection.release();

    return userIdCheckResult;
};

exports.roomIdCheck = async function (roomId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const roomIdCheckResult = await roomDao.selectRoomId(connection, roomId);
    connection.release();

    return roomIdCheckResult;
};

exports.reservationIdCheck = async function (reservationId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const reservationIdCheckResult = await roomDao.selectReservationId(connection, reservationId);
    connection.release();

    return reservationIdCheckResult;
};