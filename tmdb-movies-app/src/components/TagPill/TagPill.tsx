type TagPillProps = {
  label: string;
};

export default function TagPill({ label }: TagPillProps) {
  return (
    <span className="inline-block bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-md">
      {label}
    </span>
  );
}
