export default function ToolHead({ emoji, title, desc }) {
  return (
    <div className="tool-head">
      <span className="emoji-lg">{emoji}</span>
      <h2>{title}</h2>
      <p>{desc}</p>
    </div>
  );
}
