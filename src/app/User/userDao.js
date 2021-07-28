// 모든 유저 조회
async function selectUser(connection) {
    const selectUserListQuery = `
                SELECT userId, name, nickname 
                FROM User;
                `;
    const [userRows] = await connection.query(selectUserListQuery);
    return userRows;
}

// userId로 회원 조회
async function selectUserId(connection, userId) {
    const selectUserIdQuery = `
                SELECT userId, name, nickname 
                FROM User 
                WHERE userId = ?;
                `;
    const [userIdRows] = await connection.query(selectUserIdQuery, userId);
    return userIdRows;
}

// 유저 생성
async function insertUserInfo(connection, insertUserInfoParams) {
    const insertUserInfoQuery = `
        INSERT INTO User(userId, password, name, nickname)
        VALUES (?, ?, ?, ?);
    `;
    const insertUserInfoRow = await connection.query(
        insertUserInfoQuery,
        insertUserInfoParams
    );

    return insertUserInfoRow;
}

// id로 회원 조회
async function selectId(connection, id) {
    const selectIdQuery = `
                 SELECT id, userId, name, nickname
                 FROM User
                 WHERE id = ?;
                 `;
    const [userRow] = await connection.query(selectIdQuery, id);
    return userRow;
}

// 패스워드 체크
async function selectUserPassword(connection, selectUserPasswordParams) {
    const selectUserPasswordQuery = `
        SELECT userId, nickname, password
        FROM User 
        WHERE userId = ? ;
        `;
    const selectUserPasswordRow = await connection.query(
        selectUserPasswordQuery,
        selectUserPasswordParams
    );

    return selectUserPasswordRow;
}

// 유저 계정 상태 체크 (jwt 생성 위해 id 값도 가져온다.)
async function selectUserAccount(connection, userId) {
    const selectUserAccountQuery = `
        SELECT status, id
        FROM User
        WHERE userId = ?;
        `;
    const selectUserAccountRow = await connection.query(
        selectUserAccountQuery,
        userId
    );
    return selectUserAccountRow[0];
}

// 유저 정보 수정
async function updateUserInfo(connection, id, nickname) {
    const updateUserQuery = `
        UPDATE User
        SET nickname = ?
        WHERE id = ?;
        `;
    const updateUserRow = await connection.query(updateUserQuery, [nickname, id]);
    return updateUserRow[0];
}

module.exports = {
    selectUser,
    selectUserId,
    insertUserInfo,
    selectId,
    selectUserPassword,
    selectUserAccount,
    updateUserInfo,
};