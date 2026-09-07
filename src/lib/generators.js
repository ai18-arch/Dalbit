import { clean, pick, seedOf, withParticle } from './korean.js';
import { toneOf } from './tones.js';

// 입력값을 안전하게 정리한다.
const normalize = (input) => {
  const product = (input.product || '').trim();
  const features = (input.features || []).filter(Boolean).map((f) => f.trim());
  return {
    product,
    category: (input.category || '').trim(),
    target: (input.target || '').trim(),
    price: (input.price || '').trim(),
    keywords: (input.keywords || '').trim(),
    features,
    f1: features[0] || '',
    f2: features[1] || '',
    f3: features[2] || '',
    tone: toneOf(input.tone),
    seed: seedOf(`${product}|${features.join(',')}|${input.target}|${input.tone}|${input.nonce || 0}`),
  };
};

/* ============================ 1. 상품명 ============================ */

export const generateProductNames = (input) => {
  const d = normalize(input);
  const t = d.tone;
  const s = d.seed;
  const mod = pick(t.modifiers, s);
  const kw = d.keywords ? d.keywords.split(/[,\s]+/).filter(Boolean) : [];
  const kw1 = kw[0] || d.category || '';
  const targetWord = d.target || '누구나';

  const items = [
    {
      tag: '검색 노출형',
      text: [kw1, d.f1, d.product, d.f2].filter(Boolean).join(' '),
      note: '검색에 쓰이는 단어를 앞쪽에 배치했어요. 스마트스토어·쿠팡처럼 검색 유입이 중요한 곳에 좋아요.',
    },
    {
      tag: '감성형',
      text: [mod, d.f1, d.product].filter(Boolean).join(' '),
      note: '느낌을 먼저 전달하는 이름이에요. 자체 쇼핑몰이나 인스타 판매에 잘 맞아요.',
    },
    {
      tag: '타겟 지목형',
      text: `${withParticle(targetWord, '을/를')} 위한 ${[d.f1, d.product].filter(Boolean).join(' ')}`,
      note: '"내 얘기다" 싶게 만드는 이름이에요. 타겟이 뚜렷한 상품에 효과가 좋아요.',
    },
    {
      tag: '혜택 강조형',
      text: `${[d.f1, d.product].filter(Boolean).join(' ')}${d.f2 ? ` | ${d.f2}` : ''}${d.f3 ? ` ${d.f3}` : ''}`,
      note: '고민을 해결해 주는 점을 앞세웠어요. 가격 비교가 잦은 상품에 유리해요.',
    },
    {
      tag: '상황 제안형',
      text: `${pick(['출근할 때 좋은', '집에서 쉴 때 쓰는', '선물하기 좋은', '여행 갈 때 챙기는', '매일 쓰기 좋은'], s + 1)} ${[d.f1, d.product].filter(Boolean).join(' ')}`,
      note: '언제 쓰면 좋은지를 알려주는 이름이에요. 쓸 상황이 잘 떠오르지 않는 상품에 추천해요.',
    },
    {
      tag: '신뢰형',
      text: [d.category, d.product, d.f1 ? `(${d.f1})` : '', d.f2 ? `(${d.f2})` : ''].filter(Boolean).join(' '),
      note: '스펙을 또박또박 적은 이름이에요. 가격대가 있는 상품일수록 안심을 줍니다.',
    },
    {
      tag: '짧고 강한형',
      text: [d.f1 || mod, d.product].filter(Boolean).join(' '),
      note: '기억하기 쉬운 짧은 이름이에요. 브랜드를 키우려면 이런 이름을 하나 정해두면 좋아요.',
    },
    {
      tag: '풀 키워드형',
      text: [kw1, d.target, d.f1, d.f2, d.product, d.f3].filter(Boolean).join(' '),
      note: '검색 단어를 최대한 담은 긴 이름이에요. 노출은 늘지만 너무 길면 잘려 보이니 50자 안쪽으로 다듬어 쓰세요.',
    },
  ];

  return {
    items: items
      .map((it) => ({ ...it, text: clean(it.text).replace(/\s+/g, ' ') }))
      .filter((it) => it.text.length > 1),
    tips: [
      '상품명은 앞쪽 15자가 가장 중요해요. 모바일에서는 그 뒤가 잘려 보입니다.',
      '같은 단어를 두 번 넣지 마세요. (예: "가방 여성가방") 검색에 도움이 되지 않아요.',
      '"최저가", "1위", "정품보장" 같은 표현은 근거가 없으면 제재를 받을 수 있어요.',
      '2~3개를 골라 2주씩 바꿔 걸어보고, 조회수가 잘 나오는 쪽을 남기세요.',
    ],
  };
};

