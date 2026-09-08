// 이모지 대신 쓰는 선 아이콘. 얇은 선으로 통일해 고급스러운 인상을 준다.
const PATHS = {
  tag: (
    <>
      <path d="M3.6 11.4 11.4 3.6a2 2 0 0 1 1.4-.6H19a2 2 0 0 1 2 2v6.2a2 2 0 0 1-.6 1.4l-7.8 7.8a2 2 0 0 1-2.8 0l-6.2-6.2a2 2 0 0 1 0-2.8Z" />
      <circle cx="16.3" cy="7.7" r="1.4" />
    </>
  ),
  document: (
    <>
      <path d="M6 3h8l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v5h5" />
      <path d="M8.5 13h7M8.5 16.5h7M8.5 9.5h2.5" />
    </>
  ),
  camera: (
    <>
      <rect x="3" y="6.5" width="18" height="14" rx="3" />
      <circle cx="12" cy="13.5" r="4" />
      <path d="M8.5 6.5 9.8 4h4.4l1.3 2.5" />
    </>
  ),
  film: (
    <>
      <rect x="4.5" y="3" width="15" height="18" rx="3.5" />
      <path d="M10.3 8.9v6.2l5.2-3.1z" />
    </>
  ),
  coin: (
    <>
      <rect x="4.5" y="2.5" width="15" height="19" rx="3" />
      <rect x="7.8" y="5.8" width="8.4" height="3.4" rx="1" />
      <path d="M8.4 13h.01M12 13h.01M15.6 13h.01M8.4 16.6h.01M12 16.6h.01M15.6 16.6h.01" strokeWidth="2" />
    </>
  ),
  copy: (
    <>
      <rect x="8.5" y="8.5" width="12" height="12" rx="2.5" />
      <path d="M15.5 5.5H6a2.5 2.5 0 0 0-2.5 2.5v9.5" />
    </>
  ),
  refresh: (
    <>
      <path d="M20 12a8 8 0 1 1-2.6-5.9" />
      <path d="M20.5 4v4.5H16" />
    </>
  ),
  check: <path d="M4.5 12.5 9.5 17.5 19.5 6.5" />,
  arrow: <path d="M9 5.5 15.5 12 9 18.5" />,
  spark: (
    <>
      <path d="M12 3.5 13.7 9 19 10.8 13.7 12.6 12 18.1 10.3 12.6 5 10.8 10.3 9Z" />
      <path d="M18.5 16.5 19.2 18.6 21.3 19.3 19.2 20 18.5 22.1 17.8 20 15.7 19.3 17.8 18.6Z" />
    </>
  ),
  book: (
    <>
      <path d="M4 5.2A1.7 1.7 0 0 1 5.7 3.5H11a2 2 0 0 1 2 2v14a1.6 1.6 0 0 0-1.6-1.6H5.7A1.7 1.7 0 0 1 4 16.2Z" />
      <path d="M20 5.2a1.7 1.7 0 0 0-1.7-1.7H15a2 2 0 0 0-2 2v14a1.6 1.6 0 0 1 1.6-1.6h3.7a1.7 1.7 0 0 0 1.7-1.7Z" />
    </>
  ),
  quote: (
    <>
      <path d="M9.5 5.5C6.5 7 5 9.5 5 13v5.5h6V12H8c0-2.2.8-3.8 2.5-4.8Z" />
      <path d="M18 5.5c-3 1.5-4.5 4-4.5 7.5v5.5h6V12h-3c0-2.2.8-3.8 2.5-4.8Z" />
    </>
  ),
};

export default function Icon({ name, size = 20, className = '', strokeWidth = 1.4 }) {
  const path = PATHS[name];
  if (!path) return null;
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {path}
    </svg>
  );
}
