import Icon from './Icon.jsx';

export default function ToolHead({ icon, title, desc, steps }) {
  return (
    <div className="tool-head">
      <span className="tool-mark">
        <Icon name={icon} size={22} />
      </span>
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
