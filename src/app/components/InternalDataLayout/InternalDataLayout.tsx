import { InternalDataLayoutProps } from "./InternalDataLayout.types";

export function InternalDataLayout({
  children,
  description,
  title,
}: InternalDataLayoutProps) {
  return (
    <section className="w-full flex flex-col gap-14">
      <div className="flex flex-col gap-4">
        <h1 className="text-[42px] font-black text-primary-green">{title}</h1>
        <p className="w-full max-w-[400px] text-paragraph text-description">
          {description}
        </p>
      </div>
      {children}
    </section>
  );
}
