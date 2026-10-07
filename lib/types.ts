// Row shapes for the Supabase tables in supabase/migrations/0001_schema.sql.

export type Settings = {
  name: string;
  short: string;
  phone: string;
  mobile: string;
  email: string;
  admissionsEmail: string;
  address: string;
  pin: string;
  landmark: string;
  board: string;
  affiliation: string;
  affiliationYear: string;
  affiliationValidity: string;
  affiliationStatus: string;
  schoolCode: string;
  udise: string;
  society: string;
  schoolType: string;
  medium: string;
  principalName: string;
  principalQualification: string;
  officeHours: string;
  visitingHours: string;
  admissionBanner: string;
  admissionCtaTitle: string;
  admissionCtaText: string;
  registrationUrl: string;
  parentPortalUrl: string;
  mapsUrl: string;
  facebook: string;
  instagram: string;
  youtube: string;
};

export type MpdInfo = {
  totalTeachers: string;
  pgt: string;
  tgt: string;
  prt: string;
  teacherSectionRatio: string;
  specialEducator: string;
  counsellor: string;
  campusArea: string;
  classrooms: string;
  laboratories: string;
  internet: string;
  girlsToilets: string;
  boysToilets: string;
  inspectionVideo: string;
};

type Row = { id: string; sort: number };

export type Page = { slug: string; title: string; body: string; image: string; updated_at?: string };
export type Slide = Row & { image: string; alt: string; kicker: string; heading: string; link: string; position: string; published: boolean };
export type Announcement = Row & { title: string; text: string; link: string; file_url: string; date: string | null; expires_on: string | null; pinned: boolean; published: boolean };

export const DOC_CATEGORIES = {
  circular: "Circulars & Notices",
  cbse_circular: "CBSE Circulars",
  syllabus: "Syllabus",
  study_material: "Study Material",
  form: "Forms & Applications",
  policy: "Policies",
  fee: "Fee Structure",
  calendar: "Academic Calendar",
  datesheet: "Date Sheets",
  result: "Results",
  ptm: "Parent-Teacher Meetings",
  other: "Other",
} as const;
export type DocCategory = keyof typeof DOC_CATEGORIES;
export type Doc = Row & { title: string; category: DocCategory; description: string; class_name: string; subject: string; file_url: string; date: string | null; published: boolean; updated_at?: string };

export type MpdDocument = { slot: string; file_url: string; updated_at?: string };
export type Fee = Row & { session: string; class_group: string; fee_head: string; amount: number; frequency: string };
export type BoardResult = Row & { class: "X" | "XII"; year: string; registered: number; passed: number; remarks: string };

export const EVENT_TYPES = { holiday: "Holiday", exam: "Examination", event: "School event", ptm: "Parent-teacher meeting", result: "Result", admission: "Admission" } as const;
export type EventType = keyof typeof EVENT_TYPES;
export type CalendarEvent = Row & { session: string; title: string; type: EventType; start_date: string; end_date: string | null; description: string; published: boolean };

export const COMMITTEES = { management: "Management Committee", smc: "School Management Committee (SMC)", pta: "Parent Teacher Association (PTA)", student_council: "Student Council" } as const;
export type Committee = keyof typeof COMMITTEES;
export type Member = Row & { committee: Committee; name: string; designation: string; representing: string; photo: string };

export const FACILITY_CATEGORIES = { classrooms: "Classrooms", library: "Library", laboratories: "Laboratories", sports: "Sports Complex", transport: "Transport", canteen: "Canteen", other: "Other" } as const;
export type FacilityCategory = keyof typeof FACILITY_CATEGORIES;
export type Facility = Row & { category: FacilityCategory; title: string; text: string; stat: string; unit: string; icon: string; image: string; featured: boolean; published: boolean };
export type TransportRoute = Row & { route_no: string; areas: string; contact: string };

export type Fact = Row & { value: string; suffix: string; label: string; icon: string };
export type CoreValue = Row & { title: string; text: string; icon: string };
export type TimelineItem = Row & { year: string; title: string; text: string };
export type Stage = Row & { title: string; classes: string; text: string; subjects: string[] };
export type Stream = Row & { name: string; min: number; need: string; subjects: string };
export type AdmissionStep = Row & { title: string; text: string };
export type Club = Row & { name: string; description: string };
export type SchoolEvent = Row & { title: string; text: string; date: string | null; icon: string; image: string; kind: "event" | "celebration"; published: boolean };
export type Achievement = Row & { tag: string; title: string; text: string; category: "academic" | "sports" | "co_curricular"; image: string; published: boolean };
export type Album = Row & { title: string; slug: string; date: string | null; description: string; cover: string; published: boolean };
export type GalleryPhoto = Row & { album_id: string; image: string; caption: string };
export type Video = Row & { title: string; url: string; date: string | null; published: boolean };
export type NotableAlumnus = Row & { name: string; batch: string; title: string; text: string; photo: string; published: boolean };
export type AlumniEvent = Row & { title: string; date: string | null; venue: string; text: string; image: string; published: boolean };
export type Vacancy = Row & { post: string; department: string; qualification: string; experience: string; description: string; last_date: string | null; is_open: boolean };
