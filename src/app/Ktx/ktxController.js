const jwtMiddleware = require("../../../config/jwtMiddleware");
const ktxProvider = require("../../app/Ktx/ktxProvider");
const ktxService = require("../../app/Ktx/ktxService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 10
 * API Name : ktx 조회 (출발지역, 도착지역으로 검색)
 * [GET] /app/ktxs
 */
exports.getKtxs = async function (req, res) {
    /**
     * Query String: departure, destination
     */
    const departure = req.query.departure;
    const destination = req.query.destination;

    if (!departure && !destination) {
        // ktx 전체 조회
        const ktxListResult = await ktxProvider.retrieveKtxList();
        return res.send(response(baseResponse.SUCCESS, ktxListResult));
    } else if (!departure) {
        // ktx 도착지역 검색 조회
        const ktxListByDestination = await ktxProvider.retrieveKtxList(destination);
        return res.send(response(baseResponse.SUCCESS, ktxListByDestination));
    } else if (!destination) {
        // ktx 출발지역 검색 조회
        const ktxListByDeparture = await ktxProvider.retrieveKtxList(departure);
        return res.send(response(baseResponse.SUCCESS, ktxListByDeparture));
    } else {
        const ktxListByStation = await ktxProvider.retrieveKtxList(departure, destination);
        return res.send(response(baseResponse.SUCCESS, ktxListByStation));
    }
};

/**
 * API No. 11
 * API Name : KTX 생성 API
 * [POST] /app/ktxs
 */

exports.postKtxs = async function (req, res) {

    /**
     * Body: ktxNumber, departure, destination, price
    */

    const {ktxNumber, departure, destination, price} = req.body;

    // 빈 값 체크
    if (!ktxNumber)
        return res.send(response(baseResponse.ADDKTX_KTXNUMBER_EMPTY));

    // 빈 값 체크
    if (!departure)
        return res.send(response(baseResponse.ADDKTX_DEPARTURE_EMPTY));

    // 빈 값 체크
    if (!destination)
        return res.send(response(baseResponse.ADDKTX_DESTINATION_EMPTY));

    // 빈 값 체크
    if (!price)
        return res.send(response(baseResponse.ADDKTX_PRICE_EMPTY));

    const addKtxResponse = await ktxService.createKtx(
        ktxNumber,
        departure,
        destination,
        price
    );

    return res.send(addKtxResponse);
};