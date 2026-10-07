"use client";

export default function AdminError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="max-w-xl border-l-4 border-red-600 bg-white p-6 shadow-sm">
      <h1 className="text-[20px] font-bold">That didn&apos;t work</h1>
      <p className="mt-2 text-[14.5px]">{error.message || "Something went wrong. Please try again."}</p>
      <button onClick={reset} className="btn mt-4">Try again</button>
    </div>
  );
}
