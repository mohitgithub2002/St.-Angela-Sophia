import type { Metadata } from "next";
import { submitAlumni } from "@/app/actions/forms";
import { ActionForm } from "@/components/forms/ActionForm";
import { Input, Row, Textarea } from "@/components/forms/fields";
import { PageShell } from "@/components/page/PageShell";

export const metadata: Metadata = { title: "Alumni Registration" };

export default function AlumniRegister() {
  return (
    <PageShell section="alumni" href="/alumni/register" intro="Once an Angelite, always an Angelite. Register or update your details to hear about reunions and events.">
      <div className="max-w-3xl">
        <ActionForm action={submitAlumni} submit="Register">
          <Row>
            <Input label="Full name (and maiden name, if different)" name="name" autoComplete="name" required />
            <Input label="Year of passing out" name="batch" inputMode="numeric" pattern="(19|20)\d{2}" placeholder="e.g. 2005" required />
            <Input label="Email" name="email" type="email" autoComplete="email" required />
            <Input label="Mobile number" name="phone" type="tel" inputMode="tel" autoComplete="tel" />
            <Input label="Occupation / organisation" name="occupation" />
            <Input label="City" name="city" autoComplete="address-level2" />
          </Row>
          <Textarea label="A message or memory for the school" name="message" />
        </ActionForm>
      </div>
    </PageShell>
  );
}
