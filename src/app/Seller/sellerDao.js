// 모든 판매자 조회
async function selectSeller(connection) {
    const selectSellerListQuery = `
                SELECT representative, brandName, email, businessNumber
                FROM Seller;
                `;
    const [sellerRows] = await connection.query(selectSellerListQuery);
    return sellerRows;
}

// 이름으로 판매자 조회
async function selectRepresentative(connection, representative) {
    const selectRepresentativeQuery = `
                SELECT representative, brandName, email, businessNumber
                FROM Seller 
                WHERE representative = ?;
                `;
    const [representativeRows] = await connection.query(selectRepresentativeQuery, representative);
    return representativeRows;
}

// 판매자 정보 수정
async function updateSeller(connection, id, address) {
    const updateSellerQuery = `
            UPDATE Seller
            SET address = ?
            WHERE id = ?;`;
    const updateSellerRow = await connection.query(updateSellerQuery, [address, id]);
    return updateSellerRow[0];
}

module.exports = {
    selectSeller,
    selectRepresentative,
    updateSeller,
};