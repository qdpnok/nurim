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
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, discount_rate, spec) VALUES (1, 'LG', '스탠바이미', '27ART10AKPL', 'tv_lg_01.jpg', 1150000, 24900, 29900, 39900, 30, 'LED TV / 27인치(68cm) / FHD / 2021년형');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, discount_rate, spec) VALUES (1, 'LG', '스탠바이미 Go', '27LX5QKNA', 'tv_lg_02.jpg', 1190000, 26900, 31900, 41900, 43, 'LED TV / 27인치(68cm) / FHD / 2023년형');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, discount_rate, spec) VALUES (1, 'Samsung', '더 세리프 (55)', 'KQ55LST01BFXKR', 'tv_sam_01.jpg', 1750000, 38900, 45900, 59900, 20, 'QLED TV / 55인치(138cm) / 4K UHD / 2020년형');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (1, 'Samsung', '더 프레임 (65)', 'KQ65LST03AFXKR', 'tv_sam_02.jpg', 2100000, 46900, 54900, 72900, 'QLED TV / 65인치(159cm) / 4K UHD / 2020년형');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (1, 'Samsung', '더 세로 (43)', 'KQ43LST05BFXKR', 'tv_sam_03.jpg', 1450000, 32900, 38900, 49900, 'QLED TV / 43인치(108cm) / 4K UHD / 2020년형');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (1, 'LG', '올레드 포제 (55)', '55LX1QKNA', 'tv_lg_03.jpg', 2690000, 59900, 69900, 92900, 'OLED TV / 55인치(138cm) / 4K UHD / 2022년형');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (1, 'LG', '올레드 Evo (65)', 'OLED65C3SNA', 'tv_lg_04.jpg', 3400000, 75900, 89900, 119000, 'OLED TV / 65인치(163cm) / 4K UHD / 2023년형');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (1, 'Samsung', 'Neo QLED 8K (85)', 'KQ85QNC900FXKR', 'tv_sam_04.jpg', 7500000, 159000, 189000, 259000, '미니LED TV / 85인치(214cm) / 8K UHD / 2023년형');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (1, 'Samsung', '더 프레임 (75)', 'KQ75LSD03AFXKR', 'tv_sam_05.jpg', 990000, 21900, 25900, 34900, 'QLED TV / 75인치(189cm) / 4K UHD / 2024년형');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (1, 'LG', 'QNED (75)', '75QNED65ABA', 'tv_lg_05.jpg', 1670000, 19483, 24354, 32472, 'QNED TV / 75인치(189cm) / 4K UHD / 2025년형');

