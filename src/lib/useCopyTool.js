import { useCallback, useRef, useState } from 'react';
import { emptyForm } from './formState.js';
import { splitList } from './korean.js';

const toInput = (form, nonce) => ({
  product: form.product,
  category: form.category,
  features: splitList(form.featuresRaw).slice(0, 3),
  target: form.target,
  price: form.price,
  keywords: form.keywords,
  tone: form.tone,
  nonce,
});

// 도구 4개(상품명·상세페이지·인스타·쇼츠)가 공유하는 상태 관리.
export default function useCopyTool(generate) {
  const [form, setForm] = useState(emptyForm);
  const [result, setResult] = useState(null);
  const nonce = useRef(0);
  const resultRef = useRef(null);

  const run = useCallback(
    (again = false) => {
      if (!form.product.trim()) return;
      nonce.current = again ? nonce.current + 1 : 0;
      setResult(generate(toInput(form, nonce.current)));
      // 결과가 그려진 뒤 부드럽게 내려준다.
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
    },
    [form, generate],
  );

  return { form, setForm, result, run, resultRef };
}
