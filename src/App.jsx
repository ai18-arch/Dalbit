import { useEffect, useState } from 'react';
import Icon from './components/Icon.jsx';
import ProductNameTool from './tools/ProductNameTool.jsx';
import DetailPageTool from './tools/DetailPageTool.jsx';
import InstagramTool from './tools/InstagramTool.jsx';
import ShortsTool from './tools/ShortsTool.jsx';
import MarginTool from './tools/MarginTool.jsx';

const TOOLS = [
  {
    id: 'name',
    icon: 'tag',
    title: '상품명 만들기',
    desc: '스타일별 이름 9개 · 검색 잘 되는 이름 포함',
    Comp: ProductNameTool,
  },
  {
    id: 'detail',
    icon: 'document',
    title: '상세페이지 만들기',
    desc: '첫 문구 + 본문 전체 + 자주 묻는 질문',
    Comp: DetailPageTool,
  },
  {
    id: 'insta',
    icon: 'camera',
    title: '인스타 홍보글 만들기',
    desc: '피드 글 3개 + 해시태그 자동 조합',
    Comp: InstagramTool,
  },
  {
    id: 'shorts',
    icon: 'film',
    title: '쇼츠 대본 만들기',
    desc: '15 · 30 · 60초 대본 + 촬영 순서',
    Comp: ShortsTool,
  },
  {
    id: 'margin',
    icon: 'coin',
    title: '판매가 / 마진 계산',
    desc: '수수료·광고비 빼고 실제로 남는 돈',
    Comp: MarginTool,
  },
];

const greeting = () => {
  const h = new Date().getHours();
  if (h < 6) return '늦은 시간까지 고생이 많으세요';
  if (h < 11) return '좋은 아침입니다';
  if (h < 14) return '오늘도 좋은 하루 보내세요';
  if (h < 18) return '오후도 힘내세요';
  if (h < 22) return '오늘 하루도 수고하셨어요';
  return '늦은 시간까지 고생이 많으세요';
};

export default function App() {
  const [route, setRoute] = useState(() => window.location.hash.replace('#', ''));

  useEffect(() => {
    const onHash = () => {
      setRoute(window.location.hash.replace('#', ''));
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const active = TOOLS.find((t) => t.id === route);

  return (
    <div className="shell">
      <header className="topbar">
        {active ? (
          <button className="back-btn" type="button" onClick={() => { window.location.hash = ''; }}>
            <Icon name="arrow" size={15} className="flip" />
            처음으로
          </button>
        ) : (
          <div className="logo">
            <span className="logo-mark">S</span>
            <span className="logo-text">
              <span className="logo-ko">셀러메이트</span>
              <span className="logo-en">SELLERMATE AI</span>
            </span>
          </div>
        )}
        {!active && <div className="tagline">혼자 장사하는 사람을 위한<br />AI 직원</div>}
      </header>

      {active ? (
        <active.Comp key={active.id} />
      ) : (
        <>
          <section className="hero">
            <div className="greet">{greeting()}</div>
            <h1>오늘 무엇을 도와드릴까요?</h1>
            <p>필요한 것을 골라주시면 바로 만들어 드립니다.</p>
            <div className="rule">
              <span />
              <i />
              <span />
            </div>
          </section>

          <nav className="card-grid">
            {TOOLS.map((t) => (
              <button
                key={t.id}
                className="tool-card"
                type="button"
                onClick={() => { window.location.hash = t.id; }}
              >
                <span className="card-mark">
                  <Icon name={t.icon} size={21} />
                </span>
                <span className="body">
                  <span className="title">{t.title}</span>
                  <span className="desc">{t.desc}</span>
                </span>
                <span className="chev">
                  <Icon name="arrow" size={15} />
                </span>
              </button>
            ))}
          </nav>

          <div className="home-note">
            <span className="note-label">처음 오셨나요</span>
            <p>
              어떤 기능이든 <b>상품 이름 하나만</b> 적으면 결과가 나옵니다. 특징·타겟·가격대까지
              채우실수록 문구가 정확해집니다. 감이 잡히지 않으시면 각 화면의{' '}
              <b>‘예시로 채워보기’</b>를 눌러보세요.
            </p>
          </div>
        </>
      )}

      <footer className="footer">
        <span className="mark">SELLERMATE AI</span>
        <span>오늘도 잘 팔리기를 응원합니다</span>
      </footer>
    </div>
  );
}
