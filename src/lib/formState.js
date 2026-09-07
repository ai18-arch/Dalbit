// 입력 폼의 초기값. 모든 칸은 비워 두어도 결과가 나온다.
export const emptyForm = {
  product: '',
  category: '',
  featuresRaw: '',
  benefit: '',
  target: '',
  price: '',
  priceBand: '',
  keywords: '',
  tone: 'emotional',
  duration: '30',
};

// "예시로 채워보기"를 누르면 들어가는 값.
export const sampleForm = {
  ...emptyForm,
  product: '원목 도마',
  category: '홈·주방',
  featuresRaw: '국내 제작, 식기세척기 사용 가능, 손잡이 있어 편함',
  benefit: '설거지가 편한 도마',
  target: '신혼부부',
  price: '19,800원',
  priceBand: '1~3만원',
  keywords: '집들이선물',
  tone: 'emotional',
  duration: '30',
};
