// All school content lives here so the office can update it in one place.

export const school = {
  name: "St. Angela Sophia Senior Secondary School",
  short: "St. Angela Sophia",
  phone: "0141 260 1698",
  phoneHref: "tel:+911412601698",
  mobile: "97721 24512",
  mobileHref: "tel:+919772124512",
  email: "sophiajaipur@yahoo.co.in",
  address: "Outside Ghat Gate, Jaipur 302003",
  landmark: "Shiv Shankar Colony, near Sanganeri Gate",
  affiliation: "1730123",
  schoolCode: "10436",
  registrationUrl: "http://www.stangelasophiajaipur.in/Admission1.aspx",
  disclosureUrl: "http://www.stangelasophiajaipur.in/CBSE_MandatoryDisclosureA.aspx",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=St+Angela+Sophia+School+Ghat+Gate+Jaipur",
};

export const navLinks = [
  { href: "#about", label: "About", icon: "info", children: [
    { href: "#about", label: "About Us / Mission" },
    { href: "#principal", label: "Message from the Principal" },
    { href: "#history", label: "Our History" },
    { href: school.disclosureUrl, label: "Mandatory Disclosure" },
  ] },
  { href: "#academics", label: "Academics", icon: "book", children: [
    { href: "#academics", label: "School Stages" },
    { href: "#streams", label: "Streams in XI & XII" },
    { href: "#achievers", label: "Achievers" },
  ] },
  { href: "#admissions", label: "Admission", icon: "building", children: [
    { href: "#admissions", label: "Admission Procedure" },
    { href: "#age-check", label: "Age Eligibility" },
    { href: school.registrationUrl, label: "Apply Online" },
    { href: "#visit", label: "Online Enquiry" },
  ] },
  { href: "#campus", label: "Campus", icon: "home", children: [
    { href: "#campus", label: "Facilities" },
    { href: "#activities", label: "Events & Clubs" },
  ] },
  { href: "#whats-new", label: "What's New", icon: "bullhorn" },
  { href: "#alumni", label: "Alumni", icon: "cap" },
  { href: "#visit", label: "Contact", icon: "phone" },
] as const;

// Photos load from public/images/<file>. position is the CSS object-position used when the photo is cropped.
export const slides = [
  { image: "slide-1.jpg", alt: "The student council with the Sisters at the investiture ceremony", position: "center 40%", kicker: "Celebrating 100 years in Jaipur", heading: "Wisdom for Every Girl" },
  { image: "slide-2.jpg", alt: "Students gathered on the school grounds under the trees", position: "center 60%", kicker: "St. Angela Sophia, since 1926", heading: "Wise, Kind and Confident" },
  { image: "slide-3.jpg", alt: "Students at an art workshop in their classroom", position: "70% center", kicker: "Nursery to Class XII · CBSE", heading: "A Century of Learning and Service" },
];

// Celebrations gallery in the Events & Clubs section. The first photo is shown large.
export const celebrations = [
  { image: "life-christmas.jpg", alt: "The school choir singing carols at the Christmas celebration", caption: "Christmas carols" },
  { image: "life-nativity.jpg", alt: "Students performing the nativity play", caption: "The nativity play" },
  { image: "life-rakhi.jpg", alt: "Students and teachers at the Raksha Bandhan celebration", caption: "Raksha Bandhan" },
];

export const announcements = [
  "Celebrating 100 years in Jaipur, 1926–2026",
  "Nursery to Class I registration for 2027–28 expected to open on 1 December",
  "CBSE results 2026 are on the school notice board",
  "Book lists and uniform circular for 2026–27 now available",
];

export const facts = [
  { value: "100", suffix: "", label: "Years in Jaipur", icon: "star" },
  { value: "2300", suffix: "+", label: "Students Enrolled", icon: "cap" },
  { value: "86", suffix: "", label: "Teachers on Staff", icon: "book" },
  { value: "15", suffix: "", label: "Clubs and Activities", icon: "trophy" },
] as const;


export const values = [
  { title: "Wisdom", text: "Rigorous CBSE academics, taught with patience so girls understand rather than memorise.", icon: "book" },
  { title: "Compassion", text: "An education shaped by service, from our Ajmer orphanage roots to today's literacy drives.", icon: "heart" },
  { title: "Discipline", text: "Clear routines, punctuality and care for one another, so every girl has room to focus.", icon: "star" },
  { title: "Confidence", text: "Quizzes, stage, sport and student council give girls a voice they carry into the world.", icon: "globe" },
] as const;

export const timeline = [
  { year: "1911", title: "A home in Ajmer", text: "Bishop Fortunatus Henri Caumont and Mother Mary Matilda found the Mission Sisters of Ajmer and open a home for girls, named after St. Angela Merici." },
  { year: "1926", title: "Arrival in Jaipur", text: "On 25 February the home moves to Jaipur, outside Ghat Gate." },
  { year: "1928", title: "The first day scholar", text: "The school opens its doors to girls from the city." },
  { year: "1970", title: "Senior classes begin", text: "Class XI is introduced, followed by Class XII in 1989." },
  { year: "1997", title: "CBSE and beyond", text: "The school moves to CBSE and starts its alumni association and counselling cell." },
  { year: "2015", title: "Powered by the sun", text: "A 45 kWp solar plant is commissioned on campus." },
  { year: "2026", title: "A century in Jaipur", text: "One hundred years of educating the girls of this city." },
];

