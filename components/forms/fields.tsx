// Plain form fields shared by the public forms.
export const fieldCls = "w-full border border-lichen bg-white px-4 py-3 text-[15px] text-forest focus:border-moss focus:outline-none focus:ring-3 focus:ring-lichen/50";
const labelCls = "mt-4 flex flex-col gap-1.5 text-[14px] font-medium";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { label: string; name: string };

export function Input({ label, ...props }: InputProps) {
  return (
    <label className={labelCls}>
      <span>{label}{props.required && <span className="text-red-700" aria-hidden="true"> *</span>}</span>
      <input {...props} className={fieldCls} />
    </label>
  );
}

export function Textarea({ label, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; name: string }) {
  return (
    <label className={labelCls}>
      <span>{label}{props.required && <span className="text-red-700" aria-hidden="true"> *</span>}</span>
      <textarea rows={4} {...props} className={fieldCls} />
    </label>
  );
}

export function Select({ label, options, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; name: string; options: (string | [string, string])[] }) {
  return (
    <label className={labelCls}>
      <span>{label}{props.required && <span className="text-red-700" aria-hidden="true"> *</span>}</span>
      <select {...props} className={fieldCls}>
        {options.map((o) => {
          const [value, text] = Array.isArray(o) ? o : [o, o];
          return <option key={value} value={value}>{text}</option>;
        })}
      </select>
    </label>
  );
}

export const Row = ({ children }: { children: React.ReactNode }) => <div className="grid gap-x-3.5 sm:grid-cols-2">{children}</div>;
