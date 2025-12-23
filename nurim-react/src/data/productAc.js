// 1
export const productAc = [
  {
    category: "기본 정보",
    items: [
      { label: "제조회사", value: "삼성전자" },
      { label: "등록년월", value: "2025년 03월" },
      { label: "제품유형", value: "스탠드 에어컨" }, // 이미지상 스탠드 제조국 표기로 유추
      { label: "냉방면적", value: "17평(56.9㎡)", fullWidth: true },
      { label: "년형", value: "2025년형" },
      { label: "제조국", value: "한국" },
    ],
  },
  {
    category: "냉방 및 에너지",
    items: [
      { label: "냉방능력", value: "7.0kW" },
      { label: "소비전력", value: "2.05kW" },
      { label: "에너지등급", value: "3등급" },
      { label: "인버터", value: "O" }, // 절전기능 항목 반영
      { label: "월 예상전기료", value: "123,810원", fullWidth: true }, // 소비자 관심 항목
    ],
  },
  {
    category: "AI 스마트",
    items: [
      { label: "AI운전", value: "환경/패턴 감지", fullWidth: true },
      { label: "AI건조", value: "O" },
      { label: "스마트폰제어", value: "O" },
      { label: "기능업데이트", value: "O" },
    ],
  },
  {
    category: "위생 및 편의",
    items: [
      { label: "열교환기세척", value: "O", fullWidth: true }, // 위생 관련 중요 기능
      { label: "필터청소알림", value: "O" },
      { label: "자가진단", value: "O" },
    ],
  },
  {
    category: "인증",
    items: [
      { label: "적합성평가인증", value: "R-R-SEC-FAC2206", fullWidth: true },
      { label: "안전확인인증", value: "JE07007-21051", fullWidth: true },
    ],
  },
];

// 2
export const carrierAirCon18Specs = [
  {
    category: "기본 정보",
    items: [
      { label: "제조회사", value: "캐리어" },
      { label: "등록년월", value: "2022년 01월" },
      { label: "냉방면적", value: "18평(58.5㎡)", fullWidth: true },
      { label: "년형", value: "2022년형" },
    ],
  },
  {
    category: "냉방 및 에너지",
    items: [
      { label: "냉방능력", value: "7.2kW" },
      { label: "소비전력", value: "1.75kW" },
      { label: "에너지등급", value: "1등급" }, // 1등급 강조
      { label: "인버터", value: "O" },
      { label: "월 예상전기료", value: "98,060원", fullWidth: true }, // 가성비 포인트
    ],
  },
  {
    category: "AI 및 편의기능",
    items: [
      { label: "AI운전", value: "환경 감지", fullWidth: true },
      { label: "스마트폰제어", value: "O" },
      { label: "자동건조", value: "O" },
    ],
  },
  {
    category: "인증",
    items: [
      {
        label: "적합성평가인증",
        value: "R-R-Atc-ESCA181PSWWSD",
        fullWidth: true,
      },
      { label: "안전확인인증", value: "SU07428-22004B", fullWidth: true },
    ],
  },
];

// 3
export const samsungAirCon19Specs = [
  {
    category: "기본 정보",
    items: [
      { label: "제조회사", value: "삼성전자" },
      { label: "등록년월", value: "2025년 03월" },
      { label: "냉방면적", value: "19평(62.6㎡)", fullWidth: true }, // 17평형보다 넓은 커버리지
      { label: "년형", value: "2025년형" },
      { label: "제조국", value: "한국" },
    ],
  },
  {
    category: "냉방 및 에너지",
    items: [
      { label: "냉방능력", value: "7.7kW" },
      { label: "소비전력", value: "2.1kW" },
      { label: "에너지등급", value: "3등급" },
      { label: "인버터", value: "O" },
      { label: "월 예상전기료", value: "128,170원", fullWidth: true },
    ],
  },
  {
    category: "AI 및 무풍",
    items: [
      { label: "간접냉방(무풍)", value: "O", fullWidth: true }, // 이 모델의 핵심 기능!
      { label: "AI운전", value: "환경/패턴 감지", fullWidth: true },
      { label: "AI건조", value: "O" },
      { label: "스마트폰제어", value: "O" },
    ],
  },
  {
    category: "위생 및 편의",
    items: [
      { label: "열교환기세척", value: "O", fullWidth: true },
      { label: "필터청소알림", value: "O" },
      { label: "자가진단", value: "O" },
      { label: "기능업데이트", value: "O" },
    ],
  },
  {
    category: "인증",
    items: [
      { label: "적합성평가인증", value: "R-R-SEC-FAC2201", fullWidth: true },
      { label: "안전확인인증", value: "JE07007-21045", fullWidth: true },
    ],
  },
];

