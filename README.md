# St. Angela Sophia Sr. Sec. School, Jaipur: website

Built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4 and Supabase
(Postgres database, file storage and staff login).

- **Public site:** every section of the CBSE school website requirements, including the
  **Mandatory Public Disclosure** in the Appendix IX format. CBSE requires this to be linked from a
  prominent icon on the home page; here it's in the top bar, the quick-links band, a side tab on
  every page and the footer.
- **Admin panel at `/admin`:** staff update fees, results, the academic calendar, circulars and
  PDFs, disclosure documents, gallery photos and page text. Changes appear on the live site as
  soon as they are saved, with no redeploy.

Without Supabase configured, the site still builds and shows the built-in default content
from `lib/data.ts` and `lib/pages.ts`. The admin panel then explains how to connect a database.

## Run it

```bash
npm install
cp .env.example .env.local   # fill in the Supabase keys (see below)
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
npm run typecheck
```

## Set up the database (once)

1. Create a free project at [supabase.com](https://supabase.com).
2. In the project's **SQL Editor**, run `supabase/migrations/0001_schema.sql` and then
   `supabase/migrations/0002_security.sql`. They create the tables, the security rules and the
   three storage buckets: `documents` (PDFs), `media` (photos) and `private` (résumés).
3. In **Authentication › Sign In / Providers**, turn off **Allow new users to sign up**. Staff
   accounts are created from the admin panel. A login that someone creates on their own never
   gets access, because only accounts with a staff profile can edit anything.
4. Copy **Project URL**, **anon key** and **service_role key** from **Project Settings › API** into
   `.env.local`. For Vercel, add them under **Settings › Environment Variables** and redeploy.
   Also set `NEXT_PUBLIC_SITE_URL` to the site's address.
5. Copy the current content into the database and create the first administrator:

   ```bash
   npm run seed
   npm run create-admin -- principal@example.com "a-strong-password" "Sister Cynthia"
   ```

6. Sign in at `/admin/login`. Add other staff from **Staff accounts**.

For local development with Docker you can run Supabase locally instead: `npx supabase init`,
copy the migrations into `supabase/migrations`, run `npx supabase start`, and use the URL and
keys it prints.

## Pages

| Requirement | Routes |
|---|---|
| 1. Home | `/`: slider, quick links, notice board, highlights |
| 2. About Us | `/about`, `/about/vision-mission`, `/about/principal-message`, `/about/management`, `/about/cbse-affiliation` |
| 3. Mandatory Public Disclosure | `/mandatory-public-disclosure` (sections A–E of Appendix IX) |
| 4. Academics | `/academics`, `/academics/subjects`, `/academics/assessment`, `/academics/exam-schedule`, `/academics/results` |
| 5. Admissions | `/admissions`, `/admissions/eligibility`, `/admissions/registration`, `/admissions/fee-structure`, `/admissions/important-dates` |
| 6. Infrastructure | `/infrastructure`, `/infrastructure/{classrooms,library,laboratories,sports,transport,canteen}` |
| 7. Student Life | `/student-life/{clubs,events,student-council,achievements}` |
| 8. CBSE Guidelines | `/cbse/affiliation`, `/cbse/circulars`, `/cbse/syllabus` (plus the disclosure page) |
| 9. Academic Calendar | `/academic-calendar` |
| 10. Parent's Corner | `/parents/{ptm,portal,guidelines,feedback}` |
| 11. Alumni | `/alumni`, `/alumni/register` |
| 12. Gallery | `/gallery`, `/gallery/<album>`, `/gallery/videos` |
| 13. Downloads | `/downloads/{circulars,study-material,forms,policies}` |
| 14. Contact Us | `/contact` |
| 15. Careers | `/careers`, `/careers/apply` |

The parent portal page links to the school's existing ERP or app login. Set the address in
**Admin › School details**.

## Admin guide (for school staff)

| To update… | Go to |
|---|---|
| A notice, holiday notice or exam announcement on the home page and ticker | **Notices & ticker** |
| Circulars, CBSE circulars, syllabus, study material, forms, policies, date sheets (PDFs) | **Documents & PDFs** (the category decides where it shows) |
| Fees for a new session | **Fee structure** › *Copy session*, then edit the amounts |
| Class X / XII board results | **Board results** (pass % is calculated for you) |
| Holidays, exams, PTMs, result days, admission dates | **Academic calendar** |
| The 8 certificates CBSE requires, staff numbers, infrastructure | **Mandatory disclosure** |
| SMC, PTA, management committee, student council | **Committees** |
| Affiliation details, principal, phone, email, admission banner, links | **School details** |
| Text of the information pages (vision, assessment, guidelines…) | **Page text** |
| Photo albums and videos | **Photo albums** (upload many photos at once), **Videos** (YouTube links) |
| Job openings | **Job vacancies** |
| Messages from the contact, feedback, alumni and job forms | **Inbox** (mark as done, add notes, export to Excel) |

Every list has **Shown/Hidden** switches and up/down arrows to change the order. Uploaded
files are removed from storage when they are replaced or deleted.

## How it fits together

- `supabase/migrations/`: tables, Row-Level Security and storage buckets.
- `lib/content.ts`: read helpers for public pages, with a fallback to `lib/data.ts`.
- `lib/nav.ts`: menus and the side navigation of every section.
- `app/(site)/`: public pages. `components/page/`: the page shell, tables, document lists, calendar.
- `app/actions/forms.ts`: public form Server Actions (validated with zod, with a spam honeypot).
- `app/admin/`: admin panel. `lib/admin/resources.ts` describes each editable list (fields,
  columns, filters), so adding a new list is mostly configuration.
- Public pages are statically generated and refreshed whenever an admin saves
  (`revalidatePath`), and at most hourly otherwise.

## Colour palette and type

Five greens plus white, defined once in `app/globals.css` and available as Tailwind classes
(`bg-moss`, `text-forest`, `border-lichen` …). Headings use Roboto Slab and body text uses Roboto.

| Token  | Hex     | Used for                                           |
|--------|---------|----------------------------------------------------|
| forest | #0F2A1D | Headings, toolbar, footer, dark bands, hovers      |
| moss   | #375534 | Body text, buttons, icons                          |
| sage   | #6B9071 | Accent words in titles, ticker dots, photo fallback |
| lichen | #AEC3B0 | Borders, accents on dark backgrounds               |
| pista  | #E3EED4 | "Admission Open" badge, chips, soft fills          |
| mint   | #F3F8EC | Light section backgrounds (a lighter pista tint)   |

## Before going live

- Upload the 8 disclosure documents and fill in sections D and E in **Admin › Mandatory disclosure**.
- Add the last three years of board results, the SMC and PTA lists, the fee structure and the
  academic calendar.
- Fill in the affiliation year, validity and the principal's qualification in **School details**.
- Review the built-in page text (especially Assessment, Transport and Canteen) in **Page text**.
- Update the session dates in `components/AgeChecker.tsx` each year.
