module.exports = function(app){
    const flight = require('./flightController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 12. 항공권 조회 (출발지, 도착지으로 검색)
    app.get('/app/flights', flight.getFlights);

};