import { forwardRef, type InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(({ label, error, id, className = "", ...rest }, ref) => {
  const inputId = id || rest.name;
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <input
        id={inputId}
        ref={ref}
        className={`block w-full rounded-lg border bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition ${
          error ? "border-destructive" : "border-border focus:border-primary"
        } ${className}`}
        {...rest}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
});
Input.displayName = "Input";
