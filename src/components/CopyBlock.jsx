import { useState } from 'react';

// 결과 하나를 보여주는 카드. 복사 버튼이 붙어 있다.
export default function CopyBlock({ tag, tagStyle, text, note, big }) {
  const [done, setDone] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // 클립보드 권한이 없는 브라우저를 위한 대비책
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setDone(true);
    setTimeout(() => setDone(false), 1600);
  };

  return (
    <div className="result-card fade-in">
      <div className="rc-top">
        {tag && <span className={`tag ${tagStyle || ''}`}>{tag}</span>}
        <button className={`copy-btn ${done ? 'done' : ''}`} onClick={copy} type="button">
          {done ? '복사됐어요 ✓' : '복사하기'}
        </button>
      </div>
      <p className={`result-text ${big ? 'big' : ''}`}>{text}</p>
      {note && <div className="result-note">💡 {note}</div>}
    </div>
  );
}
