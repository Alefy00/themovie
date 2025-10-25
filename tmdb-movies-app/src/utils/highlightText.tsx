
export function highlightTextWithBadge(text: string, term: string) {
  if (!term.trim()) return text;

  const regex = new RegExp(`(${term})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, i) => {
    if (part.toLowerCase() === term.toLowerCase()) {
      return (
        <span
          key={i}
          className="inline-block bg-yellow-400 text-black text-[11px] font-semibold px-1.5 py-[2px] rounded-[3px] leading-none mr-1"
        >
          {part}
        </span>
      );
    }
    return (
      <span key={i} className="inline-block mr-1">
        {part}
      </span>
    );
  });
}
