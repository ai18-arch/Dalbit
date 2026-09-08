import { useState } from 'react';
import Icon from './Icon.jsx';
import { copyText } from '../lib/clipboard.js';

// 결과 화면 맨 위에 붙는 버튼 두 개. (전체 복사 / 다른 결과 만들기)
export default function ResultActions({ allText, onRegenerate }) {
  const [done, setDone] = useState(false);

  const copyAll = async () => {
    await copyText(allText);
    setDone(true);
    setTimeout(() => setDone(false), 1600);
  };

  return (
    <div className="result-actions">
      <button type="button" className={`act act-copy ${done ? 'done' : ''}`} onClick={copyAll}>
        <Icon name={done ? 'check' : 'copy'} size={16} />
        {done ? '복사됐어요' : '전체 복사하기'}
      </button>
      <button type="button" className="act act-again" onClick={onRegenerate}>
        <Icon name="refresh" size={16} />
        다른 결과 만들기
      </button>
    </div>
  );
}
