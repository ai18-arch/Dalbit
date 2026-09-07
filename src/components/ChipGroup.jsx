// 눌러서 고르는 칩 목록. 직접 입력 대신 쓸 수 있게 만든 보조 입력이다.
export default function ChipGroup({ options, value, onSelect, multi }) {
  const isOn = (opt) => (multi ? value?.includes(opt) : value === opt);
  return (
    <div className="chips">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          className={`chip ${isOn(opt) ? 'on' : ''}`}
          onClick={() => onSelect(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
