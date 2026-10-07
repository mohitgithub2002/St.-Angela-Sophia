// Default content for the site. It seeds the database (npm run seed) and is shown
// whenever Supabase is not configured, so the site always has something to render.
// Once the database is live, staff change all of this from /admin.
import type {
  AdmissionStep, Announcement, Achievement, BoardResult, CalendarEvent, Club, CoreValue, Doc, Fact, Facility, Fee,
  Member, MpdInfo, SchoolEvent, Settings, Slide, Stage, Stream, TimelineItem, TransportRoute, Vacancy, Album,
  GalleryPhoto, Video, NotableAlumnus, AlumniEvent,
} from "./types";

export const defaultSettings: Settings = {
  name: "St. Angela Sophia Senior Secondary School",
  short: "St. Angela Sophia",
  phone: "0141 260 1698",
  mobile: "97721 24512",
  email: "sophiajaipur@yahoo.co.in",
  admissionsEmail: "",
  address: "Outside Ghat Gate, Jaipur, Rajasthan",
  pin: "302003",
  landmark: "Shiv Shankar Colony, near Sanganeri Gate",
  board: "CBSE",
  affiliation: "1730123",
  affiliationYear: "",
  affiliationValidity: "",
  affiliationStatus: "",
  schoolCode: "10436",
  udise: "",
  society: "Mission Sisters of Ajmer",
  schoolType: "Girls' school, Nursery to Class XII",
  medium: "English",
  principalName: "Dr. Sister Cynthia David",
  principalQualification: "",
  officeHours: "Monday to Saturday, 8:00 am to 2:00 pm",
  visitingHours: "Parents may meet the Principal on working days by appointment.",
  admissionBanner: "Admission Open 2027–28",
  admissionCtaTitle: "Admissions open for 2027–28",
  admissionCtaText: "Nursery to Class I registration is expected to open on 1 December. Call us or send an enquiry today.",
  registrationUrl: "http://www.stangelasophiajaipur.in/Admission1.aspx",
  parentPortalUrl: "",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=St+Angela+Sophia+School+Ghat+Gate+Jaipur",
  facebook: "",
  instagram: "",
  youtube: "",
};

export const defaultMpd: MpdInfo = {
  totalTeachers: "86",
  pgt: "",
  tgt: "",
  prt: "",
  teacherSectionRatio: "",
  specialEducator: "",
  counsellor: "",
  campusArea: "",
  classrooms: "",
  laboratories: "",
  internet: "Yes",
  girlsToilets: "",
  boysToilets: "",
  inspectionVideo: "",
};

// Mandatory Public Disclosure, section B (Appendix IX). The slot keys are fixed; staff upload a PDF to each.
export const MPD_SLOTS = [
  { slot: "affiliation", label: "Copies of Affiliation/Upgradation Letter and Recent Extension of Affiliation, if any" },
  { slot: "society", label: "Copies of Societies/Trust/Company Registration/Renewal Certificate, as applicable" },
  { slot: "noc", label: "Copy of No Objection Certificate (NOC) issued, if applicable, by the State Govt./UT" },
  { slot: "rte", label: "Copies of Recognition Certificate under RTE Act, 2009, and its Renewal, if applicable" },
  { slot: "building_safety", label: "Copy of Valid Building Safety Certificate as per the National Building Code" },
  { slot: "fire_safety", label: "Copy of Valid Fire Safety Certificate issued by the Competent Authority" },
  { slot: "deo", label: "Copy of the DEO Certificate submitted by the school for Affiliation/Upgradation/Extension of Affiliation or Self Certification by School" },
  { slot: "water_health", label: "Copies of Valid Water, Health and Sanitation Certificates" },
] as const;

// Gives fallback rows stable ids and a sort order.
const rows = <T extends object>(name: string, items: T[]) => items.map((x, i) => ({ id: `${name}-${i}`, sort: i, ...x }));

export const slides: Slide[] = rows("slide", [
  { image: "slide-1.jpg", alt: "The student council with the Sisters at the investiture ceremony", position: "center 40%", kicker: "Celebrating 100 years in Jaipur", heading: "Wisdom for Every Girl", link: "/about", published: true },
  { image: "slide-2.jpg", alt: "Students gathered on the school grounds under the trees", position: "center 60%", kicker: "St. Angela Sophia, since 1926", heading: "Wise, Kind and Confident", link: "/about", published: true },
  { image: "slide-3.jpg", alt: "Students at an art workshop in their classroom", position: "70% center", kicker: "Nursery to Class XII · CBSE", heading: "A Century of Learning and Service", link: "/academics", published: true },
]);

