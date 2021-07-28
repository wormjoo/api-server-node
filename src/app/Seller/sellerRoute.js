module.exports = function(app){
    const seller = require('./sellerController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 6. 판매자 조회 API (+이름으로 검색)
    app.get('/app/sellers', seller.getSellers);

    // 18. 판매자 정보 수정 API
    app.patch('/app/sellers/:id', seller.patchSellers);

};