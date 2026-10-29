import { inputClass } from "./ui";

interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}

export function SearchInput({ value, onChange, placeholder }: Props) {
  return (
    <input
      type="search"
      className={`${inputClass} min-w-60 border border-[#8B9A6E]`}
      value={value}
      placeholder={placeholder}
      aria-label={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
