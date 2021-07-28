module.exports = {

    // Success
    SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" },

    // Common
    TOKEN_EMPTY : { "isSuccess": false, "code": 2000, "message":"JWT 토큰을 입력해주세요." },
    TOKEN_VERIFICATION_FAILURE : { "isSuccess": false, "code": 3000, "message":"JWT 토큰 검증 실패" },
    TOKEN_VERIFICATION_SUCCESS : { "isSuccess": true, "code": 1001, "message":"JWT 토큰 검증 성공" }, // ?

    //Request error
    SIGNUP_ID_EMPTY : { "isSuccess": false, "code": 2001, "message":"아이디를 입력해주세요" },
    SIGNUP_ID_LENGTH : { "isSuccess": false, "code": 2002, "message":"아이디는 20자리 미만으로 입력해주세요." },
    SIGNUP_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2003, "message":"이메일을 형식을 정확하게 입력해주세요." },
    SIGNUP_PASSWORD_EMPTY : { "isSuccess": false, "code": 2004, "message": "비밀번호를 입력 해주세요." },
    SIGNUP_PASSWORD_LENGTH : { "isSuccess": false, "code": 2005, "message":"비밀번호는 6~20자리를 입력해주세요." },
    SIGNUP_NAME_EMPTY : { "isSuccess": false, "code": 2006, "message":"이름을 입력 해주세요." },
    SIGNUP_NICKNAME_EMPTY : { "isSuccess": false, "code": 2006, "message":"닉네임을 입력 해주세요." },
    SIGNUP_NICKNAME_LENGTH : { "isSuccess": false,"code": 2007,"message":"닉네임을 10자리 이하로 입력 해주세요." },

    SIGNIN_EMAIL_EMPTY : { "isSuccess": false, "code": 2008, "message":"이메일을 입력해주세요" },
    SIGNIN_EMAIL_LENGTH : { "isSuccess": false, "code": 2009, "message":"이메일은 30자리 미만으로 입력해주세요." },
    SIGNIN_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2010, "message":"이메일을 형식을 정확하게 입력해주세요." },
    SIGNIN_PASSWORD_EMPTY : { "isSuccess": false, "code": 2011, "message": "비밀번호를 입력 해주세요." },

    USER_ID_EMPTY : { "isSuccess": false, "code": 2012, "message": "조회하려는 유저 id를 입력해주세요." },
    USER_USERID_NOT_EXIST : { "isSuccess": false, "code": 2013, "message": "해당 회원이 존재하지 않습니다." },

    USER_USEREMAIL_EMPTY : { "isSuccess": false, "code": 2014, "message": "이메일을 입력해주세요." },
    USER_USEREMAIL_NOT_EXIST : { "isSuccess": false, "code": 2015, "message": "해당 이메일을 가진 회원이 존재하지 않습니다." },
    ID_NOT_MATCH : { "isSuccess": false, "code": 2016, "message": "유저의 id 값을 확인해주세요" },
    USER_NICKNAME_EMPTY : { "isSuccess": false, "code": 2017, "message": "변경할 닉네임 값을 입력해주세요" },

    USER_STATUS_EMPTY : { "isSuccess": false, "code": 2018, "message": "회원 상태값을 입력해주세요" },

    ADDROOM_ROOMNAME_EMPTY : { "isSuccess": false, "code": 2019, "message": "객실명을 입력해주세요" },
    ADDROOM_CHECKINDATE_EMPTY : { "isSuccess": false, "code": 2020, "message": "입실 날짜를 입력해주세요" },
    ADDROOM_CHECKOUTDATE_EMPTY : { "isSuccess": false, "code": 2021, "message": "퇴실 날짜를 입력해주세요" },
    ADDROOM_STANDARDPEOPLE_EMPTY : { "isSuccess": false, "code": 2022, "message": "기준 인원을 입력해주세요" },
    ADDROOM_MAXIMUMPEOPLE_EMPTY : { "isSuccess": false, "code": 2023, "message": "최대 인원을 입력해주세요" },
    ADDROOM_COSTPRICE_EMPTY : { "isSuccess": false, "code": 2024, "message": "원가를 입력해주세요" },
    ADDROOM_SALEPRICE_EMPTY : { "isSuccess": false, "code": 2025, "message": "세일가(판매가)을 입력해주세요" },

    ADDKTX_KTXNUMBER_EMPTY : { "isSuccess": false, "code": 2026, "message": "열차 번호를 입력해주세요" },
    ADDKTX_DEPARTURE_EMPTY : { "isSuccess": false, "code": 2027, "message": "출발역을 입력해주세요" },
    ADDKTX_DESTINATION_EMPTY : { "isSuccess": false, "code": 2028, "message": "도착역을 입력해주세요" },
    ADDKTX_PRICE_EMPTY : { "isSuccess": false, "code": 2029, "message": "가격을 입력해주세요" },

    ADDCATEGORY_TYPE_EMPTY : { "isSuccess": false, "code": 2030, "message":"타입을 입력해주세요" },
    ADDCATEGORY_SUBTYPE_EMPTY : { "isSuccess": false, "code": 2031, "message":"서브타입을 입력해주세요" },

    ADDRESERVATION_USERID_EMPTY : { "isSuccess": false, "code": 2032, "message":"회원 아이디를 입력해주세요" },
    ADDRESERVATION_ROOMID_EMPTY : { "isSuccess": false, "code": 2033, "message":"객실 아이디을 입력해주세요" },
    ADDRESERVATION_PAYMETHOD_EMPTY : { "isSuccess": false, "code": 2034, "message":"결제 방식을 입력해주세요" },

    ADDREVIEW_RESERVATIONID_EMPTY : { "isSuccess": false, "code": 2035, "message":"예약 아이디를 입력해주세요" },
    ADDREVIEW_ROOMNID_EMPTY : { "isSuccess": false, "code": 2036, "message":"객실 아이디을 입력해주세요" },
    ADDREVIEW_COMMENT_EMPTY : { "isSuccess": false, "code": 2037, "message":"리뷰 내용을 입력해주세요" },
    ADDREVIEW_RATING_EMPTY : { "isSuccess": false, "code": 2038, "message":"별점을 입력해주세요" },

    SELLER_ADDRESS_EMPTY : { "isSuccess": false, "code": 2039, "message":"주소를 입력해주세요" },

    // Response error
    SIGNUP_REDUNDANT_ID : { "isSuccess": false, "code": 3001, "message":"중복된 아이디입니다." },
    SIGNUP_REDUNDANT_NICKNAME : { "isSuccess": false, "code": 3002, "message":"중복된 닉네임입니다." },

    SIGNIN_USERID_WRONG : { "isSuccess": false, "code": 3003, "message": "아이디가 잘못 되었습니다." },
    SIGNIN_PASSWORD_WRONG : { "isSuccess": false, "code": 3004, "message": "비밀번호가 잘못 되었습니다." },
    SIGNIN_WITHDRAWAL_ACCOUNT : { "isSuccess": false, "code": 3006, "message": "탈퇴 된 계정입니다. 고객센터에 문의해주세요." },

    ADDROOM_ACCOMMODATION_NOT_EXIST : { "isSuccess": false, "code": 3007, "message": "해당 아이디를 가진 숙소가 존재하지 않습니다." },
    ADDROOM_STATION_NOT_EXIST : { "isSuccess": false, "code": 3008, "message": "해당 아이디를 가진 ktx역이 존재하지 않습니다." },

    ADDRESERVATION_USERID_NOT_EXIST : { "isSuccess": false, "code": 3009, "message": "해당 아이디를 가진 회원이 존재하지 않습니다." },
    ADDRESERVATION_ROOMID_NOT_EXIST : { "isSuccess": false, "code": 3010, "message": "해당 아이디를 가진 객실이 존재하지 않습니다." },

    ADDREVIEW_RESERVATIONID_NOT_EXIST : { "isSuccess": false, "code": 3011, "message": "해당 아이디를 가진 예약이 존재하지 않습니다." },
    ADDREVIEW_ROOMID_NOT_EXIST : { "isSuccess": false, "code": 3012, "message": "해당 아이디를 가진 객실이 존재하지 않습니다." },

    //Connection, Transaction 등의 서버 오류
    DB_ERROR : { "isSuccess": false, "code": 4000, "message": "데이터 베이스 에러"},
    SERVER_ERROR : { "isSuccess": false, "code": 4001, "message": "서버 에러"},


}
