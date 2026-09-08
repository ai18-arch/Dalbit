import ProductForm from '../components/ProductForm.jsx';
import CopyBlock from '../components/CopyBlock.jsx';
import ResultActions from '../components/ResultActions.jsx';
import TipBox from '../components/TipBox.jsx';
import ToolHead from '../components/ToolHead.jsx';
import useCopyTool from '../lib/useCopyTool.js';
import { generateInstagram } from '../lib/generators.js';

export default function InstagramTool() {
  const { form, setForm, result, run, fillSample, resultRef } = useCopyTool(generateInstagram);

  return (
    <>
      <ToolHead
        icon="camera"
        title="인스타 홍보글 만들기"
        desc="해시태그까지 붙은 피드 글을 스타일별로 3개 만들어 드려요."
        steps={['상품 정보를 채우고', '마음에 드는 글을 복사해서', '인스타에 사진과 함께 올리기']}
      />
      <ProductForm
        value={form}
        onChange={setForm}
        onSubmit={() => run(false)}
        onSample={fillSample}
        show={{ price: true, benefit: true }}
        submitLabel="인스타 글 만들어 주세요"
      />

      {result && (
        <div className="results" ref={resultRef}>
          <div className="results-head">
            <h3>이렇게 올려보세요</h3>
            <span className="count">{result.variants.length}개</span>
          </div>
          <ResultActions
            allText={result.variants.map((v) => `[${v.tag}]\n${v.text}`).join('\n\n\n')}
            onRegenerate={() => run(true)}
          />
          {result.variants.map((v) => (
            <CopyBlock key={v.tag} tag={v.tag} text={v.text} />
          ))}

          <div className="results-head sub">
            <h3>해시태그만 따로</h3>
          </div>
          <CopyBlock tag="해시태그" tagStyle="lilac" text={result.hashtags} />

          <TipBox items={result.tips} />
        </div>
      )}
    </>
  );
}
