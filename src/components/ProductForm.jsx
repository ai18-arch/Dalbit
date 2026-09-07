import ChipGroup from './ChipGroup.jsx';
import { CATEGORY_PRESETS, TARGET_PRESETS, TONES } from '../lib/tones.js';

// 카피 생성 도구 4개가 함께 쓰는 입력 폼.
// show 로 필요한 칸만 켜서 쓴다.
export default function ProductForm({
  value,
  onChange,
  show = {},
  onSubmit,
  submitLabel = '만들어 주세요',
  error,
}) {
  const set = (key) => (e) => onChange({ ...value, [key]: e.target.value });
  const ready = value.product.trim().length > 0;

  return (
    <div className="panel">
      <div className="field">
        <label htmlFor="product">
          어떤 상품인가요? <span className="hint">필수</span>
        </label>
        <input
          id="product"
          type="text"
          value={value.product}
          onChange={set('product')}
          placeholder="예) 원목 도마, 린넨 원피스, 수제 딸기잼"
        />
      </div>

      {show.category !== false && (
        <div className="field">
          <label>
            카테고리 <span className="hint">선택</span>
          </label>
          <ChipGroup
            options={CATEGORY_PRESETS}
            value={value.category}
            onSelect={(v) => onChange({ ...value, category: value.category === v ? '' : v })}
          />
        </div>
      )}

      <div className="field">
        <label htmlFor="features">
          자랑하고 싶은 점 <span className="hint">쉼표(,)로 3개까지</span>
        </label>
        <textarea
          id="features"
          value={value.featuresRaw}
          onChange={set('featuresRaw')}
          placeholder={'예) 국내 제작, 식기세척기 사용 가능, 손잡이 있어 편함'}
        />
      </div>

      <div className="field">
        <label htmlFor="target">
          누가 사면 좋을까요? <span className="hint">선택</span>
        </label>
        <input
          id="target"
          type="text"
          value={value.target}
          onChange={set('target')}
          placeholder="예) 신혼부부, 자취 3년차"
          style={{ marginBottom: 8 }}
        />
        <ChipGroup
          options={TARGET_PRESETS}
          value={value.target}
          onSelect={(v) => onChange({ ...value, target: value.target === v ? '' : v })}
        />
      </div>

      {show.price && (
        <div className="field">
          <label htmlFor="price">
            가격 <span className="hint">선택 · 글에 넣고 싶을 때만</span>
          </label>
          <input
            id="price"
            type="text"
            value={value.price}
            onChange={set('price')}
            placeholder="예) 19,800원 / 2개 29,000원"
          />
        </div>
      )}

      {show.keywords && (
        <div className="field">
          <label htmlFor="keywords">
            들어가면 좋은 검색 단어 <span className="hint">선택</span>
          </label>
          <input
            id="keywords"
            type="text"
            value={value.keywords}
            onChange={set('keywords')}
            placeholder="예) 캠핑용품, 집들이선물"
          />
        </div>
      )}

      <div className="field">
        <label>말투는 어떻게 할까요?</label>
        <ChipGroup
          options={TONES.map((t) => t.label)}
          value={TONES.find((t) => t.id === value.tone)?.label}
          onSelect={(label) => onChange({ ...value, tone: TONES.find((t) => t.label === label).id })}
        />
      </div>

      <button className="btn-primary" onClick={onSubmit} disabled={!ready} type="button">
        {ready ? `✨ ${submitLabel}` : '상품 이름부터 알려주세요'}
      </button>
      {error && <div className="form-error">{error}</div>}
    </div>
  );
}
