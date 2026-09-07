// 한국어 조사 처리 + 문장 다듬기 유틸

const hasFinalConsonant = (word) => {
  if (!word) return false;
  const ch = word.trim().slice(-1);
  const code = ch.charCodeAt(0);
  if (code < 0xac00 || code > 0xd7a3) return false; // 한글 음절이 아니면 판단 보류
  return (code - 0xac00) % 28 !== 0;
};

// 예) particle('가방', '을/를') => '을'
export const particle = (word, pair) => {
  const [withJong, withoutJong] = pair.split('/');
  return hasFinalConsonant(word) ? withJong : withoutJong;
};

// 예) withParticle('가방', '을/를') => '가방을'
export const withParticle = (word, pair) => `${word}${particle(word, pair)}`;

export const splitList = (raw) =>
  String(raw || '')
    .split(/[,\n·|/]+/)
    .map((s) => s.trim())
    .filter(Boolean);

export const pick = (arr, seed) => arr[Math.abs(seed) % arr.length];

// 같은 입력이면 같은 결과가 나오도록 하는 간단한 해시
export const seedOf = (str) => {
  let h = 0;
  for (let i = 0; i < String(str).length; i += 1) {
    h = (h * 31 + String(str).charCodeAt(i)) | 0;
  }
  return h;
};

export const clean = (text) =>
  text
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/([^\n ]) {2,}/g, '$1 ')
    .trim();

export const won = (n) => `${Math.round(n || 0).toLocaleString('ko-KR')}원`;

// "설거지가 편한 도마" + "원목 도마" 처럼 끝 단어가 겹칠 때 앞쪽 겹침을 덜어낸다.
export const trimOverlap = (lead, product) => {
  if (!lead || !product) return lead || '';
  const a = lead.trim().split(/\s+/);
  const b = product.trim().split(/\s+/);
  while (a.length > 1 && b.length && a[a.length - 1] === b[b.length - 1]) a.pop();
  return a.join(' ');
};
