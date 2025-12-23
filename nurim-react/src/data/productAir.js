// 1
export const productAir = [
  {
    category: "기본 정보",
    items: [
      { label: "제조회사", value: "LG전자" },
      { label: "등록년월", value: "2022년 12월" },
      { label: "청정면적", value: "6평(19.8㎡)", fullWidth: true }, // 약 6평형
      { label: "에너지효율", value: "3등급" },
      { label: "소비전력", value: "28W" },
    ],
  },
  {
    category: "공기청정 및 위생",
    items: [
      { label: "필터", value: "360도 V필터" }, // 360도 필터 명시
      { label: "UV살균", value: "O" },
      { label: "초미세먼지제거", value: "O", fullWidth: true },
      { label: "유해가스/탈취", value: "O", fullWidth: true },
      { label: "센서", value: "PM1.0(극초미세먼지)", fullWidth: true },
    ],
  },
  {
    category: "테이블 & 편의기능", // 이 제품만의 유니크한 특징
    items: [
      { label: "무선충전", value: "O", fullWidth: true }, // 테이블 위 스마트폰 충전
      { label: "무드조명", value: "O" },
      { label: "테이블탑크기", value: "410x410mm", fullWidth: true },
      { label: "풍량조절", value: "O" },
      { label: "청정도표시", value: "O" },
    ],
  },
  {
    category: "스마트 / 모드",
    items: [
      { label: "LG ThinQ", value: "O" },
      { label: "UP가전", value: "O" },
      { label: "자동/수면모드", value: "O", fullWidth: true },
      { label: "필터교체알림", value: "O" },
    ],
  },
  {
    category: "규격 및 인증",
    items: [
      { label: "크기(WxHxD)", value: "275x550x275mm", fullWidth: true }, // 본체 기준 사이즈
      { label: "무게", value: "7.1kg" },
      { label: "CA인증", value: "O" }, // 공기청정협회 인증
      { label: "적합성평가인증", value: "R-R-LGE-AS062PRHAR", fullWidth: true },
    ],
  },
];

// 2
export const lgPuriCare360Specs = [
  {
    category: "기본 정보",
    items: [
      { label: "제조회사", value: "LG전자" },
      { label: "등록년월", value: "2023년 01월" },
      { label: "청정면적", value: "34평(114㎡)", fullWidth: true }, // 넓은 커버리지 강조
      { label: "에너지효율", value: "2등급" },
      { label: "소비전력", value: "80W" },
    ],
  },
  {
    category: "강력 청정 및 위생",
    items: [
      { label: "360도 필터", value: "O" },
      { label: "클린부스터", value: "O", fullWidth: true }, // 멀리까지 청정 바람을 보내주는 기능
      { label: "UV살균", value: "O" },
      { label: "초미세먼지제거", value: "O" },
      { label: "유해가스/탈취", value: "O", fullWidth: true },
      { label: "새집증후군제거", value: "O" },
    ],
  },
  {
    category: "특화 모드 & 센서",
    items: [
      { label: "펫모드", value: "O", fullWidth: true }, // 반려동물 털/냄새 제거 특화
      { label: "베이비케어", value: "O" }, // 아이 눈높이에 맞춘 청정
      { label: "오토모드", value: "O" },
      { label: "PM1.0센서", value: "극초미세먼지 감지", fullWidth: true },
      { label: "가스(냄새)센서", value: "O" },
    ],
  },
  {
    category: "스마트 / 편의",
    items: [
      { label: "LG ThinQ", value: "O" },
      { label: "UP가전", value: "O" },
      { label: "음성안내", value: "O" },
      { label: "필터교체알림", value: "O" },
      { label: "리모컨", value: "O" },
      { label: "청정도표시", value: "4단계 라이팅", fullWidth: true },
    ],
  },
  {
    category: "규격 및 인증",
    items: [
      { label: "크기(WxHxD)", value: "377x1100x377mm", fullWidth: true }, // 높이 1.1m의 대형 사이즈
      { label: "무게", value: "19.9kg", fullWidth: true },
      { label: "CA인증", value: "O" },
      { label: "BAF인증", value: "O" }, // 영국 알레르기 협회 인증
      { label: "적합성평가인증", value: "R-R-LGE-AS353NGDA", fullWidth: true },
    ],
  },
];

