const jwtMiddleware = require("../../../config/jwtMiddleware");
const categoryProvider = require("../../app/Category/categoryProvider");
const categoryService = require("../../app/Category/categoryService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 13
 * API Name : 카테고리 전체 조회 (타입별 조회)
 * [GET] /app/categorys
 */
exports.getCategorys = async function (req, res) {
    /**
     * Query String: representative
     */
    const type = req.query.type;

    if (!type) {
        // 판매자 전체 조회
        const categoryListResult = await categoryProvider.retrieveCategoryList();
        return res.send(response(baseResponse.SUCCESS, categoryListResult));
    } else {
        // 판매자 검색 조회
        const categoryListByType = await categoryProvider.retrieveCategoryList(type);
        return res.send(response(baseResponse.SUCCESS, categoryListByType));
    }
};

/**
 * API No. 14
 * API Name : 카테고리 생성 API
 * [POST] /app/categorys
 */
exports.postCategorys = async function (req, res) {

    /**
     * Body: type, subType, detailType
     */
    const {type, subType, detailType} = req.body;

    // 빈 값 체크
    if (!type)
        return res.send(response(baseResponse.ADDCATEGORY_TYPE_EMPTY));

    // 빈 값 체크
    if (!subType)
        return res.send(response(baseResponse.ADDCATEGORY_SUBTYPE_EMPTY));

    const addCategoryResponse = await categoryService.createCategory(
        type,
        subType,
        detailType
    );

    return res.send(addCategoryResponse);
};