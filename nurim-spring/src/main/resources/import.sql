-- 1. [안전 모드 해제]
SET SQL_SAFE_UPDATES = 0;

-- 2. [초기화]
DELETE FROM product;
DELETE FROM sub_category;
DELETE FROM main_category;

-- 3. [메인 카테고리]
INSERT INTO main_category (main_category_num, name) VALUES (1, '구독');
INSERT INTO main_category (main_category_num, name) VALUES (2, '구매');

-- 4. [서브 카테고리]
INSERT INTO sub_category (sub_category_num, main_category_num, name) VALUES (1, 1, 'TV');
INSERT INTO sub_category (sub_category_num, main_category_num, name) VALUES (2, 1, '냉장고');
INSERT INTO sub_category (sub_category_num, main_category_num, name) VALUES (3, 1, '세탁기/건조기');
INSERT INTO sub_category (sub_category_num, main_category_num, name) VALUES (4, 1, '에어컨');
INSERT INTO sub_category (sub_category_num, main_category_num, name) VALUES (5, 1, '공기청정기');

INSERT INTO sub_category (sub_category_num, main_category_num, name) VALUES (6, 2, 'TV');
INSERT INTO sub_category (sub_category_num, main_category_num, name) VALUES (7, 2, '냉장고');
INSERT INTO sub_category (sub_category_num, main_category_num, name) VALUES (8, 2, '세탁기/건조기');
INSERT INTO sub_category (sub_category_num, main_category_num, name) VALUES (9, 2, '에어컨');
INSERT INTO sub_category (sub_category_num, main_category_num, name) VALUES (10, 2, '공기청정기');

-- 5. [제품 데이터 등록]
-- 컬럼 순서: (sub_category_num, brand, name, serial_num, img, price, price_48, price_36)
-- price는 60개월 가격임

-- [구독: TV (1번)]
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36, discount_rate) VALUES (1, 'LG', '스탠바이미', '27ART10AKPL', 'tv_lg_01.jpg', 24900, 29900, 39900, 30);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36, discount_rate) VALUES (1, 'LG', '스탠바이미 Go', '27LX5QKNA', 'tv_lg_02.jpg', 26900, 31900, 41900, 43);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36, discount_rate) VALUES (1, 'Samsung', '더 세리프 (55)', 'KQ55LST01BFXKR', 'tv_sam_01.jpg', 38900, 45900, 59900, 20);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (1, 'Samsung', '더 프레임 (65)', 'KQ65LST03AFXKR', 'tv_sam_02.jpg', 46900, 54900, 72900);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (1, 'Samsung', '더 세로 (43)', 'KQ43LST05BFXKR', 'tv_sam_03.jpg', 32900, 38900, 49900);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (1, 'LG', '올레드 포제 (55)', '55LX1QKNA', 'tv_lg_03.jpg', 59900, 69900, 92900);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (1, 'LG', '올레드 Evo (65)', 'OLED65C3SNA', 'tv_lg_04.jpg', 75900, 89900, 119000);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (1, 'Samsung', 'Neo QLED 8K (85)', 'KQ85QNC900FXKR', 'tv_sam_04.jpg', 159000, 189000, 259000);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (1, 'Samsung', '더 프레임 (75)', 'KQ75LSD03AFXKR', 'tv_sam_05.jpg', 21900, 25900, 34900);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (1, 'LG', 'QNED (75)', '75QNED65ABA', 'tv_lg_05.jpg', 19483, 24354, 32472);

