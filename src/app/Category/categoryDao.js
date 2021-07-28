// 모든 카테고리 조회
async function selectCategory(connection) {
    const selectCategoryListQuery = `
                SELECT CASE 
                            WHEN type = 1
                            THEN '숙박'
                            WHEN type = 2
                            THEN '레저'
                            WHEN type = 3
                            THEN '교통'
                        END AS type,
                        subType, detailType
                FROM Category;
                `;
    const [categoryRows] = await connection.query(selectCategoryListQuery);
    return categoryRows;
}

// 타입으로 카테고리 조회
async function selectType(connection, type) {
    const selectTypeQuery = `
                SELECT CASE
                            WHEN type = 1
                            THEN '숙박'
                            WHEN type = 2
                            THEN '레저'
                            WHEN type = 3
                            THEN '교통'
                        END AS type,
                        subType, detailType
                FROM Category
                WHERE type = ?;
                `;
    const [typeRows] = await connection.query(selectTypeQuery, type);
    return typeRows;
}

// 디테일 카테고리 조회
async function selectDetailType(connection, detailType) {
    const selectDetailTypeQuery = `
                SELECT type, subType, detailType 
                FROM Category
                WHERE detailType = ?;
                `;
    const [detailRows] = await connection.query(selectDetailTypeQuery, detailType);
    return detailRows;
}

// 카테고리 생성
async function insertCategory(connection, insertCategoryParams) {
    const insertCategoryQuery = `
                INSERT INTO Category(type, subType, detailType)
                VALUES (?, ?, ?);
    `;
    const insertCategoryRow = await connection.query(
        insertCategoryQuery,
        insertCategoryParams
    );

    return insertCategoryRow;
}

module.exports = {
    selectCategory,
    selectType,
    selectDetailType,
    insertCategory,
};