// 3
export const samsungCubeAir30Specs = [
  {
    category: "기본 정보",
    items: [
      { label: "제조회사", value: "삼성전자" },
      { label: "등록년월", value: "2024년 04월" },
      { label: "청정면적", value: "30.2평(100㎡)", fullWidth: true }, // 넓은 거실/오피스용
      { label: "소비전력", value: "70W" },
      { label: "소음", value: "18dB", fullWidth: true }, // 도서관보다 조용한 무풍 청정
    ],
  },
  {
    category: "프리미엄 청정 & 필터",
    items: [
      { label: "필터특징", value: "워셔블 살균 집진 필터", fullWidth: true }, // 핵심: 씻어쓰는 필터 (유지비 절약)
      { label: "필터관리", value: "집진부 물세척 가능", fullWidth: true },
      { label: "UV살균", value: "O" },
      { label: "광분해탈취", value: "O" }, // 필터 교체 없이 빛으로 냄새 제거
      { label: "초미세먼지제거", value: "O" },
      { label: "유해가스제거", value: "O" },
    ],
  },
  {
    category: "첨단 센서 & AI",
    items: [
      {
        label: "CO2(이산화탄소)",
        value: "농도 측정/환기 알림",
        fullWidth: true,
      }, // 이 제품만의 킬러 기능
      { label: "PM1.0센서", value: "극초미세먼지 감지" },
      { label: "가스/냄새", value: "O" },
      { label: "조도/온습도", value: "O" },
      { label: "AI+인증", value: "O", fullWidth: true }, // 한국표준협회 AI 인증
    ],
  },
  {
    category: "스마트 / 편의",
    items: [
      { label: "삼성 SmartThings", value: "O", fullWidth: true },
      { label: "음성안내", value: "O" },
      { label: "필터점검알림", value: "O" },
      { label: "이동식바퀴", value: "O" },
      { label: "미세먼지농도표시", value: "O" },
    ],
  },
  {
    category: "규격 및 인증",
    items: [
      { label: "크기(WxHxD)", value: "320x1070x320mm", fullWidth: true },
      { label: "무게", value: "25.2kg" },
      { label: "CA인증", value: "O" },
      { label: "PA인증", value: "O" }, // 펫 인증까지 획득
      { label: "적합성평가인증", value: "R-R-SEC-AIR2301", fullWidth: true },
    ],
  },
];

// 4
export const samsungCubeAir32Specs = [
  {
    category: "기본 정보",
    items: [
      { label: "제조회사", value: "삼성전자" },
      { label: "등록년월", value: "2021년 12월" },
      { label: "청정면적", value: "32평(106㎡)", fullWidth: true }, // 30평대 넓은 커버리지
      { label: "소비전력", value: "80W" },
      { label: "소음", value: "20dB", fullWidth: true }, // 매우 조용함
    ],
  },
  {
    category: "청정 및 위생",
    items: [
      { label: "3WAY스마트토출", value: "O", fullWidth: true }, // 입체적인 바람 토출
      { label: "AI맞춤청정", value: "O", fullWidth: true },
      { label: "UV살균", value: "O" },
      { label: "초미세먼지제거", value: "O" },
      { label: "유해가스제거", value: "O" },
      { label: "새집증후군제거", value: "O" },
      { label: "탈취", value: "O" },
    ],
  },
  {
    category: "센서 및 모드",
    items: [
      { label: "펫모드", value: "O", fullWidth: true }, // 반려동물 특화 기능
      { label: "PM1.0센서", value: "극초미세먼지 감지", fullWidth: true },
      { label: "가스(냄새)", value: "O" },
      { label: "조도", value: "O" },
      { label: "자동/수면", value: "O" },
    ],
  },
  {
    category: "스마트 / 편의",
    items: [
      { label: "삼성 SmartThings", value: "O", fullWidth: true },
      { label: "필터교체알림", value: "O" },
      { label: "미세먼지농도표시", value: "O" },
      { label: "청정도표시", value: "O" },
      { label: "버튼잠금", value: "O" },
    ],
  },
  {
    category: "규격 및 인증",
    items: [
      { label: "크기(WxHxD)", value: "380x876x406mm", fullWidth: true },
      { label: "적합성평가인증", value: "R-R-SEC-AIR2202", fullWidth: true },
    ],
  },
];

