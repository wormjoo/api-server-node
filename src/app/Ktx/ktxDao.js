// 모든 ktx 조회
async function selectKtx(connection) {
    const selectKtxListQuery = `
                SELECT ktxNumber, date, departureTime, arrivalTime, S1.name as departure, S2.name as destination, price
                FROM Ktx K
                JOIN Station S1 ON K.departure = S1.id
                JOIN Station S2 ON K.destination = S2.id;
                `;
    const [ktxRows] = await connection.query(selectKtxListQuery);
    return ktxRows;
}

// 도착지역으로 ktx 조회
async function selectDestination(connection, destination) {
    const selectDestinationQuery = `
                SELECT ktxNumber, date, departureTime, arrivalTime, S1.name as departure, S2.name as destination, price
                FROM Ktx K
                JOIN Station S1 ON K.departure = S1.id
                JOIN Station S2 ON K.destination = S2.id
                WHERE destination = ?;
                `;
    const [destinationRows] = await connection.query(selectDestinationQuery, destination);
    return destinationRows;
}

// 출발지역으로 ktx 조회
async function selectDeparture(connection, departure) {
    const selectDepartureQuery = `
                SELECT ktxNumber, date, departureTime, arrivalTime, S1.name as departure, S2.name as destination, price
                FROM Ktx K
                JOIN Station S1 ON K.departure = S1.id
                JOIN Station S2 ON K.destination = S2.id
                WHERE departure = ?;
                `;
    const [departureRows] = await connection.query(selectDepartureQuery, departure);
    return departureRows;
}

// 출발, 도착지역으로 ktx 조회
async function selectStation(connection, departure, destination) {
    const selectStationQuery = `
                SELECT ktxNumber, date, departureTime, arrivalTime, S1.name as departure, S2.name as destination, price
                FROM Ktx K
                JOIN Station S1 ON K.departure = S1.id
                JOIN Station S2 ON K.destination = S2.id
                WHERE departure = ? AND destination = ?;
                `;
    const [stationRows] = await connection.query(selectStationQuery, [departure, destination]);
    return stationRows;
}

async function selectDepartureStation(connection, departure) {
    const selectDepartureStationQuery = `
                SELECT id, name
                FROM Station
                WHERE id = ?;
                `;
    const [departureStationRows] = await connection.query(selectDepartureStationQuery, departure);
    return departureStationRows;
}

async function selectDestinationStation(connection, destination) {
    const selectDestinationStationQuery = `
                SELECT id, name
                FROM Station
                WHERE id = ?;
                `;
    const [destinationStationRows] = await connection.query(selectDestinationStationQuery, destination);
    return destinationStationRows;
}

// ktx 생성
async function insertKtx(connection, insertKtxParams) {
    const insertKtxQuery = `
        INSERT INTO Ktx(ktxNumber, departure, destination, price)
        VALUES (?, ?, ?, ?);
    `;
    const insertKtxRow = await connection.query(
        insertKtxQuery,
        insertKtxParams
    );

    return insertKtxRow;
}

module.exports = {
    selectKtx,
    selectDestination,
    selectDeparture,
    selectStation,
    selectDepartureStation,
    selectDestinationStation,
    insertKtx,
};