-- [구독: 냉장고 (2번)]
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (2, 'Samsung', '비스포크 4도어(키친핏)', 'RF85C9001AP', 'ref_sam_01.jpg', 69900, 79900, 109000);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (2, 'LG', '오브제 무드업', 'M870GBB451', 'ref_lg_01.jpg', 99000, 115000, 155000);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (2, 'LG', '오브제컬렉션 STEM', 'W825MHH182S', 'ref_lg_02.jpg', 92900, 109000, 145000);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (2, 'LG', '디오스 양문형', 'S834SS32', 'ref_lg_03.jpg', 38900, 47900, 62900);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (2, 'Samsung', '양문형 냉장고', 'RS84T5081SA', 'ref_sam_02.jpg', 37900, 45900, 59900);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (2, 'Samsung', '비스포크 글램', 'RF85C9111AP', 'ref_sam_03.jpg', 64900, 75900, 99000);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (2, 'LG', '오브제 컬렉션', 'T873MEE111', 'ref_lg_04.jpg', 67900, 79900, 105000);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (2, 'Samsung', '비스포크 인피니트 라인', 'RR40B9981APG', 'ref_sam_04.jpg', 37900, 44900, 59900);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (2, 'LG', '오브제컬렉션 노크온', 'J848ND79', 'ref_lg_05.jpg', 189000, 219000, 295000);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (2, 'Samsung', '셰프컬렉션', 'RF10T9995APG', 'ref_sam_05.jpg', 259000, 309000, 419000);

-- [구독: 세탁기/건조기 (3번)]
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (3, 'LG', '트롬 오브제컬렉션 워시타워', 'WL21WDU', 'wash_lg_01.jpg', 32000, 40000, 53000);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (3, 'LG', '트롬 AI 오브제컬렉션 워시타워', 'WA2525GEHF', 'wash_lg_02.jpg', 48000, 60000, 80000);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (3, 'LG', '트롬 워시타워', 'W20WD', 'wash_lg_03.jpg', 28000, 34000, 46000);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (3, 'LG', '트롬 워시타워 컴팩트', 'W10BN', 'wash_lg_04.jpg', 23000, 29000, 39000);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (3, 'LG', '트롬 AI 오브제컬렉션 워시타워', 'WA2525YMHF', 'wash_lg_05.jpg', 48000, 60000, 80000);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (3, 'Samsung', '비스포크 그랑데 AI 원바디', 'WF2522HDEEE', 'wash_sam_01.jpg', 28000, 35000, 46000);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (3, 'Samsung', '비스포크 그랑데 AI 원바디', 'WH90F2520GBHW', 'wash_sam_02.jpg', 25000, 32000, 42000);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (3, 'Samsung', '비스포크 그랑데 AI 원바디', 'WF2420HCWWC', 'wash_sam_03.jpg', 23000, 29000, 39000);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (3, 'Samsung', '비스포크 그랑데 AI 원바디', 'WF2420HCVVC', 'wash_sam_04.jpg', 23000, 29000, 39000);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (3, 'Samsung', '비스포크 그랑데 AI 원바디', 'WH90F2120GBHT', 'wash_sam_05.jpg', 28000, 34000, 46000);

-- [구독: 에어컨 (4번)]
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (4, 'Samsung', 'Q9000', 'AF60F17D11GS', 'ac_sam_01.jpg', 15000, 19000, 25000);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (4, 'Carrier', 'All New 에어로 18단', 'RSCA180PAWWSD', 'ac_cra_01.jpg', 14000, 17000, 23000);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (4, 'Samsung', '비스포크 무풍 클래식', 'AF70F19D11GS', 'ac_sam_02.jpg', 20000, 25000, 33000);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (4, 'LG', '오브제컬렉션 휘센 위너', 'FQ17HDWHC1', 'ac_lg_01.jpg', 18000, 22000, 30000);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (4, 'LG', '오브제컬렉션 휘센 듀얼 히트', 'FQ18HDDHA1', 'ac_lg_02.jpg', 30000, 37000, 50000);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (4, 'LG', '휘센', 'SQ06EZ1WBS', 'ac_lg_03.jpg', 5000, 6000, 8000);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (4, 'Samsung', '무풍에어컨 콤보', 'AR60F07D11WS', 'ac_sam_03.jpg', 9000, 11000, 15000);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (4, 'Carrier', '캐리어 에어컨', 'DARB0061GAWSD', 'ac_cra_02.jpg', 7000, 9000, 12000);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (4, 'LG', '휘센', 'SQ07FS8EES', 'ac_lg_03.jpg', 14000, 17000, 23000);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (4, 'Samsung', '와이드', 'AR10T5170HZS', 'ac_sam_04.jpg', 7000, 9000, 11000);

