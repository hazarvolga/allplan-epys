export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      {diagonal ? (
        <path d="M5 19 19 5M5 5h14v14" />
      ) : (
        <path d="M4 12h16m-6-6 6 6-6 6" />
      )}
    </svg>
  );
}
export function Mark() {
  return (
    <svg
      width="30"
      height="34"
      viewBox="0 0 30 34"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 31 15 3l13 28M7 21h16M10 31l5-11 5 11"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
