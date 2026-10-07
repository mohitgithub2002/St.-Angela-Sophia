"use server";
import { z } from "zod";
import { getSettings } from "@/lib/content";
import { hasSupabase } from "@/lib/supabase/env";
import { createPublicClient, createServiceClient } from "@/lib/supabase/server";

// Server Actions behind the public forms. Each saves to an inbox table that staff read in Admin › Inbox.

export type FormState = { ok: boolean; message: string } | null;

const phone = z.string().trim().regex(/^[0-9+\s-]{8,15}$/, "Add a phone number with at least 8 digits.");
const email = z.string().trim().email("Add a valid email address.");
const optionalEmail = z.union([z.literal(""), email]);
const text = (max: number) => z.string().trim().max(max);
const name = z.string().trim().min(2, "Add your name.").max(120);

const fields = (fd: FormData) => Object.fromEntries([...fd.entries()].filter(([, v]) => typeof v === "string")) as Record<string, string>;

async function notConnected(): Promise<FormState> {
  const s = await getSettings();
  return { ok: false, message: `Online forms are not connected yet. Please call ${s.phone} or email ${s.email}.` };
}

const firstError = (e: z.ZodError) => e.issues[0]?.message ?? "Please check the form.";

// Bots fill in the hidden "website" field; pretend to succeed so they move on.
const isBot = (fd: FormData) => String(fd.get("website") ?? "") !== "";

async function save(table: string, row: Record<string, unknown>, success: string): Promise<FormState> {
  const { error } = await createPublicClient().from(table).insert(row);
  if (error) {
    console.error(`[forms] ${table}: ${error.message}`);
    return { ok: false, message: "Sorry, we couldn't send that. Please try again or call the school office." };
  }
  return { ok: true, message: success };
}

const enquirySchema = z.object({
  kind: z.enum(["contact", "admission"]).catch("contact"),
  name,
  phone,
  email: optionalEmail.optional().default(""),
  subject: text(150).optional().default(""),
  child: text(120).optional().default(""),
  cls: text(60).optional().default(""),
  message: text(3000).optional().default(""),
});

export async function submitEnquiry(_: FormState, fd: FormData): Promise<FormState> {
  if (isBot(fd)) return { ok: true, message: "Thank you. We'll be in touch soon." };
  const p = enquirySchema.safeParse(fields(fd));
  if (!p.success) return { ok: false, message: firstError(p.error) };
  if (!hasSupabase) return notConnected();
  const v = p.data;
  return save(
    "enquiries",
    {
      kind: v.cls ? "admission" : v.kind,
      name: v.name,
      phone: v.phone,
      email: v.email,
      subject: v.subject || (v.cls ? `Admission enquiry: ${v.cls}` : "General enquiry"),
      message: v.message,
      meta: v.child || v.cls ? { daughter: v.child, class: v.cls } : {},
    },
    "Thank you. Your enquiry has reached the school office and we usually reply within two working days.",
  );
}

const feedbackSchema = z.object({
  name,
  phone,
  email: optionalEmail.optional().default(""),
  student: text(120).optional().default(""),
  cls: text(40).optional().default(""),
  subject: text(150).optional().default(""),
  message: z.string().trim().min(5, "Write your feedback or question.").max(3000),
});

export async function submitFeedback(_: FormState, fd: FormData): Promise<FormState> {
  if (isBot(fd)) return { ok: true, message: "Thank you for your feedback." };
  const p = feedbackSchema.safeParse(fields(fd));
  if (!p.success) return { ok: false, message: firstError(p.error) };
  if (!hasSupabase) return notConnected();
  const v = p.data;
  return save(
    "enquiries",
    { kind: "feedback", name: v.name, phone: v.phone, email: v.email, subject: v.subject || "Parent feedback", message: v.message, meta: { student: v.student, class: v.cls } },
    "Thank you for your feedback. The school office will get back to you if a reply is needed.",
  );
}

const alumniSchema = z.object({
  name,
  batch: z.string().trim().regex(/^(19|20)\d{2}$/, "Add the year you passed out, for example 2005."),
  email,
  phone: z.union([z.literal(""), phone]).optional().default(""),
  occupation: text(150).optional().default(""),
  city: text(80).optional().default(""),
  message: text(2000).optional().default(""),
});

export async function submitAlumni(_: FormState, fd: FormData): Promise<FormState> {
  if (isBot(fd)) return { ok: true, message: "Welcome back!" };
  const p = alumniSchema.safeParse(fields(fd));
  if (!p.success) return { ok: false, message: firstError(p.error) };
  if (!hasSupabase) return notConnected();
  return save("alumni_registrations", p.data, "Welcome back, Angelite! We'll keep you posted about reunions and events.");
}

const jobSchema = z.object({
  vacancy_id: z.union([z.literal(""), z.string().uuid()]).optional().default(""),
  post: z.string().trim().min(2, "Choose or type the post you're applying for.").max(150),
  name,
  email,
  phone,
  qualification: z.string().trim().min(2, "Add your qualifications.").max(500),
  experience: text(500).optional().default(""),
  message: text(3000).optional().default(""),
});

const RESUME_TYPES: Record<string, string> = {
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
};

export async function submitApplication(_: FormState, fd: FormData): Promise<FormState> {
  if (isBot(fd)) return { ok: true, message: "Thank you for applying." };
  const p = jobSchema.safeParse(fields(fd));
  if (!p.success) return { ok: false, message: firstError(p.error) };
  const file = fd.get("resume");
  if (!(file instanceof File) || file.size === 0) return { ok: false, message: "Attach your résumé." };
  const ext = RESUME_TYPES[file.type];
  if (!ext) return { ok: false, message: "Your résumé must be a PDF or Word file." };
  if (file.size > 5 * 1024 * 1024) return { ok: false, message: "Your résumé must be smaller than 5 MB." };
  if (!hasSupabase) return notConnected();

  // Résumés go to the private bucket, which only staff can read. Visitors can't write to storage directly,
  // so the upload uses the service-role client after the checks above.
  const service = createServiceClient();
  if (!service) return notConnected();
  const path = `resumes/${new Date().toISOString().slice(0, 7)}/${crypto.randomUUID()}.${ext}`;
  const { error: upErr } = await service.storage.from("private").upload(path, file, { contentType: file.type });
  if (upErr) {
    console.error(`[forms] resume upload: ${upErr.message}`);
    return { ok: false, message: "Sorry, we couldn't upload your résumé. Please try again." };
  }
  const v = p.data;
  const res = await save("job_applications", { ...v, vacancy_id: v.vacancy_id || null, resume_path: path }, "Thank you for applying. We'll contact you if you're shortlisted.");
  if (!res?.ok) await service.storage.from("private").remove([path]);
  return res;
}
