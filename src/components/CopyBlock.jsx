import { useState } from 'react';
import Icon from './Icon.jsx';
import { copyText } from '../lib/clipboard.js';

// 결과 하나를 보여주는 카드. 아래에 복사 버튼이 붙는다.
export default function CopyBlock({ tag, tagStyle, text, note, big }) {
  const [done, setDone] = useState(false);

  const copy = async () => {
    await copyText(text);
    setDone(true);
    setTimeout(() => setDone(false), 1600);
  };

  return (
    <div className="result-card fade-in">
      {tag && (
        <div className="rc-top">
          <span className={`tag ${tagStyle || ''}`}>{tag}</span>
        </div>
      )}
      <p className={`result-text ${big ? 'big' : ''}`}>{text}</p>
      {note && (
        <div className="result-note">
          <Icon name="quote" size={13} />
          <span>{note}</span>
        </div>
      )}
      <button className={`copy-btn ${done ? 'done' : ''}`} onClick={copy} type="button">
        <Icon name={done ? 'check' : 'copy'} size={15} />
        {done ? '복사됐어요' : '복사하기'}
      </button>
    </div>
  );
}
