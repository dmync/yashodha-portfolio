export default function BentoGrid({ children, label }) {
  return (
    <div
      role="list"
      aria-label={label}
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:auto-rows-[minmax(220px,auto)] lg:grid-cols-4"
    >
      {children}
    </div>
  );
}
