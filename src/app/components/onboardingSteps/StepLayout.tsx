export function StepLayout({ children }: React.PropsWithChildren) {
  return (
    <form className="w-full flex flex-col gap-8">
      <div className="w-full h-[250px] flex flex-col gap-6">{children}</div>

      <footer className="w-full flex items-center gap-3"></footer>
    </form>
  );
}
