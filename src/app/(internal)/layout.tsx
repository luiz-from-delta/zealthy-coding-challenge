export default function InternalLayout({ children }: React.PropsWithChildren) {
  return (
    <section className="w-full h-full bg-white pt-10 px-8 flex justify-center overflow-y-auto">
      <div className="w-full max-w-[1100px] h-min">{children}</div>
    </section>
  );
}
