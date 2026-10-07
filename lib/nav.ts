import type { IconName } from "@/components/Icon";

export type NavLink = { href: string; label: string };
export type NavSection = NavLink & { icon: IconName; children: NavLink[] };

export const MPD_HREF = "/mandatory-public-disclosure";

// One entry per section of the CBSE website requirements. The header, footer and each page's side menu read from here.
export const sections: Record<string, NavSection> = {
  about: {
    href: "/about", label: "About Us", icon: "info", children: [
      { href: "/about", label: "School Overview" },
      { href: "/about/vision-mission", label: "Vision & Mission" },
      { href: "/about/principal-message", label: "Principal's Message" },
      { href: "/about/management", label: "Management Team" },
      { href: "/about/cbse-affiliation", label: "CBSE Affiliation" },
    ],
  },
  academics: {
    href: "/academics", label: "Academics", icon: "book", children: [
      { href: "/academics", label: "Curriculum Details" },
      { href: "/academics/subjects", label: "Subjects Offered" },
      { href: "/academics/assessment", label: "Assessment Structure" },
      { href: "/academics/exam-schedule", label: "Examination Schedule" },
      { href: "/academics/results", label: "Results" },
      { href: "/academic-calendar", label: "Academic Calendar" },
    ],
  },
  admissions: {
    href: "/admissions", label: "Admissions", icon: "building", children: [
      { href: "/admissions", label: "Admission Procedure" },
      { href: "/admissions/eligibility", label: "Eligibility Criteria" },
      { href: "/admissions/registration", label: "Registration Forms" },
      { href: "/admissions/fee-structure", label: "Fee Structure" },
      { href: "/admissions/important-dates", label: "Important Dates" },
    ],
  },
  infrastructure: {
    href: "/infrastructure", label: "Campus", icon: "home", children: [
      { href: "/infrastructure", label: "Overview" },
      { href: "/infrastructure/classrooms", label: "Classrooms" },
      { href: "/infrastructure/library", label: "Library" },
      { href: "/infrastructure/laboratories", label: "Laboratories" },
      { href: "/infrastructure/sports", label: "Sports Complex" },
      { href: "/infrastructure/transport", label: "Transport Facility" },
      { href: "/infrastructure/canteen", label: "Canteen" },
    ],
  },
  studentLife: {
    href: "/student-life/clubs", label: "Student Life", icon: "star", children: [
      { href: "/student-life/clubs", label: "Clubs & Societies" },
      { href: "/student-life/events", label: "Events & Celebrations" },
      { href: "/student-life/student-council", label: "Student Council" },
      { href: "/student-life/achievements", label: "Achievements" },
      { href: "/gallery", label: "Photo Gallery" },
      { href: "/gallery/videos", label: "Video Gallery" },
    ],
  },
  cbse: {
    href: "/cbse/affiliation", label: "CBSE", icon: "cap", children: [
      { href: "/cbse/affiliation", label: "Affiliation Details" },
      { href: "/cbse/circulars", label: "Circulars & Notifications" },
      { href: MPD_HREF, label: "Mandatory Public Disclosure" },
      { href: "/cbse/syllabus", label: "Syllabus" },
    ],
  },
  parents: {
    href: "/parents/ptm", label: "Parents", icon: "heart", children: [
      { href: "/parents/ptm", label: "Parent-Teacher Meetings" },
      { href: "/parents/portal", label: "Parent Portal" },
      { href: "/parents/guidelines", label: "Guidelines for Parents" },
      { href: "/parents/feedback", label: "Feedback & Queries" },
      { href: "/academic-calendar", label: "Academic Calendar" },
    ],
  },
  downloads: {
    href: "/downloads/circulars", label: "Downloads", icon: "download", children: [
      { href: "/downloads/circulars", label: "Circulars & Notices" },
      { href: "/downloads/study-material", label: "Study Materials" },
      { href: "/downloads/forms", label: "Forms & Applications" },
      { href: "/downloads/policies", label: "Policies" },
    ],
  },
  gallery: {
    href: "/gallery", label: "Gallery", icon: "camera", children: [
      { href: "/gallery", label: "Photo Gallery" },
      { href: "/gallery/videos", label: "Video Gallery" },
    ],
  },
  alumni: {
    href: "/alumni", label: "Alumni", icon: "cap", children: [
      { href: "/alumni", label: "Notable Alumni & Events" },
      { href: "/alumni/register", label: "Alumni Registration" },
    ],
  },
  careers: {
    href: "/careers", label: "Careers", icon: "pen", children: [
      { href: "/careers", label: "Current Vacancies" },
      { href: "/careers/apply", label: "Apply Online" },
    ],
  },
  contact: { href: "/contact", label: "Contact", icon: "phone", children: [] },
};

// Main menu (dropdowns on desktop, accordion on mobile).
export const mainNav: NavSection[] = [
  { href: "/", label: "Home", icon: "home", children: [] },
  sections.about,
  sections.academics,
  sections.admissions,
  sections.infrastructure,
  sections.studentLife,
  sections.cbse,
  sections.parents,
  sections.contact,
];

// Links in the dark toolbar above the menu.
export const toolbarNav: NavLink[] = [
  { href: MPD_HREF, label: "Mandatory Public Disclosure" },
  { href: "/downloads/circulars", label: "Downloads" },
  { href: "/gallery", label: "Gallery" },
  { href: "/alumni", label: "Alumni" },
  { href: "/careers", label: "Careers" },
];

// Quick links band on the home page.
export const quickLinks: (NavLink & { icon: IconName })[] = [
  { href: MPD_HREF, label: "Mandatory Public Disclosure", icon: "shield" },
  { href: "/admissions", label: "Admissions", icon: "building" },
  { href: "/academics/results", label: "Results", icon: "chart" },
  { href: "/admissions/fee-structure", label: "Fee Structure", icon: "rupee" },
  { href: "/academic-calendar", label: "Academic Calendar", icon: "calendar" },
  { href: "/downloads/circulars", label: "Circulars", icon: "download" },
  { href: "/contact", label: "Contact Us", icon: "phone" },
];

export const isExternal = (href: string) => /^https?:\/\//.test(href);
export const ext = (href: string) => (isExternal(href) ? { target: "_blank", rel: "noopener" } : {});