/* ========================= 2. 상세페이지 문구 ========================= */

export const generateDetailPage = (input) => {
  const d = normalize(input);
  const t = d.tone;
  const s = d.seed;
  const target = d.target || '이런 분';
  const hook = pick(t.hooks, s);
  const ending = pick(t.endings, s);
  const cta = pick(t.ctas, s);

  const headlines = [
    `${hook} ${d.product}`,
    `${d.f1 ? `${d.f1}, ` : ''}${withParticle(d.product, '은/는')} 이걸로 끝내세요`,
    `${withParticle(target, '을/를')} 위해 ${d.f1 ? `${d.f1}까지 ` : ''}챙긴 ${d.product}`,
  ].map((h) => clean(h));

  const painPoints = [
    d.f1 ? `${d.f1} — 이런 상품, 생각보다 찾기 어려우셨죠?` : '마음에 쏙 드는 걸 찾기가 참 어렵죠.',
    '싸게 사면 금방 아쉽고, 좋은 건 너무 부담스럽고.',
    '고민하다 결국 미뤄두신 분들을 위해 준비했어요.',
  ];

  const bullets = d.features.length
    ? d.features.map((f, i) => `${['①', '②', '③', '④', '⑤'][i] || '·'} ${f}\n   → ${featureBenefit(d, i)}`)
    : ['① 매일 쓰기 좋은 기본기\n   → 화려하지 않아도, 손이 자주 가는 게 결국 잘 쓰는 물건이에요.'];

  const body = clean(`
${headlines[0]}

${painPoints.join('\n')}

━━━━━━━━━━━━━━━━━━

■ 이런 분께 추천해요

· ${target}
· ${d.f1 ? `${withParticle(d.f1, '이/가')} 중요한 분` : '오래 쓸 물건을 찾는 분'}
· ${d.f2 ? `${d.f2}까지 챙기고 싶은 분` : '고민만 오래 하신 분'}
· 선물할 곳이 필요한 분

━━━━━━━━━━━━━━━━━━

■ ${d.product}, 이런 점이 좋아요

${bullets.join('\n\n')}

━━━━━━━━━━━━━━━━━━

■ 이렇게 써보세요

· ${pick(['아침에 나가기 전 한 번', '퇴근하고 집에 와서', '주말에 여유 있게'], s)} 사용하면 가장 좋아요.
· ${d.f1 ? `${d.f1} 덕분에 처음 쓰는 분도 어렵지 않아요.` : '처음 쓰는 분도 설명서 없이 바로 쓸 수 있어요.'}
· 관리는 간단하게. 오래 쓰려면 ${pick(['직사광선을 피해 보관', '물기 없이 건조 보관', '사용 후 가볍게 닦아 보관'], s + 2)}해 주세요.

━━━━━━━━━━━━━━━━━━

■ 구매 전 확인해 주세요

· 상품 정보: ${[d.category, d.product].filter(Boolean).join(' / ')}
· 가격: ${d.price ? `${d.price}` : '상단 옵션에서 확인해 주세요'}
· 배송: 오후 2시 이전 결제 시 당일 출고 (주말·공휴일 제외)
· 교환·반품: 수령 후 7일 이내 가능 (사용 흔적이 있는 경우 제한)
· 모니터 환경에 따라 색상이 조금 다르게 보일 수 있어요.

━━━━━━━━━━━━━━━━━━

${withParticle(d.product, '을/를')} 고민하고 계셨다면, 지금이 좋은 때예요.
${d.f1 ? `${d.f1}까지 신경 써서 ` : ''}${ending}

${cta}
`);

  const faq = clean(`
Q. 처음 사도 괜찮을까요?
A. 네, 처음 쓰시는 분이 가장 많이 찾는 상품이에요. ${d.f1 ? `${withParticle(d.f1, '이/가')} 있어 어렵지 않습니다.` : '어렵지 않게 바로 사용하실 수 있어요.'}

Q. 선물용으로도 괜찮나요?
A. 네, 요청 주시면 포장해서 보내드려요. 가격표는 빼고 발송합니다.

Q. 배송은 얼마나 걸리나요?
A. 평일 오후 2시 이전 결제 시 당일 출고되고, 보통 1~2일 안에 받으실 수 있어요.

Q. 마음에 안 들면 반품이 되나요?
A. 수령 후 7일 이내에 연락 주시면 처리해 드려요. 편하게 문의하세요.

Q. 사이즈나 색상 문의는 어디로 하면 되나요?
A. 상품 문의 게시판이나 채팅으로 남겨주시면 빠르게 답변드립니다.
`);

  return {
    headlines,
    body,
    faq,
    tips: [
      '상세페이지는 위에서 3줄 안에 "왜 이걸 봐야 하는지"가 보여야 해요.',
      '문단마다 이미지 한 장을 끼워 넣으면 이탈이 크게 줄어요.',
      '"최고", "완치", "100%" 같은 표현은 광고 심의에 걸릴 수 있으니 빼는 게 안전해요.',
      '실제 후기 2~3개를 아래쪽에 붙이면 구매 전환이 눈에 띄게 올라갑니다.',
    ],
  };
};

