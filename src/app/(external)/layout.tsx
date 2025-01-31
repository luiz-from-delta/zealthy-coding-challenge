export default function ExternalLayout({ children }: React.PropsWithChildren) {
  return (
    <section className="w-full h-full bg-light-lime pt-10 px-8 flex justify-center overflow-y-auto">
      <div className="w-full max-w-[1100px] h-min bg-white rounded-lg flex flex-col gap-[5.625rem] p-16 drop-shadow-default">
        {children}
      </div>
    </section>
  );
}