// 4
export const lgWhisen17Specs = [
  {
    category: "기본 정보",
    items: [
      { label: "제조회사", value: "LG전자 오브제컬렉션 휘센", fullWidth: true }, // 브랜드명 강조
      { label: "등록년월", value: "2023년 03월" },
      { label: "냉방면적", value: "17평(56.9㎡)", fullWidth: true },
      { label: "년형", value: "2023년형" },
    ],
  },
  {
    category: "냉방 및 에너지",
    items: [
      { label: "냉방능력", value: "7.0kW" },
      { label: "소비전력", value: "2.08kW" },
      { label: "에너지등급", value: "3등급" },
      { label: "절전기능", value: "듀얼인버터", fullWidth: true }, // LG만의 듀얼인버터 기술 명시
      { label: "월 예상전기료", value: "126,920원", fullWidth: true },
    ],
  },
  {
    category: "AI 스마트",
    items: [
      { label: "AI운전", value: "환경/패턴 감지", fullWidth: true },
      { label: "AI건조", value: "O" },
      { label: "스마트폰제어", value: "O" },
      { label: "기능업데이트", value: "O" }, // UP가전 기능
    ],
  },
  {
    category: "위생 및 편의",
    items: [
      { label: "열교환기세척", value: "O", fullWidth: true },
      { label: "자기진단", value: "O" },
    ],
  },
  {
    category: "인증",
    items: [
      { label: "적합성평가인증", value: "R-R-LGE-FQ211203", fullWidth: true },
      { label: "안전확인인증", value: "HM07125-22170", fullWidth: true },
    ],
  },
];

// 5
export const lgWhisen18Specs = [
  {
    category: "기본 정보",
    items: [
      { label: "제조회사", value: "LG전자" },
      { label: "등록년월", value: "2023년 05월" },
      { label: "냉방면적", value: "18평(58.5㎡)", fullWidth: true }, // 17평형 대비 넓은 면적
      { label: "년형", value: "2023년형" },
    ],
  },
  {
    category: "냉방 및 에너지",
    items: [
      { label: "냉방능력", value: "7.2kW" },
      { label: "소비전력", value: "2.2kW" },
      { label: "에너지등급", value: "3등급" },
      { label: "절전기능", value: "듀얼인버터", fullWidth: true }, // 효율 높은 듀얼인버터 강조
      { label: "월 예상전기료", value: "137,510원", fullWidth: true },
    ],
  },
  {
    category: "AI 스마트",
    items: [
      { label: "AI운전", value: "환경/패턴 감지", fullWidth: true },
      { label: "AI건조", value: "O" },
      { label: "스마트폰제어", value: "O" },
      { label: "기능업데이트", value: "O" }, // UP가전 지원
    ],
  },
  {
    category: "편의기능",
    items: [
      { label: "간접냉방", value: "O", fullWidth: true }, // 바람이 직접 닿지 않는 쾌적 냉방
      { label: "열교환기세척", value: "O", fullWidth: true },
      { label: "자기진단", value: "O" },
    ],
  },
  {
    category: "인증",
    items: [
      { label: "적합성평가인증", value: "R-R-LGE-FQ230101", fullWidth: true },
      { label: "안전확인인증", value: "HM07125-22170", fullWidth: true },
    ],
  },
];

