import type { Metadata } from "next";
import { saveContent } from "@/app/admin/actions";
import { FieldsForm } from "@/components/admin/FieldsForm";
import { AdminHeader, Notice } from "@/components/admin/ui";
import { requireStaff } from "@/lib/admin/auth";
import { SETTINGS_FIELDS } from "@/lib/admin/content-fields";
import { defaultSettings } from "@/lib/data";
import { createSessionClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "School details" };

export default async function Settings({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const [{ saved }] = await Promise.all([searchParams, requireStaff()]);
  const db = await createSessionClient();
  const { data } = await db.from("site_content").select("value").eq("key", "settings").maybeSingle();
  return (
    <>
      {saved && <Notice>Saved. The website has been updated.</Notice>}
      <AdminHeader title="School details" intro="Name, CBSE affiliation, principal, contact details and important links. These appear in the header, footer, Contact page and the Mandatory Public Disclosure." />
      <div className="max-w-4xl">
        <FieldsForm groups={SETTINGS_FIELDS} values={{ ...defaultSettings, ...(data?.value ?? {}) }} action={saveContent.bind(null, "settings")} submit="Save details" />
      </div>
    </>
  );
}
