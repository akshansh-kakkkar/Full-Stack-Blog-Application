
export default function layout({
  herosection,
  children,
}: {
  herosection: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col">
      {herosection}
      {children}
    </div>
  );
}
