import { notFound } from "next/navigation";
import { savePage } from "@/app/admin/actions";
import { FieldsForm } from "@/components/admin/FieldsForm";
import { AdminHeader } from "@/components/admin/ui";
import { requireStaff } from "@/lib/admin/auth";
import { pageDef } from "@/lib/pages";
import { createSessionClient } from "@/lib/supabase/server";

export default async function EditPage({ params }: { params: Promise<{ slug: string }> }) {
  const [{ slug }] = await Promise.all([params, requireStaff()]);
  const def = pageDef(slug);
  if (!def) notFound();
  const db = await createSessionClient();
  const { data } = await db.from("pages").select("body, image").eq("slug", slug).maybeSingle();
  return (
    <>
      <AdminHeader title={def.title} intro={`${def.group} page`} back={{ href: "/admin/pages", label: "Page text" }} />
      <div className="max-w-4xl">
        <FieldsForm
          fields={[
            { name: "body", label: "Text", type: "richtext" },
            { name: "image", label: "Photo beside the text (optional)", type: "image" },
          ]}
          values={{ body: data?.body ?? def.body, image: data?.image ?? "" }}
          action={savePage.bind(null, slug)}
          submit="Save page"
          cancel="/admin/pages"
        />
      </div>
    </>
  );
}
