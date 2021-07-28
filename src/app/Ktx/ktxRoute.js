module.exports = function(app){
    const ktx = require('./ktxController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 10. ktx 조회 (출발지역, 도착지역으로 검색)
    app.get('/app/ktxs', ktx.getKtxs);

    // 11. ktx 생성
    app.post('/app/ktxs', ktx.postKtxs);

};