-- [구독: 냉장고 (2번)]
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (2, 'Samsung', '비스포크 4도어(키친핏)', 'RF85C9001AP', 'ref_sam_01.jpg', 3200000, 69900, 79900, 109000, '총용량 875L / 크기(가로x세로x깊이) 912x1853x930mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (2, 'LG', '오브제 무드업', 'M870GBB451', 'ref_lg_01.jpg', 4500000, 99000, 115000, 155000, '총용량 870L / 크기(가로x세로x깊이) 914x1860x918mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (2, 'LG', '오브제컬렉션', 'W825MHH182S', 'ref_lg_02.jpg', 4200000, 92900, 109000, 145000, '총용량 817L / 크기(가로x세로x깊이) 914x1860x918mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (2, 'LG', '디오스 양문형', 'S834SS32', 'ref_lg_03.jpg', 1800000, 38900, 47900, 62900, '총용량 832L / 크기(가로x세로x깊이) 913x1790x913mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (2, 'Samsung', '양문형 냉장고', 'RS84T5081SA', 'ref_sam_02.jpg', 1750000, 37900, 45900, 59900, '총용량 846L / 크기(가로x세로x깊이) 912x1780x915mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (2, 'Samsung', '비스포크 글램', 'RF85C9111AP', 'ref_sam_03.jpg', 2900000, 64900, 75900, 99000, '총용량 875L / 크기(가로x세로x깊이) 912x1853x930mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (2, 'LG', '오브제 컬렉션', 'T873MEE111', 'ref_lg_04.jpg', 3100000, 67900, 79900, 105000, '총용량 870L / 크기(가로x세로x깊이) 914x1787x918mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (2, 'Samsung', '비스포크 인피니트 라인 키친핏 럭스', 'RR40B9981APG', 'ref_sam_04.jpg', 1700000, 37900, 44900, 59900, '총용량 386L / 크기(가로x세로x깊이) 595x1855x688mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (2, 'LG', '오브제컬렉션 노크온', 'J848ND79', 'ref_lg_05.jpg', 8500000, 189000, 219000, 295000, '총용량 840L / 크기(가로x세로x깊이) 912x1784x929mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (2, 'Samsung', '셰프컬렉션', 'RF10T9995APG', 'ref_sam_05.jpg', 12000000, 259000, 309000, 419000, '총용량 840L / 크기(가로x세로x깊이) 912x1784x929mm');

-- [세탁기/건조기]
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (3, 'LG', '트롬 오브제컬렉션 워시타워', 'WL21WDU', 'wash_lg_01.jpg', 2721880, 32000, 40000, 53000, '세탁 25kg/건조 21kg / 직렬 ±700x1890x830mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (3, 'LG', '트롬 AI 오브제컬렉션 워시타워', 'WA2525GEHF', 'wash_lg_02.jpg', 4071600, 48000, 60000, 80000, '세탁 25kg/건조 25kg / 직렬 ±700x1890x830mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (3, 'LG', '트롬 워시타워', 'W20WD', 'wash_lg_03.jpg', 2319120, 28000, 34000, 46000, '세탁 24kg/건조 20kg / 직렬 ±700x1890x830mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (3, 'LG', '트롬 워시타워 컴팩트', 'W10BN', 'wash_lg_04.jpg', 1960000, 23000, 29000, 39000, '세탁 13kg/건조 10kg / 직렬 ±600x1655x660mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (3, 'LG', '트롬 AI 오브제컬렉션 워시타워', 'WA2525YMHF', 'wash_lg_05.jpg', 4071600, 48000, 60000, 80000, '세탁 25kg/건조 25kg / 직렬 ±700x1890x830mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (3, 'Samsung', '비스포크 그랑데 AI 원바디 Top-fit', 'WF2522HDEEE', 'wash_sam_01.jpg', 2349000, 28000, 35000, 46000, '세탁 25kg/건조 20kg / 직렬 ±686x1890x875mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (3, 'Samsung', '비스포크 그랑데 AI 원바디 Top-fit', 'WH90F2520GBHW', 'wash_sam_02.jpg', 2128000, 25000, 32000, 42000, '세탁 25kg/건조 20kg / 직렬 ±686x1890x875mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (3, 'Samsung', '비스포크 그랑데 AI 원바디 Top-fit', 'WF2420HCWWC', 'wash_sam_03.jpg', 1958000, 23000, 29000, 39000, '세탁 24kg/건조 20kg / 직렬 ±686x1890x872mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (3, 'Samsung', '비스포크 그랑데 AI 원바디 Top-fit', 'WF2420HCVVC', 'wash_sam_04.jpg', 1958000, 23000, 29000, 39000, '세탁 24kg/건조 20kg / 직렬 ±686x1890x872mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (3, 'Samsung', '비스포크 그랑데 AI 원바디 Top-fit', 'WH90F2120GBHT', 'wash_sam_05.jpg', 2319000, 28000, 34000, 46000, '세탁 21kg/건조 20kg / 직렬 ±686x1890x875mm');

-- [에어컨]
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (4, 'Samsung', 'Q9000', 'AF60F17D11GS', 'ac_sam_01.jpg', 1273000, 15000, 19000, 25000, '냉방면적 17평(56.9㎡) / 2025년형 / 에너지 3등급');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (4, 'Carrier', 'All New 에어로 18단', 'RSCA180PAWWSD', 'ac_cra_01.jpg', 1139000, 14000, 17000, 23000, '냉방면적 18평(58.5㎡) / 2022년형 / 에너지 1등급');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (4, 'Samsung', '비스포크 무풍 클래식', 'AF70F19D11GS', 'ac_sam_02.jpg', 1680000, 20000, 25000, 33000, '냉방면적 19평(62.6㎡) / 2025년형 / 에너지 3등급');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (4, 'LG', '오브제컬렉션 훼센 위너', 'FQ17HDWHC1', 'ac_lg_01.jpg', 1492000, 18000, 22000, 30000, '냉방면적 17평(56.9㎡) / 2023년형 / 에너지 3등급');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (4, 'LG', '오브제컬렉션 휘센 듀얼 히트', 'FQ18HDDHA1', 'ac_lg_02.jpg', 2529000, 30000, 37000, 50000, '냉방면적:18평(58.5㎡) / 2023년형 / 에너지3등급');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (4, 'LG', 'LG전자 휘센', 'SQ06EZ1WBS', 'ac_lg_03.jpg', 410000, 5000, 6000, 8000, '벽걸이에어컨 / 냉방면적 6평(18.7㎡) / 2024년형 / 에너지 5등급');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (4, 'Samsung', '무풍에어컨 콤보', 'AR60F07D11WS', 'ac_sam_03.jpg', 745000, 9000, 11000, 15000, '벽걸이에어컨 / 냉방면적 6평(18.7㎡) / 2024년형 / 에너지 5등급');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (4, 'Carrier', 'DARB', 'DARB0061GAWSD', 'ac_cra_02.jpg', 579000, 7000, 9000, 12000, '벽걸이에어컨 / 냉방면적 6평(18.7㎡) / 에너지 1등급');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (4, 'LG', '휘센', 'SQ07FS8EES', 'ac_lg_03.jpg', 1144000, 14000, 17000, 23000, '벽걸이에어컨 / 냉방면적 7평(22.8㎡) / 2025년형 / 에너지 1등급');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (4, 'Samsung', '와이드', 'AR10T5170HZS', 'ac_sam_04.jpg', 564000, 7000, 9000, 11000, '벽걸이에어컨 / 냉방면적 10평(32.5㎡) / 2020년형 / 에너지 3등급');

-- [공기청정기]
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (5, 'LG', '오브제컬렉션 퓨리케어 에어로퍼니처(원형)', 'AS062PWHAR', 'air_lg_01.jpg', 550000, 12900, 14900, 19900, '5.98평(19.8㎡) / 크기(가로x세로x깊이) 275x550x275mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (5, 'LG', '오브제컬렉션 퓨리케어 360˚ 알파UP 펫', 'AS353NG4A', 'air_lg_02.jpg', 1600000, 35900, 41900, 55900, '34평(114㎡) / 크기(가로x세로x깊이) 377x1100x377mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (5, 'Samsung', '비스포크 큐브 Air 인피니트 라인', 'AX100DB990UDD', 'air_sam_01.jpg', 1400000, 31900, 36900, 49900, '30.2평(100㎡) / 크기(가로x세로x깊이) 320x1070x320mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (5, 'Samsung', '비스포크 큐브 Air 펫케어', 'AX106B850SGD', 'air_sam_02.jpg', 1239000, 15000, 19000, 25000, '32평(106㎡) / 크기(가로x세로x깊이) 380x876x406mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (5, 'Dyson', '쿨 공기청정기', 'TP07', 'air_dy_01.jpg', 494000, 6000, 8000, 10000, '30.2평(100㎡) / 크기(가로x세로x깊이) 220x1050x220mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (5, 'Dyson', '빅+콰이엇 포름알데히드', 'BP03', 'air_dy_02.jpg', 789000, 10000, 12000, 16000, '30.25평(100㎡) / 크기(가로x세로x깊이) 434x830x434mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (5, 'Balmuda', '더 퓨어', 'A01B-WH', 'air_bal_01.jpg', 489000, 6000, 8000, 10000, '18평(60㎡) / 크기(가로x세로x깊이) 260x700x260mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (5, 'Winix', '타워 프라임', 'APRM833-JWK', 'air_winix_01.jpg', 287000, 4000, 5000, 6000, '25.9평(85.8㎡) / 크기(가로x세로x깊이) 390x750x390mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (5, 'Winix', '제로', 'AZSE430-JWK', 'air_winix_02.jpg', 250000, 5500, 6900, 8900, '13평(43㎡) / 크기(가로x세로x깊이) 384x594x220mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (5, 'Samsung', '블루스카이', 'AX60A5510WDD', 'air_sam_03.jpg', 500000, 6000, 8000, 10000, '18평(60㎡) / 크기(가로x세로x깊이) 360x783x293mm');


-- [구매 상품]
-- [TV]
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (6, 'LG', '스탠바이미', '27ART10AKPL', 'tv_lg_01.jpg', 1150000, 24900, 29900, 39900, 'LED TV / 27인치(68cm) / FHD / 2021년형');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (6, 'LG', '스탠바이미 Go', '27LX5QKNA', 'tv_lg_02.jpg', 1190000, 26900, 31900, 41900, 'LED TV / 27인치(68cm) / FHD / 2023년형');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (6, 'Samsung', '더 세리프 (55)', 'KQ55LST01BFXKR', 'tv_sam_01.jpg', 1750000, 38900, 45900, 59900, 'QLED TV / 55인치(138cm) / 4K UHD / 2020년형');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (6, 'Samsung', '더 프레임 (65)', 'KQ65LST03AFXKR', 'tv_sam_02.jpg', 2100000, 46900, 54900, 72900, 'QLED TV / 65인치(159cm) / 4K UHD / 2020년형');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (6, 'Samsung', '더 세로 (43)', 'KQ43LST05BFXKR', 'tv_sam_03.jpg', 1450000, 32900, 38900, 49900, 'QLED TV / 43인치(108cm) / 4K UHD / 2020년형');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (6, 'LG', '올레드 포제 (55)', '55LX1QKNA', 'tv_lg_03.jpg', 2690000, 59900, 69900, 92900, 'OLED TV / 55인치(138cm) / 4K UHD / 2022년형');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (6, 'LG', '올레드 Evo (65)', 'OLED65C3SNA', 'tv_lg_04.jpg', 3400000, 75900, 89900, 119000, 'OLED TV / 65인치(163cm) / 4K UHD / 2023년형');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (6, 'Samsung', 'Neo QLED 8K (85)', 'KQ85QNC900FXKR', 'tv_sam_04.jpg', 7500000, 159000, 189000, 259000, '미니LED TV / 85인치(214cm) / 8K UHD / 2023년형');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (6, 'Samsung', '더 프레임 (75)', 'KQ75LSD03AFXKR', 'tv_sam_05.jpg', 990000, 21900, 25900, 34900, 'QLED TV / 75인치(189cm) / 4K UHD / 2024년형');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (6, 'LG', 'QNED (75)', '75QNED65ABA', 'tv_lg_05.jpg', 1670000, 19483, 24354, 32472, 'QNED TV / 75인치(189cm) / 4K UHD / 2025년형');

-- [냉장고]
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (7, 'Samsung', '비스포크 4도어(키친핏)', 'RF85C9001AP', 'ref_sam_01.jpg', 3200000, 69900, 79900, 109000, '총용량 875L / 크기(가로x세로x깊이) 912x1853x930mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (7, 'LG', '오브제 무드업', 'M870GBB451', 'ref_lg_01.jpg', 4500000, 99000, 115000, 155000, '총용량 870L / 크기(가로x세로x깊이) 914x1860x918mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (7, 'LG', '오브제컬렉션 STEM', 'W825MHH182S', 'ref_lg_02.jpg', 4200000, 92900, 109000, 145000, '총용량 817L / 크기(가로x세로x깊이) 914x1860x918mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (7, 'LG', '디오스 양문형', 'S834SS32', 'ref_lg_03.jpg', 1800000, 38900, 47900, 62900, '총용량 832L / 크기(가로x세로x깊이) 913x1790x913mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (7, 'Samsung', '양문형 냉장고', 'RS84T5081SA', 'ref_sam_02.jpg', 1750000, 37900, 45900, 59900, '총용량 846L / 크기(가로x세로x깊이) 912x1780x915mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (7, 'Samsung', '비스포크 글램', 'RF85C9111AP', 'ref_sam_03.jpg', 2900000, 64900, 75900, 99000, '총용량 875L / 크기(가로x세로x깊이) 912x1853x930mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (7, 'LG', '오브제 컬렉션', 'T873MEE111', 'ref_lg_04.jpg', 3100000, 67900, 79900, 105000, '총용량 870L / 크기(가로x세로x깊이) 914x1787x918mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (7, 'Samsung', '비스포크 인피니트 라인 키친핏 럭스', 'RR40B9981APG', 'ref_sam_04.jpg', 1700000, 37900, 44900, 59900, '총용량 386L / 크기(가로x세로x깊이) 595x1855x688mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (7, 'LG', '오브제컬렉션 노크온', 'J848ND79', 'ref_lg_05.jpg', 8500000, 189000, 219000, 295000, '총용량 840L / 크기(가로x세로x깊이) 912x1784x929mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (7, 'Samsung', '셰프컬렉션', 'RF10T9995APG', 'ref_sam_05.jpg', 12000000, 259000, 309000, 419000, '총용량 840L / 크기(가로x세로x깊이) 912x1784x929mm');


INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (8, 'LG', '트롬 오브제컬렉션 워시타워', 'WL21WDU', 'wash_lg_01.jpg', 2721880, 32000, 40000, 53000, '세탁 25kg/건조 21kg / 직렬 ±700x1890x830mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (8, 'LG', '트롬 AI 오브제컬렉션 워시타워', 'WA2525GEHF', 'wash_lg_02.jpg', 4071600, 48000, 60000, 80000, '세탁 25kg/건조 25kg / 직렬 ±700x1890x830mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (8, 'LG', '트롬 워시타워', 'W20WD', 'wash_lg_03.jpg', 2319120, 28000, 34000, 46000, '세탁 24kg/건조 20kg / 직렬 ±700x1890x830mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (8, 'LG', '트롬 워시타워 컴팩트', 'W10BN', 'wash_lg_04.jpg', 1960000, 23000, 29000, 39000, '세탁 13kg/건조 10kg / 직렬 ±600x1655x660mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (8, 'LG', '트롬 AI 오브제컬렉션 워시타워', 'WA2525YMHF', 'wash_lg_05.jpg', 4071600, 48000, 60000, 80000, '세탁 25kg/건조 25kg / 직렬 ±700x1890x830mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (8, 'Samsung', '비스포크 그랑데 AI 원바디 Top-fit', 'WF2522HDEEE', 'wash_sam_01.jpg', 2349000, 28000, 35000, 46000, '세탁 25kg/건조 20kg / 직렬 ±686x1890x875mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (8, 'Samsung', '비스포크 그랑데 AI 원바디 Top-fit', 'WH90F2520GBHW', 'wash_sam_02.jpg', 2128000, 25000, 32000, 42000, '세탁 25kg/건조 20kg / 직렬 ±686x1890x875mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (8, 'Samsung', '비스포크 그랑데 AI 원바디 Top-fit', 'WF2420HCWWC', 'wash_sam_03.jpg', 1958000, 23000, 29000, 39000, '세탁 24kg/건조 20kg / 직렬 ±686x1890x872mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (8, 'Samsung', '비스포크 그랑데 AI 원바디 Top-fit', 'WF2420HCVVC', 'wash_sam_04.jpg', 1958000, 23000, 29000, 39000, '세탁 24kg/건조 20kg / 직렬 ±686x1890x872mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (8, 'Samsung', '비스포크 그랑데 AI 원바디 Top-fit', 'WH90F2120GBHT', 'wash_sam_05.jpg', 2319000, 28000, 34000, 46000, '세탁 21kg/건조 20kg / 직렬 ±686x1890x875mm');

INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (9, 'Samsung', 'Q9000', 'AF60F17D11GS', 'ac_sam_01.jpg', 1273000, 15000, 19000, 25000, '냉방면적 17평(56.9㎡) / 2025년형 / 에너지 3등급');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (9, 'Carrier', 'All New 에어로 18단', 'RSCA180PAWWSD', 'ac_cra_01.jpg', 1139000, 14000, 17000, 23000, '냉방면적 18평(58.5㎡) / 2022년형 / 에너지 1등급');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (9, 'Samsung', '비스포크 무풍 클래식', 'AF70F19D11GS', 'ac_sam_02.jpg', 1680000, 20000, 25000, 33000, '냉방면적 19평(62.6㎡) / 2025년형 / 에너지 3등급');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (9, 'LG', '오브제컬렉션 휘센 위너', 'FQ17HDWHC1', 'ac_lg_01.jpg', 1492000, 18000, 22000, 30000, '냉방면적 17평(56.9㎡) / 2023년형 / 에너지 3등급');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (9, 'LG', '오브제컬렉션 휘센 듀얼 히트', 'FQ18HDDHA1', 'ac_lg_02.jpg', 2529000, 30000, 37000, 50000, '냉방면적:18평(58.5㎡) / 2023년형 / 에너지3등급');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (9, 'LG', 'LG전자 휘센', 'SQ06EZ1WBS', 'ac_lg_03.jpg', 410000, 5000, 6000, 8000, '벽걸이에어컨 / 냉방면적 6평(18.7㎡) / 2024년형 / 에너지 5등급');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (9, 'Samsung', '무풍에어컨 콤보', 'AR60F07D11WS', 'ac_sam_03.jpg', 745000, 9000, 11000, 15000, '벽걸이에어컨 / 냉방면적 6평(18.7㎡) / 2024년형 / 에너지 5등급');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (9, 'Carrier', 'DARB', 'DARB0061GAWSD', 'ac_cra_02.jpg', 579000, 7000, 9000, 12000, '벽걸이에어컨 / 냉방면적 6평(18.7㎡) / 에너지 1등급');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (9, 'LG', '휘센', 'SQ07FS8EES', 'ac_lg_03.jpg', 1144000, 14000, 17000, 23000, '벽걸이에어컨 / 냉방면적 7평(22.8㎡) / 2025년형 / 에너지 1등급');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (9, 'Samsung', '와이드', 'AR10T5170HZS', 'ac_sam_04.jpg', 564000, 7000, 9000, 11000, '벽걸이에어컨 / 냉방면적 10평(32.5㎡) / 2020년형 / 에너지 3등급');

INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (10, 'LG', '오브제컬렉션 퓨리케어 에어로퍼니처(원형)', 'AS062PWHAR', 'air_lg_01.jpg', 550000, 12900, 14900, 19900, '5.98평(19.8㎡) / 크기(가로x세로x깊이) 275x550x275mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (10, 'LG', '오브제컬렉션 퓨리케어 360˚ 알파UP 펫', 'AS353NG4A', 'air_lg_02.jpg', 1600000, 35900, 41900, 55900, '34평(114㎡) / 크기(가로x세로x깊이) 377x1100x377mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (10, 'Samsung', '비스포크 큐브 Air 인피니트 라인', 'AX100DB990UDD', 'air_sam_01.jpg', 1400000, 31900, 36900, 49900, '30.2평(100㎡) / 크기(가로x세로x깊이) 320x1070x320mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (10, 'Samsung', '비스포크 큐브 Air 펫케어', 'AX106B850SGD', 'air_sam_02.jpg', 1239000, 15000, 19000, 25000, '32평(106㎡) / 크기(가로x세로x깊이) 380x876x406mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (10, 'Dyson', '쿨 공기청정기', 'TP07', 'air_dy_01.jpg', 494000, 6000, 8000, 10000, '30.2평(100㎡) / 크기(가로x세로x깊이) 220x1050x220mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (10, 'Dyson', '빅+콰이엇 포름알데히드', 'BP03', 'air_dy_02.jpg', 789000, 10000, 12000, 16000, '30.25평(100㎡) / 크기(가로x세로x깊이) 434x830x434mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (10, 'Balmuda', '더 퓨어', 'A01B-WH', 'air_bal_01.jpg', 489000, 6000, 8000, 10000, '18평(60㎡) / 크기(가로x세로x깊이) 260x700x260mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (10, 'Winix', '타워 프라임', 'APRM833-JWK', 'air_winix_01.jpg', 287000, 4000, 5000, 6000, '25.9평(85.8㎡) / 크기(가로x세로x깊이) 390x750x390mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (10, 'Winix', '제로', 'AZSE430-JWK', 'air_winix_02.jpg', 250000, 5500, 6900, 8900, '13평(43㎡) / 크기(가로x세로x깊이) 384x594x220mm');
INSERT INTO product (sub_category_num, brand, name, serial_num, img, price, price_60, price_48, price_36, spec) VALUES (10, 'Samsung', '블루스카이', 'AX60A5510WDD', 'air_sam_03.jpg', 500000, 6000, 8000, 10000, '18평(60㎡) / 크기(가로x세로x깊이) 360x783x293mm');

-- 6. [안전 모드]
SET SQL_SAFE_UPDATES = 1;

INSERT INTO member (member_num, next_pay, quit_date, reg_date, id, email, name, phone_num, pwd, sub_state, use_yn, status) VALUES (0, NULL, NULL, NULL, 'TestadminId', 'wjdehdrbs777@naver.com', '정동균', '010-9940-6408', '$2a$10$xBWL5bnFJ/5BCHQ0z60Uc.dDeNhr4Lx3OZULHJo0QPpM0O6oBh/T.', NULL, NULL, 'MEMBER');