// 5
export const dysonPurifierSpecs = [
  {
    category: "기본 정보",
    items: [
      { label: "제조회사", value: "다이슨" },
      { label: "등록년월", value: "2021년 12월" },
      { label: "제품유형", value: "타워형 공기청정기" }, // 1050mm 높이 반영
      { label: "소음", value: "61.5dB" },
    ],
  },
  {
    category: "청정 및 필터",
    items: [
      { label: "360도 필터", value: "O" },
      { label: "초미세먼지제거", value: "O" },
      { label: "유해가스제거", value: "O" },
      { label: "새집증후군제거", value: "O" },
      { label: "알러지원인제거", value: "O", fullWidth: true },
    ],
  },
  {
    category: "모드 및 센서",
    items: [
      { label: "디퓨즈모드", value: "O", fullWidth: true }, // 다이슨만의 바람 제어 기술
      { label: "자동모드", value: "O" },
      { label: "수면모드", value: "O" },
      { label: "가스(냄새)센서", value: "O" },
    ],
  },
  {
    category: "스마트 / 편의",
    items: [
      { label: "스마트폰제어", value: "O" },
      { label: "음성인식", value: "O" },
      { label: "리모컨", value: "O" }, // 자석으로 본체 부착 가능
      { label: "청정도표시", value: "O" },
      { label: "풍량조절", value: "O" },
    ],
  },
  {
    category: "규격",
    items: [
      { label: "크기(WxHxD)", value: "220x1050x220mm", fullWidth: true }, // 슬림하고 높은 디자인
      { label: "인증", value: "상세설명 참조", fullWidth: true },
    ],
  },
];

// 6
export const dysonBigQuietSpecs = [
  {
    category: "기본 정보",
    items: [
      { label: "제조회사", value: "다이슨" },
      { label: "등록년월", value: "2023년 06월" },
      { label: "청정면적", value: "30.25평(100㎡)", fullWidth: true }, // 다이슨 중 가장 넓은 커버리지
      { label: "소음", value: "56dB(최대풍량)", fullWidth: true },
    ],
  },
  {
    category: "강력 청정 & 필터",
    items: [
      { label: "360도 필터", value: "O" },
      { label: "포름알데히드분해", value: "O", fullWidth: true }, // 핵심 기능: 영구 분해
      { label: "이산화질소(NO2)제거", value: "O", fullWidth: true }, // 자동차 배기가스 성분 제거
      { label: "초미세먼지제거", value: "O" },
      { label: "새집증후군제거", value: "O" },
      { label: "유해가스/탈취", value: "O" },
      { label: "알러지물질제거", value: "O" },
    ],
  },
  {
    category: "첨단 센서 & 조절",
    items: [
      { label: "센서", value: "포름알데히드센서", fullWidth: true }, // 전용 센서 탑재
      { label: "공기흐름조절", value: "0°, 25°, 50° 조절", fullWidth: true }, // 바람 각도 조절 기능
      { label: "공기질그래프", value: "O" },
      { label: "자동감지", value: "O" },
      { label: "KAF천식협회인증", value: "O", fullWidth: true },
    ],
  },
  {
    category: "스마트 / 편의",
    items: [
      { label: "스마트폰제어", value: "O" },
      { label: "음성인식", value: "O" },
      { label: "리모컨", value: "O" },
      { label: "이동식바퀴", value: "O" }, // 무거운 무게를 보완
      { label: "타이머", value: "O" },
      { label: "자동/수면모드", value: "O" },
    ],
  },
  {
    category: "규격",
    items: [
      { label: "크기(WxHxD)", value: "434x830x434mm", fullWidth: true }, // 큼직한 본체 사이즈
      { label: "무게", value: "11.9kg" },
      { label: "인증", value: "상세설명 참조", fullWidth: true },
    ],
  },
];

