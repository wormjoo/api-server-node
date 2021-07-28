module.exports = function(app){
    const room = require('./roomController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 7. 판매자 조회 API (+숙소명으로 검색)
    app.get('/app/rooms', room.getRooms);

    // 8. 특정 객실 리뷰 조회 API (+객실 아이디로 조회)
    app.get('/app/reviews/:id', room.getReviews);

    // 9. 객실 추가 API
    app.post('/app/rooms', room.postRooms);

    // 15. 객실 예약 추가 API
    app.post('/app/reservations', room.postReservations);

    // 16. 객실 리뷰 추가 API
    app.post('/app/reviews', room.postReviews);

    // 17. 리뷰 수정 API
    app.patch('/app/reviews/:id', room.patchReviews);

};