const jwtMiddleware = require("../../../config/jwtMiddleware");
const roomProvider = require("../../app/Room/roomProvider");
const roomService = require("../../app/Room/roomService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const {emit} = require("nodemon");


/**
 * API No. 7
 * API Name : 객실 조회 API (+숙소명으로 검색)
 * [GET] /app/rooms
 */
exports.getRooms = async function (req, res) {

    /**
     * Query String: accommodationId
     */
    const accommodationId = req.query.accommodationId;

    if (!accommodationId) {
        // 유저 전체 조회
        const roomListResult = await roomProvider.retrieveRoomList();
        return res.send(response(baseResponse.SUCCESS, roomListResult));
    } else {
        // 유저 검색 조회
        const roomListByAccommodationId = await roomProvider.retrieveRoomList(accommodationId);
        return res.send(response(baseResponse.SUCCESS, roomListByAccommodationId));
    }
};

/**
 * API No. 8
 * API Name : 특정 객실 리뷰 조회 API (+객실 id 이용)
 * [GET] /app/rooms/{id}
 */
exports.getReviews = async function (req, res) {

    /**
     * Path Variable: id
     */
    const id = req.params.id;

    if (!id) return res.send(errResponse(baseResponse.USER_ID_EMPTY));

    const reviewById = await roomProvider.retrieveReview(id);
    return res.send(response(baseResponse.SUCCESS, reviewById));
};

/**
 * API No. 9
 * API Name : 객실 추가 API
 * [POST] /app/rooms
 */
exports.postRooms = async function (req, res) {

    /**
     * Body: accommodationId, roomName, checkInDate, checkOutDate, standardPeople, maximumPeople, costPrice, salePrice
     */
    const {accommodationId, roomName, checkInDate, checkOutDate, standardPeople, maximumPeople, costPrice, salePrice} = req.body;

    // 빈 값 체크
    if (!roomName)
        return res.send(response(baseResponse.ADDROOM_ROOMNAME_EMPTY));

    // 빈 값 체크
    if (!checkInDate)
        return res.send(response(baseResponse.ADDROOM_CHECKINDATE_EMPTY));

    // 빈 값 체크
    if (!checkOutDate)
        return res.send(response(baseResponse.ADDROOM_CHECKOUTDATE_EMPTY));

    // 빈 값 체크
    if (!standardPeople)
        return res.send(response(baseResponse.ADDROOM_STANDARDPEOPLE_EMPTY));

    // 빈 값 체크
    if (!maximumPeople)
        return res.send(response(baseResponse.ADDROOM_MAXIMUMPEOPLE_EMPTY));

    // 빈 값 체크
    if (!costPrice)
        return res.send(response(baseResponse.ADDROOM_COSTPRICE_EMPTY));

    // 빈 값 체크
    if (!salePrice)
        return res.send(response(baseResponse.ADDROOM_SALEPRICE_EMPTY));


    const addRoomResponse = await roomService.createRoom(
        accommodationId,
        roomName,
        checkInDate,
        checkOutDate,
        standardPeople,
        maximumPeople,
        costPrice,
        salePrice
    );

    return res.send(addRoomResponse);
};

/**
 * API No. 15
 * API Name : 객실 예약 추가 API
 * [POST] /app/reservations
 */
exports.postReservations = async function (req, res) {

    /**
     * Body: userId, roomId, adultCount, childCount, payMethod
     */
    var {userId, roomId, adultCount, childCount, payMethod} = req.body;

    // 빈 값 체크
    if (!userId)
        return res.send(response(baseResponse.ADDRESERVATION_USERID_EMPTY));

    // 빈 값 체크
    if (!roomId)
        return res.send(response(baseResponse.ADDRESERVATION_ROOMID_EMPTY));

    // 빈 값 체크
    if (!adultCount)
        adultCount = 2;

    // 빈 값 체크
    if (!childCount)
        childCount = 0;

    // 빈 값 체크
    if (!payMethod)
        return res.send(response(baseResponse.ADDRESERVATION_PAYMETHOD_EMPTY));

    const addReservationResponse = await roomService.createReservation(
        userId,
        roomId,
        adultCount,
        childCount,
        payMethod
    );

    return res.send(addReservationResponse);
};

/**
 * API No. 16
 * API Name : 객실 리뷰 추가 API
 * [POST] /app/reviews
 */
exports.postReviews = async function (req, res) {

    /**
     * Body: reservationId, roomId, comment, rating
     */
    const {reservationId, roomId, comment, rating} = req.body;

    // 빈 값 체크
    if (!reservationId)
        return res.send(response(baseResponse.ADDREVIEW_RESERVATIONID_EMPTY));

    // 빈 값 체크
    if (!roomId)
        return res.send(response(baseResponse.ADDREVIEW_ROOMID_EMPTY));

    // 빈 값 체크
    if (!comment)
        return res.send(response(baseResponse.ADDREVIEW_COMMENT_EMPTY));

    // 빈 값 체크
    if (!rating)
        return res.send(response(baseResponse.ADDREVIEW_RATING_EMPTY));

    const addReviewResponse = await roomService.createReview(
        reservationId,
        roomId,
        comment,
        rating
    );

    return res.send(addReviewResponse);
};

/**
 * API No. 17
 * API Name : 리뷰 수정 API
 * [PATCH] /app/reviews/:id
 * path variable : id
 * body : comment
 */
exports.patchReviews = async function (req, res) {

    const id = req.params.id;
    const comment = req.body.comment;

    if (!comment)
        return res.send(errResponse(baseResponse.ADDREVIEW_COMMENT_EMPTY));

    const editReview = await roomService.editReview(id, comment)
    return res.send(editReview);

};
