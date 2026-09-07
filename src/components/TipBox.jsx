export default function TipBox({ title = '이렇게 쓰면 더 좋아요', items }) {
  if (!items?.length) return null;
  return (
    <div className="tips fade-in">
      <h4>📖 {title}</h4>
      <ul>
        {items.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
