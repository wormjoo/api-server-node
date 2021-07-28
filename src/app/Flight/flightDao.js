// 모든 항공권 조회
async function selectFlight(connection) {
    const selectFlightListQuery = `
                SELECT airline, departureTime, arrivalTime, A1.name as departure, A2.name as destination, price
                FROM Flight F
                JOIN Airport A1 ON F.departure = A1.id
                JOIN Airport A2 ON F.destination = A2.id;
                `;
    const [flightRows] = await connection.query(selectFlightListQuery);
    return flightRows;
}

// 도착지역으로 ktx 조회
async function selectDestinationAirport(connection, destination) {
    const selectDestinationAirportQuery = `
                SELECT airline, departureTime, arrivalTime, A1.name as departure, A2.name as destination, price
                FROM Flight F
                JOIN Airport A1 ON F.departure = A1.id
                JOIN Airport A2 ON F.destination = A2.id;
                WHERE destination = ?;
                `;
    const [destinationRows] = await connection.query(selectDestinationAirportQuery, destination);
    return destinationRows;
}

// 출발지역으로 ktx 조회
async function selectDepartureAirport(connection, departure) {
    const selectDepartureAirportQuery = `
                SELECT airline, departureTime, arrivalTime, A1.name as departure, A2.name as destination, price
                FROM Flight F
                JOIN Airport A1 ON F.departure = A1.id
                JOIN Airport A2 ON F.destination = A2.id;
                WHERE departure = ?;
                `;
    const [departureRows] = await connection.query(selectDepartureAirportQuery, departure);
    return departureRows;
}

// 출발, 도착지역으로 ktx 조회
async function selectAirport(connection, departure, destination) {
    const selectAirportQuery = `
                SELECT airline, departureTime, arrivalTime, A1.name as departure, A2.name as destination, price
                FROM Flight F
                JOIN Airport A1 ON F.departure = A1.id
                JOIN Airport A2 ON F.destination = A2.id;
                WHERE departure = ? AND destination = ?;
                `;
    const [airportRows] = await connection.query(selectAirportQuery, [departure, destination]);
    return airportRows;
}

async function selectDepartureInAirport(connection, departure) {
    const selectDepartureInAirportQuery = `
                SELECT id, name
                FROM Airport
                WHERE id = ?;
                `;
    const [departureAirportRows] = await connection.query(selectDepartureInAirportQuery, departure);
    return departureAirportRows;
}

async function selectDestinationInAirport(connection, destination) {
    const selectDestinationInAirportQuery = `
                SELECT id, name
                FROM Airport
                WHERE id = ?;
                `;
    const [destinationAirportRows] = await connection.query(selectDestinationInAirportQuery, destination);
    return destinationAirportRows;
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
    selectFlight,
    selectDestinationAirport,
    selectDepartureAirport,
    selectAirport,
    selectDepartureInAirport,
    selectDestinationInAirport,
};