import { useEffect, useState } from 'react';
import ProductNameTool from './tools/ProductNameTool.jsx';
import DetailPageTool from './tools/DetailPageTool.jsx';
import InstagramTool from './tools/InstagramTool.jsx';
import ShortsTool from './tools/ShortsTool.jsx';
import MarginTool from './tools/MarginTool.jsx';

const TOOLS = [
  {
    id: 'name',
    emoji: '🛒',
    title: '상품명 만들기',
    desc: '검색에 잘 걸리는 이름을 스타일별로 8개',
    Comp: ProductNameTool,
  },
  {
    id: 'detail',
    emoji: '📝',
    title: '상세페이지 만들기',
    desc: '첫 문구부터 자주 묻는 질문까지 한 번에',
    Comp: DetailPageTool,
  },
  {
    id: 'insta',
    emoji: '📸',
    title: '인스타 홍보글 만들기',
    desc: '해시태그까지 붙은 피드 글 3개',
    Comp: InstagramTool,
  },
  {
    id: 'shorts',
    emoji: '🎬',
    title: '쇼츠 대본 만들기',
    desc: '몇 초에 뭘 찍고 뭘 말할지 정해서',
    Comp: ShortsTool,
  },
  {
    id: 'margin',
    emoji: '💰',
    title: '판매가 / 마진 계산',
    desc: '수수료 빼고 실제로 남는 돈 확인',
    Comp: MarginTool,
  },
];

const greeting = () => {
  const h = new Date().getHours();
  if (h < 6) return '늦게까지 고생이 많으세요';
  if (h < 11) return '좋은 아침이에요';
  if (h < 14) return '점심은 드셨어요?';
  if (h < 18) return '오늘도 수고 많으세요';
  if (h < 22) return '오늘 하루 어땠어요?';
  return '오늘도 늦게까지 고생이세요';
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
            ← 처음으로
          </button>
        ) : (
          <div className="logo">
            <span className="logo-mark">💬</span>
            <span>셀러메이트 AI</span>
          </div>
        )}
        {!active && <div className="tagline">혼자 장사하는 사람을 위한<br />AI 직원</div>}
      </header>

      {active ? (
        <active.Comp key={active.id} />
      ) : (
        <>
          <section className="hero">
            <div className="greet">{greeting()} 🌿</div>
            <h1>오늘 무엇을 도와드릴까요?</h1>
            <p>필요한 걸 골라주시면, 바로 만들어 드릴게요.</p>
          </section>

          <nav className="card-grid">
            {TOOLS.map((t) => (
              <button
                key={t.id}
                className="tool-card"
                type="button"
                onClick={() => { window.location.hash = t.id; }}
              >
                <span className="emoji">{t.emoji}</span>
                <span className="body">
                  <span className="title">{t.title}</span>
                  <span className="desc">{t.desc}</span>
                </span>
                <span className="chev">›</span>
              </button>
            ))}
          </nav>

          <div className="home-note">
            <b>처음이신가요?</b> 어떤 걸 눌러도 <b>상품 이름 하나만</b> 적으면 결과가 나와요.
            자랑하고 싶은 점까지 적어주시면 훨씬 더 좋은 문구가 나옵니다. 만들어진 글은 복사해서
            스마트스토어·인스타그램에 바로 붙여 쓰세요.
          </div>
        </>
      )}

      <footer className="footer">
        셀러메이트 AI · 오늘도 잘 팔리기를 응원해요 🤍
      </footer>
    </div>
  );
}
