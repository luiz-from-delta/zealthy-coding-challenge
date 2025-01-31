import { ErrorWrapperProps } from "./ErrorWrapper.types";

export function ErrorWrapper({ children, error }: ErrorWrapperProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      {children}
      {error && <span className="text-sm font-bold text-error">{error}</span>}
    </div>
  );
}