// 특징을 고객 입장의 이득으로 바꿔 말해준다.
const featureBenefit = (d, i) => {
  const lines = [
    `쓰면서 아쉬운 순간이 확 줄어드는 부분이에요.`,
    `그래서 ${d.target || '쓰는 사람'} 입장에선 손이 훨씬 덜 갑니다.`,
    `작은 차이지만, 매일 쓰면 확실히 느껴져요.`,
    `이 점 때문에 다시 찾아주시는 분이 많아요.`,
  ];
  // 특징마다 다른 설명이 붙도록 순서대로 돌린다.
  return lines[(Math.abs(d.seed) + i) % lines.length];
};

/* ======================== 3. 인스타그램 홍보글 ======================== */

export const generateInstagram = (input) => {
  const d = normalize(input);
  const t = d.tone;
  const s = d.seed;
  const e = t.emojis;
  const target = d.target || '요즘 나';

  const hashtags = buildHashtags(d);

  const variants = [
    {
      tag: '스토리텔링형',
      text: clean(`
${e[0]} ${pick(t.hooks, s)} ${d.product}

${d.f1 ? `${d.f1} 하나 때문에 이거 만들었어요.` : '별거 아닌 것 같아도, 이게 제일 어려웠어요.'}
${d.f2 ? `${d.f2}까지 챙기느라 시간이 좀 걸렸지만요.` : '몇 번을 다시 만들었는지 몰라요.'}

써보신 분들이 ${pick(['"이거 왜 이제 알았지"', '"생각보다 훨씬 좋다"', '"하나 더 살까 고민된다"'], s)}라고
말해주실 때가 제일 좋아요 ${e[1]}

${target}에게 어울릴 것 같으면
저장해두셨다가 천천히 보세요.

${pick(t.ctas, s)}
프로필 링크에서 보실 수 있어요 ${e[2]}

.
.
${hashtags}
`),
    },
    {
      tag: '정보형',
      text: clean(`
${d.product} 고를 때 꼭 볼 것 3가지 ${e[3] || '📌'}

1️⃣ ${d.f1 || '오래 쓸 수 있는지'}
　 ${d.f1 ? '여기서 만족도가 거의 갈려요.' : '싼 걸 두 번 사는 게 더 비싸요.'}

2️⃣ ${d.f2 || '내 상황에 맞는 크기인지'}
　 사기 전에 한 번만 확인해 보세요.

3️⃣ ${d.f3 || '관리가 번거롭지 않은지'}
　 손이 많이 가면 결국 안 쓰게 되더라고요.

이 세 가지 기준으로 저희가 골라 담은 게
${withParticle(d.product, '이에요/예요')}${d.price ? ` (${d.price})` : ''}

궁금한 건 댓글로 물어보세요, 다 답변드려요 ${e[1]}

.
.
${hashtags}
`),
    },
    {
      tag: '이벤트형',
      text: clean(`
${e[0]} ${d.product} ${pick(['오픈 기념 이벤트', '재입고 알림', '이번 주만 특가'], s)} ${e[0]}

${d.f1 ? `${d.f1} 그대로,` : '구성 그대로,'}
${d.price ? `${d.price}` : '가격은 프로필 링크에서 확인'} 🎁

✔️ 참여 방법
· 이 글 저장 + 좋아요
· 댓글에 함께 쓸 사람 소환하기

✔️ 혜택
· 추첨 3분께 ${d.product} 증정
· 참여자 전원 할인 쿠폰

${pick(['이번 주 일요일 자정까지', '수량 소진 시 종료', '이번 주까지만'], s + 1)}이에요.
놓치면 아까워요 ${e[3] || '🔥'}

.
.
${hashtags}
`),
    },
  ];

  return {
    variants,
    hashtags,
    tips: [
      '첫 한 줄이 전부예요. 인스타는 두 줄까지만 보이고 나머지는 "더 보기"로 접힙니다.',
      '해시태그는 15~20개가 적당해요. 인기 태그와 작은 태그를 섞어 쓰세요.',
      '"저장"을 유도하는 문장을 꼭 넣으세요. 저장이 많으면 노출이 늘어납니다.',
      '댓글에는 24시간 안에 답을 달아주세요. 답글도 노출에 도움이 돼요.',
    ],
  };
};

