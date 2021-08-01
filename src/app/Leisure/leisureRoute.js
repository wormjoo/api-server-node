module.exports = function(app){
    const leisure = require('./leisureController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 19. 티켓 리스트 조회 API (레저 id로 조회)
    app.get('/app/leisures/:id', leisure.getTickets);

    // 20. 렌터카 리스트 조회 API
    app.get('/app/rentalcars', leisure.getRentalCars);

};