export const announcements: Announcement[] = rows("announcement", [
  { title: "Nursery to Class I registration for 2027–28", text: "Expected to open on 1 December. Dates will be confirmed on this page.", link: "/admissions/important-dates", file_url: "", date: "2026-10-01", expires_on: null, pinned: true, published: true },
  { title: "Celebrating 100 years in Jaipur, 1926–2026", text: "", link: "/about", file_url: "", date: "2026-02-25", expires_on: null, pinned: false, published: true },
  { title: "CBSE results 2026 are on the school notice board", text: "Class X and XII results are published on the school notice board.", link: "/academics/results", file_url: "", date: "2026-05-15", expires_on: null, pinned: false, published: true },
  { title: "Book lists and uniform circular for 2026–27 now available", text: "", link: "/downloads/circulars", file_url: "", date: "2026-04-01", expires_on: null, pinned: false, published: true },
]);

export const facts: Fact[] = rows("fact", [
  { value: "100", suffix: "", label: "Years in Jaipur", icon: "star" },
  { value: "2300", suffix: "+", label: "Students Enrolled", icon: "cap" },
  { value: "86", suffix: "", label: "Teachers on Staff", icon: "book" },
  { value: "15", suffix: "", label: "Clubs and Activities", icon: "trophy" },
]);

export const values: CoreValue[] = rows("value", [
  { title: "Wisdom", text: "Rigorous CBSE academics, taught with patience so girls understand rather than memorise.", icon: "book" },
  { title: "Compassion", text: "An education shaped by service, from our Ajmer orphanage roots to today's literacy drives.", icon: "heart" },
  { title: "Discipline", text: "Clear routines, punctuality and care for one another, so every girl has room to focus.", icon: "star" },
  { title: "Confidence", text: "Quizzes, stage, sport and student council give girls a voice they carry into the world.", icon: "globe" },
]);

export const timeline: TimelineItem[] = rows("timeline", [
  { year: "1911", title: "A home in Ajmer", text: "Bishop Fortunatus Henri Caumont and Mother Mary Matilda found the Mission Sisters of Ajmer and open a home for girls, named after St. Angela Merici." },
  { year: "1926", title: "Arrival in Jaipur", text: "On 25 February the home moves to Jaipur, outside Ghat Gate." },
  { year: "1928", title: "The first day scholar", text: "The school opens its doors to girls from the city." },
  { year: "1970", title: "Senior classes begin", text: "Class XI is introduced, followed by Class XII in 1989." },
  { year: "1997", title: "CBSE and beyond", text: "The school moves to CBSE and starts its alumni association and counselling cell." },
  { year: "2015", title: "Powered by the sun", text: "A 45 kWp solar plant is commissioned on campus." },
  { year: "2026", title: "A century in Jaipur", text: "One hundred years of educating the girls of this city." },
]);

export const stages: Stage[] = rows("stage", [
  { title: "Pre-primary", classes: "Nursery, LKG, HKG", text: "Gentle first years built on stories, songs, play and early reading. Girls learn to share, speak up and love school.", subjects: ["English", "Numbers", "Hindi", "General awareness", "Drawing", "Rhymes and music"] },
  { title: "Primary", classes: "Classes I–V", text: "Strong foundations in language and maths, with science, social studies and moral science introduced through projects and activities.", subjects: ["English", "Hindi", "Mathematics", "EVS and science", "Social studies", "Moral science", "Computers", "Dance and PE"] },
  { title: "Middle", classes: "Classes VI–VIII", text: "Subjects deepen and a third language begins. Girls start leading clubs and taking part in inter-school events.", subjects: ["Sanskrit", "Science", "Mathematics", "Social science", "Value education", "Art and craft", "Music", "Computers"] },
  { title: "Secondary", classes: "Classes IX–X", text: "Focused preparation for the CBSE Class X board exam, with careful tracking of each girl's progress and guidance on choosing a stream.", subjects: ["English", "Hindi", "Mathematics", "Science", "Social science", "Information technology", "Physical education"] },
  { title: "Senior Secondary", classes: "Classes XI–XII", text: "Science, Commerce and Humanities streams, with career counselling to help girls plan for college and beyond.", subjects: ["Science (Biology)", "Science (Maths)", "Commerce", "Humanities", "Career counselling"] },
]);

export const streams: Stream[] = rows("stream", [
  { name: "Science with Biology", min: 80, need: "80% overall in Class X, with at least 70% in Maths", subjects: "English Core, Physics, Chemistry and Biology, plus one of Physical Education, Informatics Practices, Food Nutrition and Dietetics, or Psychology." },
  { name: "Science with Mathematics", min: 85, need: "85% overall in Class X, with at least 80% in Maths", subjects: "English Core, Physics, Chemistry and Mathematics, plus Physical Education or Informatics Practices." },
  { name: "Commerce with Mathematics", min: 80, need: "80% overall in Class X, with at least 80% in Maths", subjects: "English Core, Accountancy, Business Studies and Economics, plus Applied Maths, Informatics Practices, Painting or Psychology." },
  { name: "Commerce with PE", min: 70, need: "70% overall in Class X", subjects: "English Core, Accountancy, Business Studies and Economics, plus Physical Education, Painting or Psychology." },
  { name: "Humanities", min: 70, need: "70% overall in Class X", subjects: "English Core with electives from History, Geography, Political Science, Economics, Sociology, Psychology, Home Science, Painting, Physical Education and more." },
]);

