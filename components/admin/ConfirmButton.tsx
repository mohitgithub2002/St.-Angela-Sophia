"use client";

// A submit button that asks before doing something that can't be undone.
export function ConfirmButton({ message, children, className = "" }: { message: string; children: React.ReactNode; className?: string }) {
  return (
    <button type="submit" onClick={(e) => { if (!window.confirm(message)) e.preventDefault(); }} className={className}>
      {children}
    </button>
  );
}
