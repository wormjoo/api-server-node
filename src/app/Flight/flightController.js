const jwtMiddleware = require("../../../config/jwtMiddleware");
const flightProvider = require("../../app/Flight/flightProvider");
const flightService = require("../../app/Flight/flightService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 12
 * API Name : 항공권 조회 (출발지, 도착지으로 검색)
 * [GET] /app/flights
 */
exports.getFlights = async function (req, res) {
    /**
     * Query String: departure, destination
     */
    const departure = req.query.departure;
    const destination = req.query.destination;

    if (!departure && !destination) {
        // ktx 전체 조회
        const flightListResult = await flightProvider.retrieveFlightList();
        return res.send(response(baseResponse.SUCCESS, flightListResult));
    } else if (!departure) {
        // ktx 도착지역 검색 조회
        const flightListByDestination = await flightProvider.retrieveFlightList(destination);
        return res.send(response(baseResponse.SUCCESS, flightListByDestination));
    } else if (!destination) {
        // ktx 출발지역 검색 조회
        const flightListByDeparture = await flightProvider.retrieveFlightList(departure);
        return res.send(response(baseResponse.SUCCESS, flightListByDeparture));
    } else {
        const flightListByStation = await flightProvider.retrieveFlightList(departure, destination);
        return res.send(response(baseResponse.SUCCESS, flightListByStation));
    }
};
