type Props = {
  caption: string;
  onChange: (value: string) => void;
  maxChars: number;
};

export default function PostCaption({
  caption,
  onChange,
  maxChars,
}: Props) {
  const remaining = maxChars - caption.length;
  const warning = remaining <= 50;

  return (
    <>
      <textarea
        value={caption}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxChars}
        placeholder="Share your adventure..."
        className="w-full resize-none bg-transparent border-b border-[var(--color-gray-200)]
                   text-sm text-[var(--color-gray-900)] placeholder:text-[var(--color-gray-400)]
                   outline-none pb-4 focus:border-[var(--color-primary-500)]"
        rows={4}
      />

      <div
        className={`text-right text-xs mt-1 ${
          warning ? "text-red-500" : "text-[var(--color-gray-400)]"
        }`}
      >
        {caption.length}/{maxChars}
      </div>
    </>
  );
}
