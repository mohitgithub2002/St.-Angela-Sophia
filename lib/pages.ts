// Every rich-text page staff can edit in Admin › Pages, with the text shown until they do.
// Text marked "update" is general wording the school office should replace with its own details.

export type PageDef = { slug: string; title: string; group: string; body: string };

export const PAGE_DEFS: PageDef[] = [
  {
    slug: "about-overview",
    title: "School Overview",
    group: "About Us",
    body: `<p>St. Angela Sophia Senior Secondary School is a CBSE-affiliated girls' school just outside Ghat Gate in Jaipur's walled city. It is run by the Mission Sisters of Ajmer and has educated the girls of Jaipur since 1926.</p>
<p>We welcome girls of every faith and background from Nursery to Class XII. In the senior years we offer Science, Commerce and Humanities. Our heritage campus sits on 2.25 acres in the old city. It has smart classrooms, science and computer laboratories, a reference library, sports facilities and a 45 kWp solar plant.</p>
<p>Our motto, <em>Arbhak Buddhi Dayi</em>, means giving wisdom to little ones. Strong results matter here, and so does the kind of person a girl becomes.</p>`,
  },
  {
    slug: "vision-mission",
    title: "Vision & Mission",
    group: "About Us",
    body: `<h3>Our Vision</h3>
<p>To form wise, compassionate and confident young women who think for themselves, serve others and lead with integrity.</p>
<h3>Our Mission</h3>
<ul>
<li>To give every girl a rigorous CBSE education, taught with patience so she understands rather than memorises.</li>
<li>To nurture character, emotional resilience and a spirit of curiosity alongside academic excellence.</li>
<li>To welcome girls of every faith and background, and to educate them in a spirit of service, true to our roots in the Mission Sisters of Ajmer.</li>
<li>To give girls a voice through sport, the arts, clubs and student leadership.</li>
</ul>
<h3>Our Motto</h3>
<p><em>Arbhak Buddhi Dayi</em>: giving wisdom to little ones.</p>`,
  },
  {
    slug: "principal-message",
    title: "Principal's Message",
    group: "About Us",
    body: `<blockquote>Our hope is simple: that every girl leaves us knowing her mind, minding her heart, and ready to serve.</blockquote>
<p>As we celebrate one hundred years in Jaipur, we give thanks for the Sisters, teachers, parents and students who built this school. Academic excellence remains at our core, and we balance it with character, emotional resilience and a spirit of curiosity.</p>
<p>We invite you to visit us, meet our teachers and see a school day for yourself.</p>`,
  },
  {
    slug: "curriculum",
    title: "Curriculum Details",
    group: "Academics",
    body: `<p>The school follows the curriculum prescribed by the Central Board of Secondary Education (CBSE) and the NCERT textbooks for every class. It is taught in four stages: Primary (Classes I–V), Middle (Classes VI–VIII), Secondary (Classes IX–X) and Senior Secondary (Classes XI–XII). Before these comes our Pre-primary section (Nursery, LKG and HKG).</p>
<p>Teaching follows the National Education Policy 2020. It is built on experiential learning, projects and activities, with art, physical education, value education and life skills part of every week.</p>`,
  },
  {
    slug: "assessment",
    title: "Assessment Structure",
    group: "Academics",
    body: `<p>Assessment follows the scheme laid down by CBSE for each stage. It combines continuous internal assessment with term examinations, so that every girl's learning is tracked throughout the year.</p>
<h3>Classes I–VIII</h3>
<p>Periodic tests, notebook and project work, and activities through the year, together with half-yearly and annual examinations. Co-scholastic areas (art, music, physical education, values) are graded.</p>
<h3>Classes IX–X</h3>
<p>As per CBSE, most subjects carry 80 marks for the annual (board) examination and 20 marks for internal assessment. Internal assessment covers periodic tests, multiple assessment, portfolio and subject enrichment activities.</p>
<h3>Classes XI–XII</h3>
<p>Theory examinations together with practicals, projects and internal assessment in the proportion prescribed by CBSE for each subject. Class XII students sit pre-board examinations before the board exams.</p>
<h3>Grading</h3>
<p>Report cards show marks and grades on the CBSE grading scale. Report cards are shared with parents at parent-teacher meetings.</p>`,
  },
  {
    slug: "results-info",
    title: "Results",
    group: "Academics",
    body: `<p>CBSE Class X and XII board results are published on the official CBSE websites, <a href="https://results.cbse.nic.in" target="_blank" rel="noopener">results.cbse.nic.in</a> and <a href="https://cbseresults.nic.in" target="_blank" rel="noopener">cbseresults.nic.in</a>, and through DigiLocker. Students need their roll number, school number and admit card ID.</p>
<p>Results of school examinations are shared through report cards at parent-teacher meetings. Our board results for the last three years are shown below.</p>`,
  },
  {
    slug: "admission-documents",
    title: "Documents Required",
    group: "Admissions",
    body: `<ul>
<li>Official birth certificate of the child (issued by the municipal authority)</li>
<li>Aadhaar card of the child and of a parent</li>
<li>Recent passport-size photographs of the child and parents</li>
<li>Proof of residence</li>
<li>Transfer certificate and last report card (Class II onwards)</li>
<li>Caste / category certificate, if applicable</li>
</ul>
<p>Please bring originals along with self-attested copies when confirming admission.</p>`,
  },
  {
    slug: "eligibility",
    title: "Eligibility Criteria",
    group: "Admissions",
    body: `<p>Admission to Nursery, LKG, HKG and Class I depends on the child's age on the date fixed by the school for the session. Use the checker on this page to see which class your daughter fits.</p>
<p>Mid-way places in Classes II to X are only for girls moving to Jaipur from another district or state, with a transfer order and an aptitude test. Admission to Class XI depends on Class X marks and the seats available in each stream.</p>`,
  },
  {
    slug: "infrastructure",
    title: "School Infrastructure",
    group: "Infrastructure",
    body: `<p>Our 2.25-acre heritage campus in the old city combines a century-old building with modern facilities for every girl: smart classrooms, science and computer laboratories, a reference library, a playground and sports facilities, a music and dance room, and a 45 kWp rooftop solar plant.</p>`,
  },
  {
    slug: "infra-classrooms",
    title: "Classrooms",
    group: "Infrastructure",
    body: `<p>Classrooms are airy and well lit, and are fitted with digital smart boards and projectors so that teachers can bring lessons to life with videos, animations and interactive exercises.</p>`,
  },
  {
    slug: "infra-library",
    title: "Library",
    group: "Infrastructure",
    body: `<p>The reference library holds about 4,000 books along with periodicals and daily newspapers in a dedicated reading room. Every class has a library period, and reading programmes encourage girls to read widely in English and Hindi.</p>`,
  },
  {
    slug: "infra-laboratories",
    title: "Laboratories",
    group: "Infrastructure",
    body: `<p>Separate Physics, Chemistry and Biology laboratories are equipped for the practical work prescribed by CBSE. The computer labs give every girl hands-on time with computers from the primary classes onwards.</p>`,
  },
  {
    slug: "infra-sports",
    title: "Sports Complex",
    group: "Infrastructure",
    body: `<p>Girls play on the school playground and courts, with facilities for badminton, athletics, yoga and indoor games. Our teams take part in district and state-level competitions.</p>`,
  },
  {
    slug: "infra-transport",
    title: "Transport Facility",
    group: "Infrastructure",
    body: `<p>Information about school transport, routes and charges is available from the school office. Safety rules for students using transport are shared with parents at the start of each session.</p>`,
  },
  {
    slug: "infra-canteen",
    title: "Canteen",
    group: "Infrastructure",
    body: `<p>Information about the school canteen and its menu will be published here. We encourage healthy, home-cooked tiffin and do not allow junk food on campus.</p>`,
  },
  {
    slug: "student-council",
    title: "Student Council",
    group: "Student Life",
    body: `<p>The Student Council is elected and invested at the start of every session. Its members lead the school's houses, assemblies, clubs and events. They learn responsibility and leadership, and act as a link between students and teachers.</p>`,
  },
  {
    slug: "ptm",
    title: "Parent-Teacher Meetings",
    group: "Parent's Corner",
    body: `<p>Parent-teacher meetings are held after each round of examinations to share report cards and discuss each girl's progress. Dates are listed below and announced through the school diary.</p>`,
  },
  {
    slug: "parent-portal",
    title: "Parent Portal",
    group: "Parent's Corner",
    body: `<p>Parents can track their daughter's attendance, marks, homework and fee payments through the school's online parent portal. Login details are shared by the school office at admission. Contact the office if you have not received them.</p>`,
  },
  {
    slug: "parent-guidelines",
    title: "Guidelines for Parents",
    group: "Parent's Corner",
    body: `<ul>
<li>Make sure your daughter reaches school on time, in clean and complete uniform.</li>
<li>Check the school diary every day and sign notes from teachers.</li>
<li>Give her a quiet place and a regular time to study and read at home.</li>
<li>Limit screen time and talk with her about her day at school.</li>
<li>Inform the class teacher in writing about any absence.</li>
<li>Attend parent-teacher meetings and school events whenever you can.</li>
</ul>`,
  },
  {
    slug: "alumni",
    title: "Alumni",
    group: "Alumni",
    body: `<p>Our Ex-Angelite Association has kept generations of girls connected since 1997. Come back, share your story, and meet the girls who follow you. Register below to stay in touch and hear about reunions.</p>`,
  },
  {
    slug: "why-work-with-us",
    title: "Why Work With Us",
    group: "Careers",
    body: `<p>For a hundred years our teachers have been the heart of St. Angela Sophia. We look for teachers who explain with patience, care for every girl, and keep learning themselves.</p>
<ul>
<li>A respected institution with a century of history in Jaipur</li>
<li>Supportive leadership and a collegial staff room</li>
<li>Regular in-service training and CBSE capacity-building programmes</li>
<li>Well-equipped classrooms and labs</li>
</ul>`,
  },
  {
    slug: "application-process",
    title: "Application Process",
    group: "Careers",
    body: `<ol>
<li>Choose the post you are applying for from the list of current vacancies.</li>
<li>Fill in the online application form and attach your résumé (PDF or Word, up to 5 MB).</li>
<li>Shortlisted candidates are called for a written test, demonstration lesson and interview.</li>
<li>Bring original certificates and experience letters when you are called.</li>
</ol>
<p>Qualifications must be as prescribed by CBSE and NCTE for the post.</p>`,
  },
];

export const pageDef = (slug: string) => PAGE_DEFS.find((p) => p.slug === slug);