const buildHashtags = (d) => {
  const base = ['소상공인', '온라인쇼핑몰', '자영업', '스마트스토어', '온라인판매', '스몰브랜드', '데일리템', '오늘의추천'];
  const fromInput = [d.product, d.category, d.target, ...d.features, ...d.keywords.split(/[,\s]+/)]
    .filter(Boolean)
    .map((w) => w.replace(/[^가-힣a-zA-Z0-9]/g, ''))
    .filter((w) => w.length >= 2);
  const combos = d.product
    ? [`${d.product}추천`, `${d.product}후기`, `${d.product}선물`, `${d.category || '오늘'}${d.product}`, `${d.target || ''}${d.product}`]
        .map((w) => w.replace(/[^가-힣a-zA-Z0-9]/g, ''))
        .filter((w) => w.length >= 3)
    : [];
  const all = [...new Set([...fromInput, ...combos, ...base])].slice(0, 18);
  return all.map((w) => `#${w}`).join(' ');
};

/* =========================== 4. 쇼츠 대본 =========================== */

export const generateShorts = (input) => {
  const d = normalize(input);
  const t = d.tone;
  const s = d.seed;

  const scriptA = clean(`
🎬 [30초 · 후킹형] ${d.product}

──────────────────
0~3초 · 훅 (여기서 다 갈립니다)
──────────────────
🗣 "${d.f1 ? `${d.f1} 찾는 분, 이거 보세요.` : `${d.product}, 아직 이렇게 쓰세요?`}"
📺 화면: ${withParticle(d.product, '을/를')} 손에 들고 정면으로 들어 보이기 (클로즈업)
💬 자막: ${d.f1 || d.product} ${pick(['👀', '‼️', '🔥'], s)}

──────────────────
3~8초 · 공감
──────────────────
🗣 "저도 ${pick(['이거 몰라서 돈 버렸어요', '한참 고민만 했어요', '세 번이나 바꿨어요'], s)}."
📺 화면: 아쉬웠던 기존 방식 → 얼굴 살짝 찡그리기
💬 자막: 이거 모르면 손해

──────────────────
8~20초 · 핵심 (특징 하나에 5초)
──────────────────
${d.features.length
      ? d.features
          .slice(0, 3)
          .map((f, i) => `🗣 "${i + 1}. ${f}"\n📺 화면: ${f} 부분 클로즈업 + 실제로 써보는 장면\n💬 자막: ${f}`)
          .join('\n\n')
      : `🗣 "쓰기 편하고, 오래 씁니다."\n📺 화면: 실제 사용 장면 2컷\n💬 자막: 편하다 / 오래 쓴다`}

──────────────────
20~27초 · 결과 보여주기
──────────────────
🗣 "${pick(['이렇게 바뀝니다.', '차이 보이시죠?', '해보면 압니다.'], s + 1)}"
📺 화면: 비포/애프터 나란히 (화면 반 나누기)
💬 자막: ${d.f1 ? `${d.f1} 확인` : 'BEFORE → AFTER'}

──────────────────
27~30초 · CTA
──────────────────
🗣 "${pick(t.ctas, s)}"
📺 화면: 상품 정면 + 화살표로 프로필 가리키기
💬 자막: 프로필 링크 확인 👆 / 저장해두세요 🔖

──────────────────
📌 촬영 메모
· 세로 9:16, 첫 컷은 반드시 상품이 화면을 꽉 채우게
· 자막은 화면 가운데 위쪽, 글자 크게 (소리 없이 보는 사람이 절반이에요)
· 컷은 3초 이상 끌지 말기
· ${d.target ? `${withParticle(d.target, '이/가')} 쓰는 말투로` : '평소 손님에게 말하듯 편하게'} 읽어주세요
`);

  const scriptB = clean(`
🎬 [45초 · 정보형] ${d.product} 고르는 기준

──────────────────
0~3초 · 훅
──────────────────
🗣 "${d.product} 살 때 이거 세 개만 보세요."
📺 화면: 손가락 3개 펴 보이기
💬 자막: ${d.product} 고르는 법 3가지

──────────────────
3~15초 · 기준 ①
──────────────────
🗣 "첫째, ${d.f1 || '오래 쓸 수 있는지'}."
📺 화면: 해당 부분 확대 촬영
💬 자막: ① ${d.f1 || '내구성'}

──────────────────
15~27초 · 기준 ②
──────────────────
🗣 "둘째, ${d.f2 || '내 상황에 맞는 크기인지'}."
📺 화면: 손이나 다른 물건과 크기 비교
💬 자막: ② ${d.f2 || '사이즈'}

──────────────────
27~38초 · 기준 ③
──────────────────
🗣 "셋째, ${d.f3 || '관리가 번거롭지 않은지'}."
📺 화면: 관리하는 장면 빠르게
💬 자막: ③ ${d.f3 || '관리 편의성'}

──────────────────
38~45초 · 마무리 + CTA
──────────────────
🗣 "이 세 개 다 되는 게 ${withParticle(d.product, '이에요/예요')}${d.price ? `, ${d.price}` : ''}."
📺 화면: 상품 전체 샷 + 가격 자막
💬 자막: 자세한 건 프로필 링크 👆

──────────────────
📌 촬영 메모
· 정보형은 저장·공유가 잘 나와요. "저장해두세요" 한마디를 꼭 넣으세요
· 배경음악은 조용한 걸로, 목소리가 묻히지 않게
· 다 찍고 나서 앞 3초만 다시 찍어 붙여도 조회수가 달라져요
`);

  return {
    scripts: [
      { tag: '30초 후킹형', text: scriptA, note: '조회수를 늘리기 좋은 구성이에요. 처음 올리는 분께 추천해요.' },
      { tag: '45초 정보형', text: scriptB, note: '저장·공유가 잘 나오는 구성이에요. 팔로워를 모으기에 좋아요.' },
    ],
    tips: [
      '쇼츠는 앞 3초가 전부예요. 인사말("안녕하세요")로 시작하면 대부분 넘겨버립니다.',
      '한 편에 메시지는 하나만. 두 개를 담으면 둘 다 기억되지 않아요.',
      '얼굴이 나오면 신뢰도가 올라가지만, 손과 상품만으로도 충분해요.',
      '같은 상품으로 훅만 바꿔 3편을 올려보세요. 잘 되는 훅이 보입니다.',
    ],
  };
};

