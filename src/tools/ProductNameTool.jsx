import ProductForm from '../components/ProductForm.jsx';
import CopyBlock from '../components/CopyBlock.jsx';
import ResultActions from '../components/ResultActions.jsx';
import TipBox from '../components/TipBox.jsx';
import ToolHead from '../components/ToolHead.jsx';
import useCopyTool from '../lib/useCopyTool.js';
import { generateProductNames } from '../lib/generators.js';

export default function ProductNameTool() {
  const { form, setForm, result, run, fillSample, resultRef } = useCopyTool(generateProductNames);

  return (
    <>
      <ToolHead
        emoji="🛒"
        title="상품명 만들기"
        desc="검색에 잘 걸리는 이름부터 감성적인 이름까지, 스타일별로 만들어 드려요."
        steps={['상품 이름을 적고', '아래 칸을 채우면 더 정확해져요', '마음에 드는 이름을 복사']}
      />
      <ProductForm
        value={form}
        onChange={setForm}
        onSubmit={() => run(false)}
        onSample={fillSample}
        show={{ keywords: true, benefit: true, priceBand: true }}
        submitLabel="상품명 만들어 주세요"
      />

      {result && (
        <div className="results" ref={resultRef}>
          <div className="results-head">
            <h3>이런 이름 어때요?</h3>
            <span className="count">{result.items.length}개</span>
          </div>
          {result.hint && <div className="result-hint">💬 {result.hint}</div>}
          <ResultActions
            allText={result.items.map((it) => `[${it.tag}] ${it.text}`).join('\n')}
            onRegenerate={() => run(true)}
          />
          {result.items.map((it) => (
            <CopyBlock key={it.tag} tag={it.tag} text={it.text} note={it.note} big />
          ))}
          <TipBox items={result.tips} />
        </div>
      )}
    </>
  );
}
