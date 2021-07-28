const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const roomProvider = require("./roomProvider");
const roomDao = require("./roomDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

exports.createRoom = async function (accommodationId, roomName, checkInDate, checkOutDate, standardPeople, maximumPeople, costPrice, salePrice) {
    try {
        const accommodationIdRows = await roomProvider.accommodationCheck(accommodationId);
        if (accommodationIdRows[0] == undefined)
            return errResponse(baseResponse.ADDROOM_ACCOMMODATION_NOT_EXIST);

        const insertRoomParams = [accommodationId, roomName, checkInDate, checkOutDate, standardPeople, maximumPeople, costPrice, salePrice];

        const connection = await pool.getConnection(async (conn) => conn);

        const roomIdResult = await roomDao.insertRoom(connection, insertRoomParams);
        console.log(`추가된 객실 : ${roomIdResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createRoom Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.createReservation = async function (userId, roomId, adultCount, childCount, payMethod) {
    try {
        const userIdRows = await roomProvider.userIdCheck(userId);
        if (userIdRows[0] == undefined)
            return errResponse(baseResponse.ADDRESERVATION_USERID_NOT_EXIST);

        const roomIdRows = await roomProvider.roomIdCheck(roomId);
        if (roomIdRows[0] == undefined)
            return errResponse(baseResponse.ADDRESERVATION_ROOMID_NOT_EXIST);

        const insertReservationParams = [userId, roomId, adultCount, childCount, payMethod];

        const connection = await pool.getConnection(async (conn) => conn);

        const reservationIdResult = await roomDao.insertReservation(connection, insertReservationParams);
        console.log(`추가된 예약 : ${reservationIdResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - createReservation Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.createReview = async function (reservationId, roomId, comment, rating) {
    try {
        const reservationIdRows = await roomProvider.reservationIdCheck(reservationId);
        if (reservationIdRows[0] == undefined)
            return errResponse(baseResponse.ADDREVIEW_RESERVATIONID_NOT_EXIST);

        const roomIdRows = await roomProvider.roomIdCheck(roomId);
        if (roomIdRows[0] == undefined)
            return errResponse(baseResponse.ADDREVIEW_ROOMID_NOT_EXIST);

        const insertReviewParams = [reservationId, roomId, comment, rating];

        const connection = await pool.getConnection(async (conn) => conn);

        const reviewIdResult = await roomDao.insertReview(connection, insertReviewParams);
        console.log(`추가된 리뷰 : ${reviewIdResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - createReview Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.editReview = async function (id, comment) {
    try {
        console.log(id)
        const connection = await pool.getConnection(async (conn) => conn);
        const editReviewResult = await roomDao.updateReview(connection, id, comment)
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - editReview Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}