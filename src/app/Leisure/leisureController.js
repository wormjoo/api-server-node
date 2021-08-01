const jwtMiddleware = require("../../../config/jwtMiddleware");
const leisureProvider = require("../../app/Leisure/leisureProvider");
const leisureService = require("../../app/Leisure/leisureService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 19
 * API Name : 티켓 리스트 조회 API (레저 id로 조회)
 * [GET] /app/leisures/{id}
 */
exports.getTickets = async function (req, res) {

    /**
     * Path Variable: id
     */
    const id = req.params.id;

    if (!id) return res.send(errResponse(baseResponse.LEISURE_ID_EMPTY));

    const ticketById = await leisureProvider.retrieveTicketList(id);
    return res.send(response(baseResponse.SUCCESS, ticketById));
};

/**
 * API No. 20
 * API Name : 렌터카 리스트 조회 API
 * [GET] /app/rentalcars/{type}
 */
exports.getRentalCars = async function (req, res) {

    /**
     * Path Variable: type
     */
    const type = req.query.type;

    if (!type) {
        // 렌터카 전체 조회
        const carListResult = await leisureProvider.retrieveCarList();
        return res.send(response(baseResponse.SUCCESS, carListResult));
    } else {
        // 렌터카 카테고리 별 조회
        const carListByType = await leisureProvider.retrieveCarList(type);
        return res.send(response(baseResponse.SUCCESS, carListByType));
    }
};