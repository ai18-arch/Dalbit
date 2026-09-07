import ProductForm from '../components/ProductForm.jsx';
import CopyBlock from '../components/CopyBlock.jsx';
import TipBox from '../components/TipBox.jsx';
import ToolHead from '../components/ToolHead.jsx';
import useCopyTool from '../lib/useCopyTool.js';
import { generateInstagram } from '../lib/generators.js';

export default function InstagramTool() {
  const { form, setForm, result, run, resultRef } = useCopyTool(generateInstagram);

  return (
    <>
      <ToolHead
        emoji="📸"
        title="인스타 홍보글 만들기"
        desc="해시태그까지 붙은 피드 글을 스타일별로 3개 만들어 드려요. 복사해서 바로 올리세요."
      />
      <ProductForm
        value={form}
        onChange={setForm}
        onSubmit={() => run(false)}
        show={{ price: true }}
        submitLabel="인스타 글 만들어 주세요"
      />

      {result && (
        <div className="results" ref={resultRef}>
          <div className="results-head">
            <h3>이렇게 올려보세요</h3>
            <span className="count">{result.variants.length}개</span>
          </div>
          {result.variants.map((v) => (
            <CopyBlock key={v.tag} tag={v.tag} text={v.text} />
          ))}

          <div className="results-head" style={{ marginTop: 24 }}>
            <h3>해시태그만 따로</h3>
          </div>
          <CopyBlock tag="해시태그" tagStyle="lilac" text={result.hashtags} />

          <button className="btn-ghost" type="button" onClick={() => run(true)}>
            🔄 다른 느낌으로 다시 만들기
          </button>
          <TipBox items={result.tips} />
        </div>
      )}
    </>
  );
}
