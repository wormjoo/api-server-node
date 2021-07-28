const jwtMiddleware = require("../../../config/jwtMiddleware");
const sellerProvider = require("../../app/Seller/sellerProvider");
const sellerService = require("../../app/Seller/sellerService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 6
 * API Name : 판매자 조회 API (+이름으로 검색)
 * [GET] /app/sellers
 */
exports.getSellers = async function (req, res) {
    /**
     * Query String: representative
     */
    const representative = req.query.representative;

    if (!representative) {
        // 판매자 전체 조회
        const sellerListResult = await sellerProvider.retrieveSellerList();
        return res.send(response(baseResponse.SUCCESS, sellerListResult));
    } else {
        // 판매자 검색 조회
        const sellerListByRepresentative = await sellerProvider.retrieveSellerList(representative);
        return res.send(response(baseResponse.SUCCESS, sellerListByRepresentative));
    }
};

/**
 * API No. 18
 * API Name : 판매자 정보 수정 API
 * [PATCH] /app/sellers/:id
 * path variable : id
 * body : address
 */
exports.patchSellers = async function (req, res) {

    const id = req.params.id;
    const address = req.body.address;

    if (!address)
        return res.send(errResponse(baseResponse.SELLER_ADDRESS_EMPTY));

    const editSeller = await sellerService.editSeller(id, address)
    return res.send(editSeller);

};