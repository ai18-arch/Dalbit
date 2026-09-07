import ProductForm from '../components/ProductForm.jsx';
import CopyBlock from '../components/CopyBlock.jsx';
import TipBox from '../components/TipBox.jsx';
import ToolHead from '../components/ToolHead.jsx';
import useCopyTool from '../lib/useCopyTool.js';
import { generateDetailPage } from '../lib/generators.js';

export default function DetailPageTool() {
  const { form, setForm, result, run, resultRef } = useCopyTool(generateDetailPage);

  return (
    <>
      <ToolHead
        emoji="📝"
        title="상세페이지 만들기"
        desc="첫 문구부터 자주 묻는 질문까지, 상세페이지에 그대로 붙여 쓸 문구를 만들어 드려요."
      />
      <ProductForm
        value={form}
        onChange={setForm}
        onSubmit={() => run(false)}
        show={{ price: true }}
        submitLabel="상세페이지 문구 만들어 주세요"
      />

      {result && (
        <div className="results" ref={resultRef}>
          <div className="results-head">
            <h3>맨 위에 넣을 첫 문구</h3>
            <span className="count">3개 중 하나만 고르세요</span>
          </div>
          {result.headlines.map((h) => (
            <CopyBlock key={h} tag="첫 문구" text={h} big />
          ))}

          <div className="results-head" style={{ marginTop: 24 }}>
            <h3>상세페이지 본문</h3>
            <span className="count">전체 복사해서 쓰세요</span>
          </div>
          <CopyBlock tag="본문 전체" tagStyle="lilac" text={result.body} />

          <div className="results-head" style={{ marginTop: 24 }}>
            <h3>자주 묻는 질문</h3>
            <span className="count">문의를 줄여줘요</span>
          </div>
          <CopyBlock tag="Q&A" tagStyle="lilac" text={result.faq} />

          <button className="btn-ghost" type="button" onClick={() => run(true)}>
            🔄 다른 느낌으로 다시 만들기
          </button>
          <TipBox items={result.tips} />
        </div>
      )}
    </>
  );
}
