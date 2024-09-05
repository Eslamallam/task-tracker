interface GProps {
  children: React.ReactNode;
}

export default function GlobalStylesProvider({ children }: GProps) {
  return <div className="flex gap-5 p-6 h-full">{children}</div>;
}
