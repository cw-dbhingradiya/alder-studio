interface SectionHeaderProps {
  label: string;
  labelJp?: string;
  number: string;
  category: string;
}

export default function SectionHeader({
  label,
  labelJp,
  number,
  category,
}: SectionHeaderProps) {
  return (
    <div className="mb-16 flex flex-col gap-1 text-[11px] tracking-widest text-neutral-600 uppercase">
      <span>
        © {label}
        {labelJp && <span className="ml-1 normal-case">{labelJp}</span>}
      </span>
      <span>(Alder® — {number})</span>
      <span>{category}</span>
    </div>
  );
}