-- [구독: 공기청정기 (5번)]
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (5, 'LG', '오브제컬렉션 퓨리케어 에어로퍼니처', 'AS062PWHAR', 'air_lg_01.jpg', 12900, 14900, 19900);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (5, 'LG', '오브제컬렉션 퓨리케어 360˚', 'AS353NG4A', 'air_lg_02.jpg', 35900, 41900, 55900);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (5, 'Samsung', '비스포크 큐브 Air 인피니트', 'AX100DB990UDD', 'air_sam_01.jpg', 31900, 36900, 49900);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (5, 'Samsung', '비스포크 큐브 Air 펫케어', 'AX106B850SGD', 'air_sam_02.jpg', 15000, 19000, 25000);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (5, 'Dyson', '쿨 공기청정기', 'TP07', 'air_dy_01.jpg', 6000, 8000, 10000);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (5, 'Dyson', '빅+콰이엇 포름알데히드', 'BP03', 'air_dy_02.jpg', 10000, 12000, 16000);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (5, 'Balmuda', '더 퓨어', 'A01B-WH', 'air_bal_01.jpg', 6000, 8000, 10000);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (5, 'Winix', '타워 프라임', 'APRM833-JWK', 'air_winix_01.jpg', 4000, 5000, 6000);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (5, 'Winix', '제로 S', 'AZSE430-JWK', 'air_winix_02.jpg', 5500, 6900, 8900);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (5, 'Samsung', '블루스카이 5500', 'AX60A5510WDD', 'air_sam_03.jpg', 6000, 8000, 10000);