export const stages = [
  { title: "Pre-primary", classes: "Nursery, LKG, HKG", text: "Gentle first years built on stories, songs, play and early reading. Girls learn to share, speak up and love school.", subjects: ["English", "Numbers", "Hindi", "General awareness", "Drawing", "Rhymes and music"] },
  { title: "Primary", classes: "Classes I–V", text: "Strong foundations in language and maths, with science, social studies and moral science introduced through projects and activities.", subjects: ["English", "Hindi", "Mathematics", "EVS and science", "Social studies", "Moral science", "Computers", "Dance and PE"] },
  { title: "Middle", classes: "Classes VI–VIII", text: "Subjects deepen and a third language begins. Girls start leading clubs and taking part in inter-school events.", subjects: ["Sanskrit", "Science", "Mathematics", "Social science", "Value education", "Art and craft", "Music", "Computers"] },
  { title: "Secondary", classes: "Classes IX–X", text: "Focused preparation for the CBSE Class X board exam, with careful tracking of each girl's progress and guidance on choosing a stream.", subjects: ["English", "Hindi", "Mathematics", "Science", "Social science", "Information technology", "Physical education"] },
  { title: "Senior Secondary", classes: "Classes XI–XII", text: "Science, Commerce and Humanities streams, with career counselling to help girls plan for college and beyond.", subjects: ["Science (Biology)", "Science (Maths)", "Commerce", "Humanities", "Career counselling"] },
];

export const streams = [
  { name: "Science with Biology", min: 80, need: "80% overall in Class X, with at least 70% in Maths", subjects: "English Core, Physics, Chemistry and Biology, plus one of Physical Education, Informatics Practices, Food Nutrition and Dietetics, or Psychology." },
  { name: "Science with Mathematics", min: 85, need: "85% overall in Class X, with at least 80% in Maths", subjects: "English Core, Physics, Chemistry and Mathematics, plus Physical Education or Informatics Practices." },
  { name: "Commerce with Mathematics", min: 80, need: "80% overall in Class X, with at least 80% in Maths", subjects: "English Core, Accountancy, Business Studies and Economics, plus Applied Maths, Informatics Practices, Painting or Psychology." },
  { name: "Commerce with PE", min: 70, need: "70% overall in Class X", subjects: "English Core, Accountancy, Business Studies and Economics, plus Physical Education, Painting or Psychology." },
  { name: "Humanities", min: 70, need: "70% overall in Class X", subjects: "English Core with electives from History, Geography, Political Science, Economics, Sociology, Psychology, Home Science, Painting, Physical Education and more." },
];

export const admissionSteps = [
  { title: "Register online", text: "Fill in the registration form on the school website when the window opens. The processing fee is ₹1,000 and is not refundable." },
  { title: "Keep your details ready", text: "You'll need a parent's Aadhaar number and mobile number, and your daughter's official birth certificate. No marksheet is needed for Nursery." },
  { title: "Review by the admission committee", text: "The school's admission committee reviews every registration. Its decision is final." },
  { title: "Confirm your seat", text: "Selected families complete documents and fees at the school office." },
];

export const events = [
  { title: "Amartya Sen Commerce Quiz", text: "Our long-running inter-school quiz for young economists and accountants.", icon: "chart" },
  { title: "Aryabhatta Science Quiz", text: "Teams from across the city test their science, and our girls have won it.", icon: "flask" },
  { title: "Humanities Day", text: "History, geography and society brought to life through exhibits and talks.", icon: "globe" },
  { title: "English Excellence Day", text: "Debate, recitation and drama celebrating the spoken and written word.", icon: "pen" },
] as const;

export const clubs = ["Dramatics", "Eco club", "NCC", "Dance", "Maths club", "Art & craft", "Yoga", "Sports", "Health & wellness", "Gardening", "First aid", "Social science", "Home science", "Commerce club", "Each One Teach One"];

export const achievements = [
  { tag: "2015", title: "Young Chef of the year", text: "A Class XII student won IIHM's Young Chef, chosen from 850 students, and earned a chance to compete in London." },
  { tag: "2015", title: "First in the Aryabhatta Quiz", text: "Our team took first place against 24 schools in the inter-school science quiz." },
  { tag: "Sports", title: "District badminton champions", text: "Our Under-17 team won the district title, and our swimmers went on to state level." },
];

export const news = [
  { date: "December 2026", title: "Nursery to Class I registration for 2027–28", text: "Expected to open on 1 December. Dates will be confirmed on this page.", image: "news-1.jpg", href: "#admissions" },
  { date: "May 2026", title: "CBSE results 2026", text: "Class X and XII results are published on the school notice board.", image: "news-2.jpg", href: "#visit" },
  { date: "April 2026", title: "Book lists and uniform circular 2026–27", text: "Lists for Nursery to Class XII for the 2026–27 session are available.", image: "news-3.jpg", href: "http://www.stangelasophiajaipur.in/" },
  { date: "Monthly", title: "Campus newsletter", text: "A month of school life, published at the start of each month.", image: "news-4.jpg", href: "#visit" },
];

