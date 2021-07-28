// 모든 객실 조회
async function selectRoom(connection) {
    const selectRoomListQuery = `
                SELECT R.id as roomId, A.id as accommodationId, A.name as accommodation, R.roomName
                FROM Room R, Accommodation A
                WHERE R.accommodationId = A.id;
                `;
    const [roomRows] = await connection.query(selectRoomListQuery);
    return roomRows;
}

// 숙소 아이디로 객실 조회
async function selectAccommodationId(connection, accommodationId) {
    const selectAccommodationIdQuery = `
                SELECT R.id as roomId, A.name as accommodation, R.roomName
                FROM Room R, Accommodation A
                WHERE R.accommodationId = A.id
                AND A.id = ?;
                `;
    const [accommodationIdRows] = await connection.query(selectAccommodationIdQuery, accommodationId);
    return accommodationIdRows;
}

// 객실 아이디로 리뷰 조회
async function selectReview(connection, id) {
    const selectReviewQuery = `
                 SELECT R.id, R.roomName, RR.comment
                 FROM Room R, RoomReview RR
                 WHERE R.id = RR.roomId
                 AND R.id = ?;
                 `;
    const [reviewRow] = await connection.query(selectReviewQuery, id);
    return reviewRow;
}

// id로 숙소 조회
async function selectAccommodation(connection, accommodationId) {
    const selectAccommodationQuery = `
                SELECT id, name
                FROM Accommodation
                WHERE id = ?;
                `;
    const [accommodationRows] = await connection.query(selectAccommodationQuery, accommodationId);
    return accommodationRows;
}

// userId로 회원 조회
async function selectUserId(connection, userId) {
    const selectUserIdQuery = `
                SELECT id, userId, name, nickname 
                FROM User 
                WHERE id = ?;
                `;
    const [userIdRows] = await connection.query(selectUserIdQuery, userId);
    return userIdRows;
}

// roomId로 객실 조회
async function selectRoomId(connection, roomId) {
    const selectRoomIdQuery = `
                SELECT id, accommodationId, roomName
                FROM Room
                WHERE id = ?;
                `;
    const [roomIdRows] = await connection.query(selectRoomIdQuery, roomId);
    return roomIdRows;
}

// reservationId로 예약 조회
async function selectReservationId(connection, reservationId) {
    const selectReservationIdQuery = `
                SELECT id
                FROM Reservation
                WHERE id = ?;
                `;
    const [reservationIdRows] = await connection.query(selectReservationIdQuery, reservationId);
    return reservationIdRows;
}

// 객실 생성
async function insertRoom(connection, insertRoomParams) {
    const insertRoomQuery = `
        INSERT INTO Room(accommodationId, roomName, checkInDate, checkOutDate, standardPeople, maximumPeople, costPrice, salePrice)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;
    const insertRoomRow = await connection.query(
        insertRoomQuery,
        insertRoomParams
    );

    return insertRoomRow;
}

// 예약 생성
async function insertReservation(connection, insertReservationParams) {
    const insertReservationQuery = `
        INSERT INTO Reservation(userId, roomId, adultCount, childCount, payMethod)
        VALUES (?, ?, ?, ?, ?);
    `;
    const insertReservationRow = await connection.query(
        insertReservationQuery,
        insertReservationParams
    );

    return insertReservationRow;
}

// 리뷰 생성
async function insertReview(connection, insertReviewParams) {
    const insertReviewQuery = `
        INSERT INTO RoomReview(reservationId, roomId, comment, rating)
        VALUES (?, ?, ?, ?);
    `;
    const insertReviewRow = await connection.query(
        insertReviewQuery,
        insertReviewParams
    );

    return insertReviewRow;
}

// 리뷰 수정
async function updateReview(connection, id, comment) {
    const updateReviewQuery = `
            UPDATE RoomReview
            SET comment = ?
            WHERE id = ?;`;
    const updateReviewRow = await connection.query(updateReviewQuery, [comment, id]);
    return updateReviewRow[0];
}

module.exports = {
    selectRoom,
    selectAccommodationId,
    selectReview,
    selectAccommodation,
    insertRoom,
    selectUserId,
    selectRoomId,
    insertReservation,
    selectReservationId,
    insertReview,
    updateReview,
};