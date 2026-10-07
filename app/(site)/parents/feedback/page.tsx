import type { Metadata } from "next";
import { submitFeedback } from "@/app/actions/forms";
import { ActionForm } from "@/components/forms/ActionForm";
import { Input, Row, Select, Textarea } from "@/components/forms/fields";
import { PageShell } from "@/components/page/PageShell";

export const metadata: Metadata = { title: "Feedback & Queries" };

const classes = ["", "Nursery", "LKG", "HKG", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

export default function Feedback() {
  return (
    <PageShell section="parents" href="/parents/feedback" intro="We value your feedback. Share a suggestion, a concern or a question and the school office will respond.">
      <div className="max-w-3xl">
        <ActionForm action={submitFeedback} submit="Send feedback">
          <Row>
            <Input label="Parent's name" name="name" autoComplete="name" required />
            <Input label="Mobile number" name="phone" type="tel" inputMode="tel" autoComplete="tel" required pattern="[0-9+\s\-]{8,15}" />
            <Input label="Email" name="email" type="email" autoComplete="email" />
            <Input label="Student's name" name="student" />
            <Select label="Class" name="cls" options={classes.map((c) => [c, c ? `Class ${c}` : "Select class"] as [string, string])} />
            <Select label="Topic" name="subject" options={["General feedback", "Academics", "Transport", "Fees", "Facilities", "Other query"]} />
          </Row>
          <Textarea label="Your feedback or question" name="message" required minLength={5} rows={5} />
        </ActionForm>
      </div>
    </PageShell>
  );
}
