import ProductForm from '../components/ProductForm.jsx';
import CopyBlock from '../components/CopyBlock.jsx';
import TipBox from '../components/TipBox.jsx';
import ToolHead from '../components/ToolHead.jsx';
import useCopyTool from '../lib/useCopyTool.js';
import { generateProductNames } from '../lib/generators.js';

export default function ProductNameTool() {
  const { form, setForm, result, run, resultRef } = useCopyTool(generateProductNames);

  return (
    <>
      <ToolHead
        emoji="🛒"
        title="상품명 만들기"
        desc="검색에 잘 걸리는 이름부터 감성적인 이름까지, 스타일별로 8개를 만들어 드려요."
      />
      <ProductForm
        value={form}
        onChange={setForm}
        onSubmit={() => run(false)}
        show={{ keywords: true }}
        submitLabel="상품명 만들어 주세요"
      />

      {result && (
        <div className="results" ref={resultRef}>
          <div className="results-head">
            <h3>이런 이름 어때요?</h3>
            <span className="count">{result.items.length}개</span>
          </div>
          {result.items.map((it) => (
            <CopyBlock key={it.tag} tag={it.tag} text={it.text} note={it.note} big />
          ))}
          <button className="btn-ghost" type="button" onClick={() => run(true)}>
            🔄 다른 느낌으로 다시 만들기
          </button>
          <TipBox items={result.tips} />
        </div>
      )}
    </>
  );
}
