import type { Metadata } from "next";
import { submitApplication } from "@/app/actions/forms";
import { ActionForm } from "@/components/forms/ActionForm";
import { Input, Row, Select, Textarea } from "@/components/forms/fields";
import { PageShell } from "@/components/page/PageShell";
import { getVacancies } from "@/lib/content";

export const metadata: Metadata = { title: "Apply Online" };

export default async function Apply({ searchParams }: { searchParams: Promise<{ post?: string }> }) {
  const [{ post }, vacancies] = await Promise.all([searchParams, getVacancies()]);
  const chosen = vacancies.find((v) => v.id === post);
  return (
    <PageShell section="careers" href="/careers/apply" title="Apply Online" intro="Fill in your details and attach your résumé. Shortlisted candidates will be contacted by phone or email.">
      <div className="max-w-3xl">
        <ActionForm action={submitApplication} submit="Submit application">
          {vacancies.length > 0 ? (
            <>
              <Select label="Vacancy" name="vacancy_id" defaultValue={chosen?.id ?? ""} options={[["", "Other / future openings"], ...vacancies.map((v) => [v.id, v.post] as [string, string])]} />
              <Input label="Post applied for" name="post" required defaultValue={chosen?.post ?? ""} placeholder="e.g. PGT Chemistry" />
            </>
          ) : (
            <Input label="Post applied for" name="post" required placeholder="e.g. PGT Chemistry" />
          )}
          <Row>
            <Input label="Full name" name="name" autoComplete="name" required />
            <Input label="Email" name="email" type="email" autoComplete="email" required />
            <Input label="Mobile number" name="phone" type="tel" inputMode="tel" autoComplete="tel" required pattern="[0-9+\s\-]{8,15}" />
            <Input label="Total teaching experience" name="experience" placeholder="e.g. 5 years" />
          </Row>
          <Textarea label="Qualifications" name="qualification" required rows={3} placeholder="Degrees, B.Ed., CTET/STET, etc." />
          <Textarea label="Cover note" name="message" rows={4} />
          <Input label="Résumé (PDF or Word, up to 5 MB)" name="resume" type="file" required accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" />
        </ActionForm>
      </div>
    </PageShell>
  );
}