// 7
export const balmudaThePureSpecs = [
  {
    category: "기본 정보",
    items: [
      { label: "제조회사", value: "발뮤다" },
      { label: "등록년월", value: "2019년 02월" },
      { label: "청정면적", value: "18평(60㎡)", fullWidth: true }, // 거실용으로 적합
      { label: "에너지효율", value: "3등급" },
      { label: "소비전력", value: "72W" },
    ],
  },
  {
    category: "청정 및 모드",
    items: [
      { label: "제트클린모드", value: "O", fullWidth: true }, // 발뮤다의 시그니처 강력 청정 모드
      { label: "초미세먼지제거", value: "O" },
      { label: "새집증후군제거", value: "O" },
      { label: "유해가스제거", value: "O" },
      { label: "탈취", value: "O" },
      { label: "자동/터보모드", value: "O" }, // 터보 모드 지원
    ],
  },
  {
    category: "디자인 & 편의",
    items: [
      { label: "무드업(LED)", value: "빛의 기둥", fullWidth: true }, // 작동 시 하단 조명 기능 (감성 포인트)
      { label: "이동손잡이", value: "O" },
      { label: "풍량조절", value: "O" },
      { label: "소음", value: "19~64dB", fullWidth: true }, // 최저 소음 19dB로 매우 조용함
    ],
  },
  {
    category: "규격",
    items: [
      { label: "크기(WxHxD)", value: "260x700x260mm", fullWidth: true }, // A4 용지 한 장 면적의 슬림한 타워형
      { label: "무게", value: "7.4kg" },
      { label: "인증", value: "상세설명 참조", fullWidth: true },
    ],
  },
];

// 8
export const winixTowerPrimeSpecs = [
  {
    category: "기본 정보",
    items: [
      { label: "제조회사", value: "위닉스" },
      { label: "등록년월", value: "2019년 11월" },
      { label: "청정면적", value: "25.9평(85.8㎡)", fullWidth: true }, // 넓은 거실/사무실용
      { label: "에너지효율", value: "1등급", fullWidth: true }, // 유지비 절약 강점
      { label: "소비전력", value: "47W" },
    ],
  },
  {
    category: "강력 청정 & 모드",
    items: [
      { label: "슈퍼청정모드", value: "O", fullWidth: true }, // 위닉스만의 강력 모드
      { label: "360도 필터", value: "O" },
      { label: "초미세먼지제거", value: "O" },
      { label: "유해가스/탈취", value: "O" },
      { label: "새집증후군제거", value: "O" },
      { label: "터보모드", value: "O" },
    ],
  },
  {
    category: "센서 & 인증",
    items: [
      { label: "PM2.5센서", value: "초미세먼지 감지" },
      { label: "가스(냄새)", value: "O" },
      { label: "조도센서", value: "O" },
      { label: "CA인증", value: "O" },
      { label: "KAA아토피인증", value: "O", fullWidth: true }, // 피부 예민한 고객에게 어필
    ],
  },
  {
    category: "스마트 / 편의",
    items: [
      { label: "스마트폰제어", value: "O", fullWidth: true },
      { label: "이동식바퀴", value: "O", fullWidth: true }, // 무거운 본체 이동 편리
      { label: "미세먼지농도표시", value: "O" },
      { label: "청정도표시", value: "O" },
      { label: "필터교체알림", value: "O" },
    ],
  },
  {
    category: "규격",
    items: [
      { label: "크기(WxHxD)", value: "390x750x390mm", fullWidth: true },
      { label: "무게", value: "8.5kg" },
      { label: "적합성평가인증", value: "R-R-6WW-APRM833", fullWidth: true },
    ],
  },
];

