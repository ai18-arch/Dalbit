import { useCallback, useRef, useState } from 'react';
import { emptyForm, sampleForm } from './formState.js';
import { splitList } from './korean.js';

const toInput = (form, nonce) => ({
  product: form.product,
  category: form.category,
  features: splitList(form.featuresRaw).slice(0, 3),
  benefit: form.benefit,
  target: form.target,
  price: form.price,
  priceBand: form.priceBand,
  keywords: form.keywords,
  tone: form.tone,
  duration: form.duration,
  nonce,
});

// 도구 4개(상품명·상세페이지·인스타·쇼츠)가 공유하는 상태 관리.
export default function useCopyTool(generate) {
  const [form, setForm] = useState(emptyForm);
  const [result, setResult] = useState(null);
  const nonce = useRef(0);
  const resultRef = useRef(null);

  const scrollToResult = () =>
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);

  const run = useCallback(
    (again = false) => {
      if (!form.product.trim()) return;
      nonce.current = again ? nonce.current + 1 : 0;
      setResult(generate(toInput(form, nonce.current)));
      scrollToResult();
    },
    [form, generate],
  );

  // 예시 값을 채워 넣고 결과까지 바로 보여준다. (처음 오신 분들이 감을 잡기 쉽게)
  const fillSample = useCallback(() => {
    setForm(sampleForm);
    nonce.current = 0;
    setResult(generate(toInput(sampleForm, 0)));
    scrollToResult();
  }, [generate]);

  return { form, setForm, result, run, fillSample, resultRef };
}
