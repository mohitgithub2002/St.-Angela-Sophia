import { submitEnquiry } from "@/app/actions/forms";
import { ActionForm } from "./forms/ActionForm";
import { Input, Row, Select, Textarea } from "./forms/fields";

// Admission and general enquiries. Saved to Admin › Inbox.
export function EnquiryForm({ email }: { email: string }) {
  return (
    <ActionForm action={submitEnquiry} title="Send an enquiry" intro={`We usually reply within two working days. You can also write to ${email}.`} submit="Send enquiry">
      <input type="hidden" name="kind" value="admission" />
      <Row>
        <Input label="Parent's name" name="name" autoComplete="name" required />
        <Input label="Mobile number" name="phone" type="tel" inputMode="tel" autoComplete="tel" required pattern="[0-9+\s\-]{8,15}" />
        <Input label="Email" name="email" type="email" autoComplete="email" />
        <Input label="Daughter's name" name="child" />
      </Row>
      <Select label="Class you're interested in" name="cls" options={[["", "General enquiry"], "Nursery", "LKG", "HKG", "Class I", "Class II–X (transfer)", "Class XI"]} />
      <Textarea label="Your question" name="message" placeholder="For example: I'd like to visit on a Saturday morning." />
    </ActionForm>
  );
}