// 9
export const winixAirPurifier13Specs = [
  {
    category: "기본 정보",
    items: [
      { label: "제조회사", value: "위닉스" },
      { label: "등록년월", value: "2019년 10월" },
      { label: "청정면적", value: "13평(43㎡)", fullWidth: true }, // 방/원룸용 추천
      { label: "에너지효율", value: "2등급" },
      { label: "소비전력", value: "34W" },
    ],
  },
  {
    category: "청정 및 센서",
    items: [
      { label: "초미세먼지제거", value: "O" },
      { label: "탈취", value: "O" },
      { label: "유해가스제거", value: "O" },
      { label: "새집증후군제거", value: "O" },
      { label: "센서", value: "PM10(미세먼지)", fullWidth: true }, // 미세먼지 센서 탑재
      { label: "조도센서", value: "O" }, // 밤에는 알아서 어두워지는 기능
    ],
  },
  {
    category: "모드 및 편의",
    items: [
      { label: "자동모드", value: "O" },
      { label: "수면모드", value: "O" },
      { label: "필터교체알림", value: "O", fullWidth: true },
      { label: "버튼잠금", value: "O" }, // 아이/반려동물 오작동 방지
      { label: "풍량조절", value: "O" },
      { label: "청정도표시", value: "O" },
    ],
  },
  {
    category: "규격 및 인증",
    items: [
      { label: "크기(WxHxD)", value: "384x594x220mm", fullWidth: true }, // 슬림한 디자인
      { label: "무게", value: "7.9kg" },
      { label: "소음", value: "49.1dB", fullWidth: true }, // 터보 기준 소음
      { label: "CA인증", value: "O" }, // 공기청정협회 인증 마크 획득
      { label: "인증", value: "상세설명 참조", fullWidth: true },
    ],
  },
];

// 10
export const samsungAirPurifier18Specs = [
  {
    category: "기본 정보",
    items: [
      { label: "제조회사", value: "삼성전자" },
      { label: "등록년월", value: "2021년 01월" },
      { label: "청정면적", value: "18평(60㎡)", fullWidth: true }, // 거실용 추천
      { label: "에너지효율", value: "3등급" },
      { label: "소비전력", value: "60W" },
    ],
  },
  {
    category: "청정 및 센서",
    items: [
      { label: "초미세먼지제거", value: "O" },
      { label: "탈취/유해가스", value: "O", fullWidth: true },
      { label: "새집증후군제거", value: "O" },
      { label: "센서", value: "PM1.0(극초미세먼지)", fullWidth: true }, // 정밀 센서 탑재
      { label: "가스(냄새)센서", value: "O" },
    ],
  },
  {
    category: "스마트 / 모드",
    items: [
      { label: "삼성 SmartThings", value: "O", fullWidth: true }, // 스마트폰 제어
      { label: "자동모드", value: "O" },
      { label: "수면모드", value: "O" },
      { label: "필터점검알림", value: "O" },
    ],
  },
  {
    category: "편의기능",
    items: [
      { label: "이동식바퀴", value: "O", fullWidth: true }, // 무거운 본체 이동 편리
      { label: "미세먼지농도표시", value: "O" },
      { label: "청정도표시", value: "O" },
      { label: "필터수명표시", value: "O" }, // 교체 시기 확인 용이
      { label: "타이머", value: "O" },
      { label: "버튼잠금", value: "O" },
    ],
  },
  {
    category: "규격 및 인증",
    items: [
      { label: "크기(WxHxD)", value: "360x783x293mm", fullWidth: true },
      { label: "CA인증", value: "O" },
      {
        label: "적합성평가인증",
        value: "MSIP-REI-SEC-AIR1601",
        fullWidth: true,
      },
    ],
  },
];
