// Creates (or promotes) the first administrator account.
//   npm run create-admin -- principal@school.in "a-strong-password" "Sister Cynthia"
import { adminClient } from "./supabase-admin";

const [email, password, name = ""] = process.argv.slice(2);
if (!email || !password || password.length < 8) {
  console.error('Usage: npm run create-admin -- <email> <password (8+ characters)> ["Name"]');
  process.exit(1);
}

const db = adminClient();

async function main() {
  let id: string | undefined;
  const { data, error } = await db.auth.admin.createUser({ email, password, email_confirm: true, user_metadata: { name } });
  if (data.user) id = data.user.id;
  else if (/already/i.test(error?.message ?? "")) {
    // The login exists: find it and make sure it is an administrator.
    for (let page = 1; !id; page++) {
      const { data: list, error: e } = await db.auth.admin.listUsers({ page, perPage: 1000 });
      if (e) throw e;
      id = list.users.find((u) => u.email?.toLowerCase() === email.toLowerCase())?.id;
      if (list.users.length < 1000) break;
    }
    if (id) await db.auth.admin.updateUserById(id, { password });
  } else if (error) throw error;
  if (!id) throw new Error("Could not create or find the user.");
  const { error: e2 } = await db.from("profiles").upsert({ id, email, name, role: "super_admin" });
  if (e2) throw e2;
  console.log(`✓ ${email} is an administrator. Sign in at /admin/login.`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
