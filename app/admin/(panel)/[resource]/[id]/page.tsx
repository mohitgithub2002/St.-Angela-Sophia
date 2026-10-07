import { notFound } from "next/navigation";
import { saveRow } from "@/app/admin/actions";
import { FieldsForm } from "@/components/admin/FieldsForm";
import { PhotoManager } from "@/components/admin/PhotoManager";
import { AdminHeader } from "@/components/admin/ui";
import { requireStaff } from "@/lib/admin/auth";
import { getResource } from "@/lib/admin/resources";
import { createSessionClient } from "@/lib/supabase/server";

export default async function ResourceEdit({ params, searchParams }: { params: Promise<{ resource: string; id: string }>; searchParams: Promise<Record<string, string | undefined>> }) {
  const [{ resource, id }, sp] = await Promise.all([params, searchParams]);
  const res = getResource(resource);
  if (!res) notFound();
  await requireStaff();
  const db = await createSessionClient();
  const isNew = id === "new";

  let values: Record<string, unknown> = { ...res.defaults };
  if (res.filter && sp[res.filter.field]) values[res.filter.field] = sp[res.filter.field];
  if (!isNew) {
    const { data } = await db.from(res.table).select("*").eq("id", id).maybeSingle();
    if (!data) notFound();
    values = data;
  }
  const filterValue = res.filter ? values[res.filter.field] : undefined;
  const back = `/admin/${res.key}${res.filter && filterValue ? `?${res.filter.field}=${encodeURIComponent(String(filterValue))}` : ""}`;

  const photos = res.table === "gallery_albums" && !isNew
    ? (await db.from("gallery_photos").select("id, image, caption, sort").eq("album_id", id).order("sort")).data ?? []
    : null;

  return (
    <>
      <AdminHeader title={isNew ? `Add ${res.singular}` : `Edit ${res.singular}`} back={{ href: back, label: res.label }} />
      <div className="max-w-4xl">
        <FieldsForm fields={res.fields} values={values} action={saveRow.bind(null, res.key, isNew ? null : id)} submit={isNew ? `Add ${res.singular}` : "Save changes"} cancel={back} back={back} />
        {photos && (
          <section className="mt-10">
            <h2 className="mb-1 text-[20px] font-bold">Photos in this album</h2>
            <p className="mb-4 text-[14px] text-moss">Select several photos at once to upload them together. Changes to photos are saved immediately.</p>
            <PhotoManager albumId={id} photos={photos} cover={String(values.cover ?? "")} />
          </section>
        )}
      </div>
    </>
  );
}