export const admissionSteps: AdmissionStep[] = rows("step", [
  { title: "Register online", text: "Fill in the registration form on the school website when the window opens. The processing fee is ₹1,000 and is not refundable." },
  { title: "Keep your details ready", text: "You'll need a parent's Aadhaar number and mobile number, and your daughter's official birth certificate. No marksheet is needed for Nursery." },
  { title: "Review by the admission committee", text: "The school's admission committee reviews every registration. Its decision is final." },
  { title: "Confirm your seat", text: "Selected families complete documents and fees at the school office." },
]);

export const events: SchoolEvent[] = rows("event", [
  { title: "Amartya Sen Commerce Quiz", text: "Our long-running inter-school quiz for young economists and accountants.", icon: "chart", date: null, image: "", kind: "event", published: true },
  { title: "Aryabhatta Science Quiz", text: "Teams from across the city test their science, and our girls have won it.", icon: "flask", date: null, image: "", kind: "event", published: true },
  { title: "Humanities Day", text: "History, geography and society brought to life through exhibits and talks.", icon: "globe", date: null, image: "", kind: "event", published: true },
  { title: "English Excellence Day", text: "Debate, recitation and drama celebrating the spoken and written word.", icon: "pen", date: null, image: "", kind: "event", published: true },
  { title: "Christmas carols", text: "The school choir singing carols at the Christmas celebration.", icon: "star", date: null, image: "life-christmas.jpg", kind: "celebration", published: true },
  { title: "The nativity play", text: "Students performing the nativity play.", icon: "star", date: null, image: "life-nativity.jpg", kind: "celebration", published: true },
  { title: "Raksha Bandhan", text: "Students and teachers at the Raksha Bandhan celebration.", icon: "heart", date: null, image: "life-rakhi.jpg", kind: "celebration", published: true },
]);

export const clubs: Club[] = rows("club",
  ["Dramatics", "Eco club", "NCC", "Dance", "Maths club", "Art & craft", "Yoga", "Sports", "Health & wellness", "Gardening", "First aid", "Social science", "Home science", "Commerce club", "Each One Teach One"]
    .map((name) => ({ name, description: "" })),
);

export const achievements: Achievement[] = rows("achievement", [
  { tag: "2015", title: "Young Chef of the year", text: "A Class XII student won IIHM's Young Chef, chosen from 850 students, and earned a chance to compete in London.", category: "co_curricular", image: "", published: true },
  { tag: "2015", title: "First in the Aryabhatta Quiz", text: "Our team took first place against 24 schools in the inter-school science quiz.", category: "academic", image: "", published: true },
  { tag: "Sports", title: "District badminton champions", text: "Our Under-17 team won the district title, and our swimmers went on to state level.", category: "sports", image: "", published: true },
]);

export const facilities: Facility[] = rows("facility", [
  { category: "sports", title: "Sports & Games", text: "Playground, badminton, athletics, yoga and indoor games.", stat: "", unit: "", icon: "trophy", image: "facility-sports.jpg", featured: true, published: true },
  { category: "other", title: "Dance & Music", text: "Rooms for dance, music and stage rehearsals.", stat: "", unit: "", icon: "star", image: "facility-music.jpg", featured: true, published: true },
  { category: "library", title: "Reference Library", text: "Periodicals and daily newspapers in a dedicated reading room.", stat: "4,000", unit: "books", icon: "book", image: "", featured: false, published: true },
  { category: "classrooms", title: "Smart Classrooms", text: "Projectors in classrooms, plus computer labs.", stat: "50", unit: "digital boards", icon: "screen", image: "", featured: false, published: true },
  { category: "laboratories", title: "Science Labs", text: "Physics, chemistry and biology, for hands-on practicals.", stat: "3", unit: "labs", icon: "flask", image: "", featured: false, published: true },
  { category: "other", title: "Solar Campus", text: "Rooftop solar has powered the campus since 2015.", stat: "45", unit: "kWp solar plant", icon: "sun", image: "", featured: false, published: true },
]);

// Things only the school can supply start empty; each page shows a friendly "to be updated" note until staff add them.
export const documents: Doc[] = [];
export const fees: Fee[] = [];
export const results: BoardResult[] = [];
export const calendar: CalendarEvent[] = [];
export const members: Member[] = [];
export const transportRoutes: TransportRoute[] = [];
export const vacancies: Vacancy[] = [];
export const albums: Album[] = rows("album", [
  { title: "Celebrations", slug: "celebrations", date: null, description: "Festivals through the year.", cover: "life-christmas.jpg", published: true },
]);
export const photos: GalleryPhoto[] = events
  .filter((e) => e.kind === "celebration")
  .map((e, i) => ({ id: `photo-${i}`, sort: i, album_id: "album-0", image: e.image, caption: e.title }));
export const videos: Video[] = [];
export const notableAlumni: NotableAlumnus[] = [];
export const alumniEvents: AlumniEvent[] = [];
