import { useMemo, useState } from 'react';
import ChipGroup from '../components/ChipGroup.jsx';
import ToolHead from '../components/ToolHead.jsx';
import TipBox from '../components/TipBox.jsx';
import { calcMargin } from '../lib/generators.js';
import { won } from '../lib/korean.js';

const FEE_PRESETS = [
  { label: '스마트스토어 (5.85%)', rate: '5.85' },
  { label: '쿠팡 (10.8%)', rate: '10.8' },
  { label: '11번가 (13%)', rate: '13' },
  { label: '내 쇼핑몰 (3.5%)', rate: '3.5' },
  { label: '수수료 없음', rate: '0' },
];

// 숫자만 남기고 천 단위 쉼표를 넣어준다.
const comma = (v) => {
  const digits = String(v).replace(/[^0-9]/g, '');
  return digits ? Number(digits).toLocaleString('ko-KR') : '';
};

function MoneyField({ id, label, hint, value, onChange, placeholder, unit = '원' }) {
  return (
    <div className="field">
      <label htmlFor={id}>
        {label} {hint && <span className="hint">{hint}</span>}
      </label>
      <div className="suffix-input">
        <input
          id={id}
          type="text"
          inputMode="numeric"
          value={value}
          onChange={(e) => onChange(comma(e.target.value))}
          placeholder={placeholder}
        />
        <span className="suffix">{unit}</span>
      </div>
    </div>
  );
}

