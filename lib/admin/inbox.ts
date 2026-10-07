// The three inbox tables and how to show each.
export const BOXES = {
  enquiries: { table: "enquiries", label: "Enquiries & feedback", columns: ["created_at", "kind", "name", "phone", "email", "subject", "message", "meta", "status", "notes"] },
  alumni: { table: "alumni_registrations", label: "Alumni registrations", columns: ["created_at", "name", "batch", "email", "phone", "occupation", "city", "message", "status", "notes"] },
  applications: { table: "job_applications", label: "Job applications", columns: ["created_at", "post", "name", "email", "phone", "qualification", "experience", "message", "resume_path", "status", "notes"] },
} as const;
export type Box = keyof typeof BOXES;
export const isBox = (b: string | undefined): b is Box => !!b && b in BOXES;
