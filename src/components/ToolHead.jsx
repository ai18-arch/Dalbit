export default function ToolHead({ emoji, title, desc, steps }) {
  return (
    <div className="tool-head">
      <span className="emoji-lg">{emoji}</span>
      <h2>{title}</h2>
      <p>{desc}</p>
      {steps?.length > 0 && (
        <ol className="steps">
          {steps.map((s, i) => (
            <li key={s}>
              <span className="n">{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