// 6
export const lgWallAirCon6Specs = [
  {
    category: "기본 정보",
    items: [
      { label: "제조회사", value: "LG전자" },
      { label: "등록년월", value: "2024년 03월" },
      { label: "제품유형", value: "벽걸이 에어컨" }, // 제조국 표기(벽걸이)를 보고 제품 유형 추가
      { label: "냉방면적", value: "6평(18.7㎡)", fullWidth: true },
      { label: "년형", value: "2024년형" },
      { label: "제조국", value: "중국" },
    ],
  },
  {
    category: "냉방 및 에너지",
    items: [
      { label: "냉방능력", value: "2.3kW" },
      { label: "소비전력", value: "0.78kW" },
      { label: "에너지등급", value: "5등급" },
      { label: "절전기능", value: "듀얼인버터", fullWidth: true }, // 등급을 보완하는 핵심 기술
    ],
  },
  {
    category: "편의기능",
    items: [
      { label: "자동건조", value: "O", fullWidth: true }, // 곰팡이 방지 필수 기능
    ],
  },
  {
    category: "인증",
    items: [
      { label: "적합성평가인증", value: "R-R-LGE-SQ06EZ1WBS", fullWidth: true },
      { label: "안전확인인증", value: "HU071995-23034A", fullWidth: true },
    ],
  },
];

// 7
export const samsungWallAirCon7Specs = [
  {
    category: "기본 정보",
    items: [
      { label: "제조회사", value: "삼성전자" },
      { label: "등록년월", value: "2025년 03월" },
      { label: "제품유형", value: "벽걸이 에어컨" }, // 제조국 표기(벽걸이) 참고
      { label: "냉방면적", value: "7평(23.1㎡)", fullWidth: true }, // 6평보다 넉넉한 7평
      { label: "년형", value: "2025년형" },
      { label: "제조국", value: "태국" },
    ],
  },
  {
    category: "냉방 및 에너지",
    items: [
      { label: "냉방능력", value: "3.0kW" },
      { label: "소비전력", value: "0.70kW" },
      { label: "에너지등급", value: "1등급", fullWidth: true }, // 전기세 절약 포인트
      { label: "인버터", value: "O" },
    ],
  },
  {
    category: "무풍 및 편의기능",
    items: [
      { label: "간접냉방(무풍)", value: "O", fullWidth: true }, // 벽걸이에서 보기 드문 고급 기능
      { label: "상하좌우바람", value: "O", fullWidth: true }, // 사각지대 없는 바람 제어
      { label: "자동건조", value: "O" },
      { label: "스마트폰제어", value: "O" },
    ],
  },
  {
    category: "AI / 위생",
    items: [
      { label: "AI운전", value: "환경/패턴 감지", fullWidth: true },
      { label: "열교환기세척", value: "O" },
      { label: "필터청소알림", value: "O" },
      { label: "자가진단", value: "O" },
      { label: "기능업데이트", value: "O" },
    ],
  },
  {
    category: "인증",
    items: [
      { label: "적합성평가인증", value: "R-R-SEC-RAC2504", fullWidth: true },
      { label: "안전확인인증", value: "JU07905-25002", fullWidth: true },
    ],
  },
];

// 8
export const carrierWallAirCon6Specs = [
  {
    category: "기본 정보",
    items: [
      { label: "제조회사", value: "캐리어" },
      { label: "등록년월", value: "2025년 07월" },
      { label: "제품유형", value: "벽걸이 에어컨" }, // 제조국 표기 기반
      { label: "냉방면적", value: "6평(18.7㎡)", fullWidth: true },
      { label: "제조국", value: "중국" },
    ],
  },
  {
    category: "냉방 및 에너지",
    items: [
      { label: "냉방능력", value: "2.3kW" },
      { label: "소비전력", value: "0.55kW" }, // 매우 낮은 소비전력
      { label: "에너지등급", value: "1등급", fullWidth: true }, // 핵심 세일즈 포인트
      { label: "인버터", value: "O" },
    ],
  },
  {
    category: "편의기능",
    items: [
      { label: "자동건조", value: "O", fullWidth: true },
      { label: "자기진단", value: "O" },
    ],
  },
  {
    category: "인증",
    items: [
      { label: "안전확인인증", value: "SU07428-22002", fullWidth: true },
      {
        label: "적합성평가인증",
        value: "상세설명 / 판매 사이트 문의",
        fullWidth: true,
      },
    ],
  },
];

