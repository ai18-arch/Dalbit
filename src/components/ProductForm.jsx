import ChipGroup from './ChipGroup.jsx';
import { CATEGORY_PRESETS, DURATIONS, PRICE_BANDS, TARGET_PRESETS, TONES } from '../lib/tones.js';

// 카피 생성 도구들이 함께 쓰는 입력 폼.
// show 로 필요한 칸만 켜서 쓴다. 상품명 한 칸만 채워도 결과가 나온다.
export default function ProductForm({
  value,
  onChange,
  show = {},
  onSubmit,
  onSample,
  submitLabel = '만들어 주세요',
  error,
}) {
  const set = (key) => (e) => onChange({ ...value, [key]: e.target.value });
  const toggle = (key, v) => onChange({ ...value, [key]: value[key] === v ? '' : v });
  const ready = value.product.trim().length > 0;
  const filled = [value.featuresRaw, value.benefit, value.target, value.priceBand || value.price].filter(
    (x) => x && x.trim(),
  ).length;

  return (
    <div className="panel">
      <div className="form-guide">
        <span>
          <b>상품 이름 한 칸</b>만 채우면 바로 만들어 드려요. 아래는 채우면 더 좋아지는 칸이에요.
        </span>
        {onSample && (
          <button type="button" className="link-btn" onClick={onSample}>
            예시로 채워보기
          </button>
        )}
      </div>

      <div className="field">
        <label htmlFor="product">
          어떤 상품인가요? <span className="req">필수</span>
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
            카테고리 <span className="opt">선택</span>
          </label>
          <ChipGroup
            options={CATEGORY_PRESETS}
            value={value.category}
            onSelect={(v) => toggle('category', v)}
          />
        </div>
      )}

      <div className="field">
        <label htmlFor="features">
          상품의 특징 <span className="opt">선택</span>
        </label>
        <p className="field-help">사실만 적어주세요. 쉼표(,)로 나눠서 3개까지 들어갑니다.</p>
        <textarea
          id="features"
          value={value.featuresRaw}
          onChange={set('featuresRaw')}
          placeholder={'예) 국내 제작, 식기세척기 사용 가능, 손잡이 있어 편함'}
        />
      </div>

      {show.benefit && (
        <div className="field">
          <label htmlFor="benefit">
            가장 강조하고 싶은 장점 <span className="opt">선택</span>
          </label>
          <p className="field-help">딱 하나만요. 이 문장이 맨 앞에 나옵니다.</p>
          <input
            id="benefit"
            type="text"
            value={value.benefit}
            onChange={set('benefit')}
            placeholder="예) 설거지가 편한 도마"
          />
        </div>
      )}

      <div className="field">
        <label htmlFor="target">
          주요 타겟 <span className="opt">선택</span>
        </label>
        <p className="field-help">누가 사면 좋을지 정하면 문구 말투가 그 사람에게 맞춰집니다.</p>
        <input
          id="target"
          type="text"
          value={value.target}
          onChange={set('target')}
          placeholder="예) 신혼부부, 자취 3년차"
        />
        <div style={{ marginTop: 8 }}>
          <ChipGroup options={TARGET_PRESETS} value={value.target} onSelect={(v) => toggle('target', v)} />
        </div>
      </div>

      {show.priceBand && (
        <div className="field">
          <label>
            가격대 <span className="opt">선택</span>
          </label>
          <p className="field-help">가격대에 어울리는 표현으로 바뀝니다. (저가는 가성비, 고가는 품질 강조)</p>
          <ChipGroup
            options={PRICE_BANDS.map((b) => b.label)}
            value={value.priceBand}
            onSelect={(v) => toggle('priceBand', v)}
          />
        </div>
      )}

      {show.price && (
        <div className="field">
          <label htmlFor="price">
            가격 <span className="opt">선택</span>
          </label>
          <p className="field-help">글 안에 가격을 넣고 싶을 때만 적어주세요.</p>
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
            검색 단어 <span className="opt">선택</span>
          </label>
          <p className="field-help">손님이 검색창에 칠 것 같은 단어예요. 상품명 맨 앞에 들어갑니다.</p>
          <input
            id="keywords"
            type="text"
            value={value.keywords}
            onChange={set('keywords')}
            placeholder="예) 캠핑용품, 집들이선물"
          />
        </div>
      )}

      {show.duration && (
        <div className="field">
          <label>영상 길이</label>
          <p className="field-help">길이에 따라 장면 구성과 대사량이 달라집니다.</p>
          <div className="option-row">
            {DURATIONS.map((d) => (
              <button
                key={d.id}
                type="button"
                className={`option ${value.duration === d.id ? 'on' : ''}`}
                onClick={() => onChange({ ...value, duration: d.id })}
              >
                <span className="o-title">{d.label}</span>
                <span className="o-desc">{d.desc}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="field">
        <label>원하는 분위기</label>
        <p className="field-help">문구의 말투가 이 분위기로 맞춰집니다.</p>
        <ChipGroup
          options={TONES.map((t) => t.label)}
          value={TONES.find((t) => t.id === value.tone)?.label}
          onSelect={(label) => onChange({ ...value, tone: TONES.find((t) => t.label === label).id })}
        />
      </div>

      <button className="btn-primary" onClick={onSubmit} disabled={!ready} type="button">
        {ready ? `✨ ${submitLabel}` : '먼저 상품 이름을 적어주세요'}
      </button>
      {ready && filled === 0 && (
        <p className="form-hint">
          지금 눌러도 결과가 나와요. 위 칸을 하나라도 채우면 문구가 훨씬 좋아집니다.
        </p>
      )}
      {error && <div className="form-error">{error}</div>}
    </div>
  );
}