/* ======================== 5. 가격/마진 계산 ======================== */

const num = (v) => {
  const n = parseFloat(String(v).replace(/[^0-9.-]/g, ''));
  return Number.isFinite(n) ? n : 0;
};

export const calcMargin = (input) => {
  const price = num(input.price);
  const cost = num(input.cost);
  const shipping = num(input.shipping);
  const packing = num(input.packing);
  const ad = num(input.ad);
  const etc = num(input.etc);
  const feeRate = num(input.feeRate);

  const fee = (price * feeRate) / 100;
  const totalCost = cost + shipping + packing + ad + etc + fee;
  const profit = price - totalCost;
  const marginRate = price > 0 ? (profit / price) * 100 : 0;
  const markupRate = cost > 0 ? (profit / cost) * 100 : 0;

  // 손익분기 판매가: 판매가에 비례하는 수수료를 감안해 역산
  const fixedCost = cost + shipping + packing + ad + etc;
  const feeMultiplier = 1 - feeRate / 100;
  const breakEven = feeMultiplier > 0 ? fixedCost / feeMultiplier : 0;

  // 목표 마진율을 맞추기 위한 권장 판매가
  const priceFor = (targetMargin) => {
    const denom = feeMultiplier - targetMargin / 100;
    return denom > 0 ? fixedCost / denom : 0;
  };

  const monthlyQty = num(input.monthlyQty);
  const monthlyProfit = profit * monthlyQty;

  return {
    price,
    fee,
    totalCost,
    profit,
    marginRate,
    markupRate,
    breakEven,
    monthlyQty,
    monthlyProfit,
    suggestions: [
      { label: '마진 20%', value: priceFor(20) },
      { label: '마진 30%', value: priceFor(30) },
      { label: '마진 40%', value: priceFor(40) },
    ],
    rows: [
      { label: '판매가', value: price, kind: 'in' },
      { label: '상품 원가', value: -cost },
      { label: `플랫폼 수수료 (${feeRate}%)`, value: -fee },
      { label: '배송비 부담', value: -shipping },
      { label: '포장·부자재', value: -packing },
      { label: '광고비', value: -ad },
      { label: '기타 비용', value: -etc },
    ].filter((r) => r.value !== 0 || r.kind === 'in'),
    advice: marginAdvice(marginRate, profit, price),
  };
};

const marginAdvice = (rate, profit, price) => {
  if (!price) return '판매가를 입력하면 순이익과 마진율을 계산해 드려요.';
  if (profit < 0) return '지금 가격으로는 팔 때마다 손해예요. 아래 권장 판매가를 참고해 가격을 올리거나 원가를 낮춰야 해요.';
  if (rate < 10) return '마진이 10% 미만이에요. 반품 한 건만 생겨도 적자로 돌아섭니다. 가격을 조금 올려보세요.';
  if (rate < 20) return '버틸 수는 있지만 여유가 없어요. 광고를 돌리기엔 조금 빠듯한 구간이에요.';
  if (rate < 35) return '온라인 판매에서 무난한 구간이에요. 이 마진이면 광고도 조심스럽게 돌려볼 수 있어요.';
  return '마진이 넉넉해요. 광고비를 늘려 판매량을 키우는 쪽이 유리할 수 있어요.';
};