// 9
export const lgWallAirCon7Specs = [
  {
    category: "기본 정보",
    items: [
      { label: "제조회사", value: "LG전자" },
      { label: "등록년월", value: "2025년 01월" },
      { label: "제품유형", value: "벽걸이 에어컨" },
      { label: "냉방면적", value: "7평(22.8㎡)", fullWidth: true }, // 6평보다 여유로운 7평
      { label: "년형", value: "2025년형" },
      { label: "제조국", value: "중국" },
    ],
  },
  {
    category: "냉방 및 에너지",
    items: [
      { label: "냉방능력", value: "2.8kW" },
      { label: "소비전력", value: "0.69kW" },
      { label: "에너지등급", value: "1등급", fullWidth: true }, // 유지비 절약 강점
      { label: "월 예상전기료", value: "26,050원", fullWidth: true }, // 매우 저렴함 강조
      { label: "절전기능", value: "듀얼인버터", fullWidth: true },
    ],
  },
  {
    category: "AI 스마트",
    items: [
      { label: "AI운전", value: "환경/패턴/공간", fullWidth: true },
      { label: "인체감지", value: "O", fullWidth: true }, // 사람이 있는 곳으로 바람을 보내주는 고급 기능
      { label: "스마트폰제어", value: "O" },
      { label: "AI건조", value: "O" },
    ],
  },
  {
    category: "쾌적 및 위생",
    items: [
      { label: "간접냉방(유풍)", value: "O", fullWidth: true }, // 바람이 직접 닿지 않게 조절
      { label: "상하좌우바람", value: "O" }, // 사각지대 없는 입체 냉방
      { label: "UV-LED 팬살균", value: "O", fullWidth: true }, // 위생 관리 끝판왕 기능
      { label: "열교환기세척", value: "O" },
    ],
  },
  {
    category: "인증",
    items: [
      { label: "적합성평가인증", value: "R-R-LGE-SQ24110001", fullWidth: true },
      { label: "안전확인인증", value: "HU072247-24029", fullWidth: true },
    ],
  },
];

// 10
export const samsungWallAirCon10Specs = [
  {
    category: "기본 정보",
    items: [
      { label: "제조회사", value: "삼성전자" },
      { label: "등록년월", value: "2020년 04월" },
      { label: "제품유형", value: "벽걸이 에어컨" },
      { label: "냉방면적", value: "10평(32.5㎡)", fullWidth: true }, // 6~7평형보다 넓은 커버리지
      { label: "년형", value: "2020년형" },
    ],
  },
  {
    category: "냉방 및 에너지",
    items: [
      { label: "냉방능력", value: "3.9kW" }, // 2kW대인 소형 모델보다 강력함
      { label: "소비전력", value: "1.28kW" },
      { label: "에너지등급", value: "3등급" },
      { label: "인버터", value: "O" },
    ],
  },
  {
    category: "편의기능",
    items: [
      { label: "자동건조", value: "O", fullWidth: true }, // 곰팡이 방지 필수 기능
      { label: "필터청소알림", value: "O" },
      { label: "자기진단", value: "O" },
    ],
  },
  {
    category: "인증",
    items: [
      { label: "적합성평가인증", value: "R-R-SEC-RAC2001", fullWidth: true },
      { label: "안전확인인증", value: "JU07905-19001", fullWidth: true },
    ],
  },
];