export default function MarginTool() {
  const [v, setV] = useState({
    price: '',
    cost: '',
    feeRate: '5.85',
    shipping: '',
    packing: '',
    ad: '',
    etc: '',
    monthlyQty: '',
  });
  const [more, setMore] = useState(false);
  const set = (key) => (val) => setV((prev) => ({ ...prev, [key]: val }));

  const r = useMemo(() => calcMargin(v), [v]);
  const hasInput = r.price > 0;

  return (
    <>
      <ToolHead
        emoji="💰"
        title="판매가 / 마진 계산"
        desc="수수료와 배송비까지 넣어서, 한 개 팔면 실제로 얼마가 남는지 바로 계산해 드려요."
      />

      <div className="panel">
        <MoneyField
          id="price"
          label="판매가"
          hint="고객이 내는 금액"
          value={v.price}
          onChange={set('price')}
          placeholder="19,800"
        />
        <MoneyField
          id="cost"
          label="상품 원가"
          hint="사입가 또는 제작비"
          value={v.cost}
          onChange={set('cost')}
          placeholder="8,000"
        />

        <div className="field">
          <label htmlFor="feeRate">
            플랫폼 수수료 <span className="hint">파는 곳을 눌러보세요</span>
          </label>
          <div className="suffix-input" style={{ marginBottom: 8 }}>
            <input
              id="feeRate"
              type="text"
              inputMode="decimal"
              value={v.feeRate}
              onChange={(e) => set('feeRate')(e.target.value.replace(/[^0-9.]/g, ''))}
              placeholder="5.85"
            />
            <span className="suffix">%</span>
          </div>
          <ChipGroup
            options={FEE_PRESETS.map((f) => f.label)}
            value={FEE_PRESETS.find((f) => f.rate === v.feeRate)?.label}
            onSelect={(label) => set('feeRate')(FEE_PRESETS.find((f) => f.label === label).rate)}
          />
        </div>

        <MoneyField
          id="shipping"
          label="내가 부담하는 배송비"
          hint="무료배송이면 택배비를 적어주세요"
          value={v.shipping}
          onChange={set('shipping')}
          placeholder="3,000"
        />

        {more ? (
          <>
            <MoneyField
              id="packing"
              label="포장·부자재"
              hint="박스, 스티커, 완충재 등"
              value={v.packing}
              onChange={set('packing')}
              placeholder="500"
            />
            <MoneyField
              id="ad"
              label="광고비"
              hint="한 개 팔 때 들어가는 금액"
              value={v.ad}
              onChange={set('ad')}
              placeholder="1,000"
            />
            <MoneyField
              id="etc"
              label="기타 비용"
              hint="결제 수수료, 반품 예상분 등"
              value={v.etc}
              onChange={set('etc')}
              placeholder="0"
            />
            <MoneyField
              id="monthlyQty"
              label="한 달 예상 판매 수량"
              hint="개수로 적어주세요"
              value={v.monthlyQty}
              onChange={set('monthlyQty')}
              placeholder="100"
              unit="개"
            />
          </>
        ) : (
          <button className="btn-ghost" type="button" onClick={() => setMore(true)}>
            ＋ 포장비·광고비도 넣어서 정확히 계산하기
          </button>
        )}
      </div>

      {hasInput && (
        <div className="results fade-in">
          <div className="results-head">
            <h3>한 개 팔면 이렇게 남아요</h3>
          </div>

          <div className="panel">
            <div className="calc-summary">
              <div className="stat">
                <div className="k">순이익 (1개당)</div>
                <div className={`v ${r.profit >= 0 ? 'pos' : 'neg'}`}>{won(r.profit)}</div>
              </div>
              <div className="stat">
                <div className="k">마진율</div>
                <div className={`v ${r.marginRate >= 0 ? 'pos' : 'neg'}`}>{r.marginRate.toFixed(1)}%</div>
                <div className="sub">원가 대비 {r.markupRate.toFixed(0)}%</div>
              </div>
              <div className="stat wide">
                <div className="k">손익분기 판매가 · 이 금액 아래로 팔면 손해예요</div>
                <div className="v">{won(r.breakEven)}</div>
              </div>
              {r.monthlyQty > 0 && (
                <div className="stat wide">
                  <div className="k">한 달 {r.monthlyQty.toLocaleString('ko-KR')}개 팔면</div>
                  <div className={`v ${r.monthlyProfit >= 0 ? 'pos' : 'neg'}`}>{won(r.monthlyProfit)}</div>
                </div>
              )}
            </div>

            <div className="breakdown">
              {r.rows.map((row) => (
                <div className="row" key={row.label}>
                  <span>{row.label}</span>
                  <span>
                    {row.value < 0 ? '−' : ''}
                    {won(Math.abs(row.value))}
                  </span>
                </div>
              ))}
              <div className="row total">
                <span>남는 돈</span>
                <span className={r.profit >= 0 ? '' : 'neg'}>{won(r.profit)}</span>
              </div>
            </div>

            <div className="result-note" style={{ borderTop: 'none', marginTop: 14 }}>
              💡 {r.advice}
            </div>
          </div>

          <div className="panel">
            <div className="field" style={{ marginBottom: 10 }}>
              <label>목표 마진율에 맞는 판매가</label>
            </div>
            <div className="suggest-grid">
              {r.suggestions.map((s) => (
                <div className="suggest" key={s.label}>
                  <div className="k">{s.label}</div>
                  <div className="v">{s.value > 0 ? won(s.value) : '계산 불가'}</div>
                </div>
              ))}
            </div>
            <div className="result-note" style={{ borderTop: 'none' }}>
              위 비용을 그대로 두고, 목표 마진율을 맞추려면 받아야 하는 금액이에요.
            </div>
          </div>

          <TipBox
            title="가격 정할 때 기억하세요"
            items={[
              '무료배송으로 팔면 택배비는 내 몫이에요. 배송비 칸에 꼭 넣고 계산하세요.',
              '반품이 100개 중 3개만 생겨도 마진 3%가 사라져요. 기타 비용에 미리 넣어두면 안전해요.',
              '가격은 9,900원, 19,800원처럼 끝자리를 맞추면 더 저렴해 보여요.',
              '마진이 20% 아래면 광고를 돌릴 여유가 없어요. 가격을 올리거나 원가를 줄이는 게 먼저예요.',
            ]}
          />
        </div>
      )}
    </>
  );
}
