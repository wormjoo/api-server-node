// 레저 아이디로 Ticket 조회
async function selectTicket(connection, id) {
    const selectTicketQuery = `
                SELECT name, description, costPrice, salePrice
                FROM Ticket
                WHERE typeId = ?;
                `;
    const [ticketRows] = await connection.query(selectTicketQuery, id);
    return ticketRows;
}

// 모든 렌트카 조회
async function selectCar(connection) {
    const selectCarListQuery = `
                select C.detailType as 지역이용권,
                       LARCI.image as 대표이미지,
                       LAR.name as 상품이름,
                       case
                           when LAR.useToday = 0
                               then 'O'
                           when LAR.useToday = 1
                               then 'X'
                           end as 당일사용,
                       case
                           when LAR.fullRefund = 0
                               then 'O'
                           when LAR.fullRefund = 1
                               then 'X'
                           end as 미사용전액환불,
                       T.costPrice as 원가,
                       T.salePrice as 할인가
                from LeisureAndRentalCar LAR
                         join Category C on C.id = LAR.categoryId
                         join LeisureAndRentalCarImage LARCI on LARCI.leisureAndTrafficId = LAR.id
                         join Ticket T on LAR.id = T.typeId
                where C.type = 3
                group by LAR.name;
                `;
    const [carRows] = await connection.query(selectCarListQuery);
    return carRows;
}

// type으로 렌트카 조회
async function selectCarByType(connection, type) {
    const selectCarByTypeQuery = `
                select C.detailType as 지역이용권,
                       LARCI.image as 대표이미지,
                       LAR.name as 상품이름,
                       case
                           when LAR.useToday = 0
                               then 'O'
                           when LAR.useToday = 1
                               then 'X'
                           end as 당일사용,
                       case
                           when LAR.fullRefund = 0
                               then 'O'
                           when LAR.fullRefund = 1
                               then 'X'
                           end as 미사용전액환불,
                       T.costPrice as 원가,
                       T.salePrice as 할인가
                from LeisureAndRentalCar LAR
                         join Category C on C.id = LAR.categoryId
                         join LeisureAndRentalCarImage LARCI on LARCI.leisureAndTrafficId = LAR.id
                         join Ticket T on LAR.id = T.typeId
                where C.type = 3
                And LAR.categoryId = ?
                group by LAR.name;
                `;
    const [carByTypeRows] = await connection.query(selectCarByTypeQuery, type);
    return carByTypeRows;
}

module.exports = {
    selectTicket,
    selectCar,
    selectCarByType,
};