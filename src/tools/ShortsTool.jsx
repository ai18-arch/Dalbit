import ProductForm from '../components/ProductForm.jsx';
import CopyBlock from '../components/CopyBlock.jsx';
import TipBox from '../components/TipBox.jsx';
import ToolHead from '../components/ToolHead.jsx';
import useCopyTool from '../lib/useCopyTool.js';
import { generateShorts } from '../lib/generators.js';

export default function ShortsTool() {
  const { form, setForm, result, run, resultRef } = useCopyTool(generateShorts);

  return (
    <>
      <ToolHead
        emoji="🎬"
        title="쇼츠 대본 만들기"
        desc="몇 초에 무엇을 찍고 어떤 말을 할지, 자막까지 정해서 알려드려요. 릴스·틱톡에도 그대로 쓸 수 있어요."
      />
      <ProductForm
        value={form}
        onChange={setForm}
        onSubmit={() => run(false)}
        show={{ price: true }}
        submitLabel="쇼츠 대본 만들어 주세요"
      />

      {result && (
        <div className="results" ref={resultRef}>
          <div className="results-head">
            <h3>대본이 준비됐어요</h3>
            <span className="count">둘 중 하나로 찍어보세요</span>
          </div>
          {result.scripts.map((s) => (
            <CopyBlock key={s.tag} tag={s.tag} text={s.text} note={s.note} />
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
