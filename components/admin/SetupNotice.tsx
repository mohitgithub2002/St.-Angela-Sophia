// Shown in /admin until Supabase is connected.
export function SetupNotice() {
  return (
    <div className="mx-auto max-w-2xl bg-white p-8 shadow-sm ring-1 ring-lichen/60">
      <h1 className="text-[24px] font-bold">Connect the database to use the admin panel</h1>
      <p className="mt-3">The website is showing its built-in default content. To edit it from here:</p>
      <ol className="rich mt-3">
        <li>Create a free project at <a href="https://supabase.com" target="_blank" rel="noopener">supabase.com</a>.</li>
        <li>Run the SQL files in <code>supabase/migrations</code> in the project&apos;s SQL editor, in order.</li>
        <li>Add <code>NEXT_PUBLIC_SUPABASE_URL</code>, <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> and <code>SUPABASE_SERVICE_ROLE_KEY</code> to the hosting environment (Vercel › Settings › Environment Variables) and redeploy.</li>
        <li>Run <code>npm run seed</code> once to copy the current content into the database, and create the first staff account.</li>
      </ol>
      <p className="mt-3">The README has step-by-step instructions.</p>
    </div>
  );
}
