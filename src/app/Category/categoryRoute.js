module.exports = function(app){
    const category = require('./categoryController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 13. 카테고리 전체 조회 (타입별 조회)
    app.get('/app/categorys', category.getCategorys);

    // 14. 카테고리 추가
    app.post('/app/categorys', category.postCategorys);

};