-- [구매 상품] (가격 = 일시불, 나머지는 0원)
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (6, 'LG', '스탠바이미', '27ART10AKPL', 'tv_lg_01.jpg', 1150000, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (6, 'LG', '스탠바이미 Go', '27LX5QKNA', 'tv_lg_02.jpg', 1190000, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (6, 'Samsung', '더 세리프 (55)', 'KQ55LST01BFXKR', 'tv_sam_01.jpg', 1750000, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (6, 'Samsung', '더 프레임 (65)', 'KQ65LST03AFXKR', 'tv_sam_02.jpg', 2100000, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (6, 'Samsung', '더 세로 (43)', 'KQ43LST05BFXKR', 'tv_sam_03.jpg', 1450000, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (6, 'LG', '올레드 포제 (55)', '55LX1QKNA', 'tv_lg_03.jpg', 2690000, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (6, 'LG', '올레드 Evo (65)', 'OLED65C3SNA', 'tv_lg_04.jpg', 3400000, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (6, 'Samsung', 'Neo QLED 8K (85)', 'KQ85QNC900FXKR', 'tv_sam_04.jpg', 7500000, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (6, 'Samsung', '더 프레임 (75)', 'KQ75LSD03AFXKR', 'tv_sam_05.jpg', 990000, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (6, 'LG', 'QNED (75)', '75QNED65ABA', 'tv_lg_05.jpg', 1670000, 0, 0);

INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (7, 'Samsung', '비스포크 4도어(키친핏)', 'RF85C9001AP', 'ref_sam_01.jpg', 3200000, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (7, 'LG', '오브제 무드업', 'M870GBB451', 'ref_lg_01.jpg', 4500000, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (7, 'LG', '오브제컬렉션 STEM', 'W825MHH182S', 'ref_lg_02.jpg', 4200000, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (7, 'LG', '디오스 양문형', 'S834SS32', 'ref_lg_03.jpg', 1800000, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (7, 'Samsung', '양문형 냉장고', 'RS84T5081SA', 'ref_sam_02.jpg', 1750000, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (7, 'Samsung', '비스포크 글램', 'RF85C9111AP', 'ref_sam_03.jpg', 2900000, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (7, 'LG', '오브제 컬렉션', 'T873MEE111', 'ref_lg_04.jpg', 3100000, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (7, 'Samsung', '비스포크 인피니트 라인', 'RR40B9981APG', 'ref_sam_04.jpg', 1700000, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (7, 'LG', '오브제컬렉션 노크온', 'J848ND79', 'ref_lg_05.jpg', 8500000, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (7, 'Samsung', '셰프컬렉션', 'RF10T9995APG', 'ref_sam_05.jpg', 12000000, 0, 0);

INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (8, 'LG', '트롬 오브제컬렉션 워시타워', 'WL21WDU', 'wash_lg_01.jpg', 2721880, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (8, 'LG', '트롬 AI 오브제컬렉션 워시타워', 'WA2525GEHF', 'wash_lg_02.jpg', 4071600, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (8, 'LG', '트롬 워시타워', 'W20WD', 'wash_lg_03.jpg', 2319120, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (8, 'LG', '트롬 워시타워 컴팩트', 'W10BN', 'wash_lg_04.jpg', 1960000, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (8, 'LG', '트롬 AI 오브제컬렉션 워시타워', 'WA2525YMHF', 'wash_lg_05.jpg', 4071600, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (8, 'Samsung', '비스포크 그랑데 AI 원바디', 'WF2522HDEEE', 'wash_sam_01.jpg', 2349000, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (8, 'Samsung', '비스포크 그랑데 AI 원바디', 'WH90F2520GBHW', 'wash_sam_02.jpg', 2128000, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (8, 'Samsung', '비스포크 그랑데 AI 원바디', 'WF2420HCWWC', 'wash_sam_03.jpg', 1958000, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (8, 'Samsung', '비스포크 그랑데 AI 원바디', 'WF2420HCVVC', 'wash_sam_04.jpg', 1958000, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (8, 'Samsung', '비스포크 그랑데 AI 원바디', 'WH90F2120GBHT', 'wash_sam_05.jpg', 2319000, 0, 0);

INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (9, 'Samsung', 'Q9000', 'AF60F17D11GS', 'ac_sam_01.jpg', 1273000, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (9, 'Carrier', 'All New 에어로 18단', 'RSCA180PAWWSD', 'ac_cra_01.jpg', 1139000, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (9, 'Samsung', '비스포크 무풍 클래식', 'AF70F19D11GS', 'ac_sam_02.jpg', 1680000, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (9, 'LG', '오브제컬렉션 휘센 위너', 'FQ17HDWHC1', 'ac_lg_01.jpg', 1492000, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (9, 'LG', '오브제컬렉션 휘센 듀얼 히트', 'FQ18HDDHA1', 'ac_lg_02.jpg', 2529000, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (9, 'LG', '휘센', 'SQ06EZ1WBS', 'ac_lg_03.jpg', 410000, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (9, 'Samsung', '무풍에어컨 콤보', 'AR60F07D11WS', 'ac_sam_03.jpg', 745000, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (9, 'Carrier', '캐리어 에어컨', 'DARB0061GAWSD', 'ac_cra_02.jpg', 579000, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (9, 'LG', '휘센', 'SQ07FS8EES', 'ac_lg_03.jpg', 1144000, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (9, 'Samsung', '와이드', 'AR10T5170HZS', 'ac_sam_04.jpg', 564000, 0, 0);

INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (10, 'LG', '오브제컬렉션 퓨리케어 에어로퍼니처', 'AS062PWHAR', 'air_lg_01.jpg', 550000, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (10, 'LG', '오브제컬렉션 퓨리케어 360˚', 'AS353NG4A', 'air_lg_02.jpg', 1600000, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (10, 'Samsung', '비스포크 큐브 Air 인피니트', 'AX100DB990UDD', 'air_sam_01.jpg', 1400000, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (10, 'Samsung', '비스포크 큐브 Air 펫케어', 'AX106B850SGD', 'air_sam_02.jpg', 1239000, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (10, 'Dyson', '쿨 공기청정기', 'TP07', 'air_dy_01.jpg', 494000, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (10, 'Dyson', '빅+콰이엇 포름알데히드', 'BP03', 'air_dy_02.jpg', 789000, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (10, 'Balmuda', '더 퓨어', 'A01B-WH', 'air_bal_01.jpg', 489000, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (10, 'Winix', '타워 프라임', 'APRM833-JWK', 'air_winix_01.jpg', 287000, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (10, 'Winix', '제로 S', 'AZSE430-JWK', 'air_winix_02.jpg', 250000, 0, 0);
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_48, price_36) VALUES (10, 'Samsung', '블루스카이 5500', 'AX60A5510WDD', 'air_sam_03.jpg', 500000, 0, 0);

-- 6. [안전 모드]
SET SQL_SAFE_UPDATES = 1;