import type { Field } from "./fields";

// Fields for the two key/value blocks in site_content.

export const SETTINGS_FIELDS: { title: string; fields: Field[] }[] = [
  {
    title: "School",
    fields: [
      { name: "name", label: "Full name of the school", type: "text", required: true },
      { name: "short", label: "Short name (logo)", type: "text", required: true, half: true },
      { name: "society", label: "Run by (society / trust)", type: "text", half: true },
      { name: "schoolType", label: "Type of school", type: "text", half: true },
      { name: "medium", label: "Medium of instruction", type: "text", half: true },
    ],
  },
  {
    title: "CBSE affiliation",
    fields: [
      { name: "board", label: "Board", type: "text", half: true },
      { name: "affiliation", label: "Affiliation number", type: "text", required: true, half: true },
      { name: "schoolCode", label: "School code", type: "text", half: true },
      { name: "udise", label: "UDISE code", type: "text", half: true },
      { name: "affiliationYear", label: "Year of affiliation", type: "text", half: true },
      { name: "affiliationStatus", label: "Affiliation status", type: "text", placeholder: "Regular / Provisional", half: true },
      { name: "affiliationValidity", label: "Affiliation valid up to", type: "text", placeholder: "31.03.2030", half: true },
    ],
  },
  {
    title: "Principal",
    fields: [
      { name: "principalName", label: "Principal's name", type: "text", required: true, half: true },
      { name: "principalQualification", label: "Principal's qualification", type: "text", placeholder: "M.A., M.Ed., Ph.D.", half: true },
    ],
  },
  {
    title: "Contact",
    fields: [
      { name: "phone", label: "Office phone (landline)", type: "text", required: true, half: true },
      { name: "mobile", label: "Mobile", type: "text", half: true },
      { name: "email", label: "School email", type: "text", required: true, half: true },
      { name: "admissionsEmail", label: "Admissions email (optional)", type: "text", half: true },
      { name: "address", label: "Address", type: "text", required: true },
      { name: "pin", label: "PIN code", type: "text", required: true, half: true },
      { name: "landmark", label: "Landmark", type: "text", half: true },
      { name: "officeHours", label: "Office timings", type: "text" },
      { name: "visitingHours", label: "Visiting hours", type: "text" },
      { name: "mapsUrl", label: "Google Maps link", type: "url" },
    ],
  },
  {
    title: "Admissions & links",
    fields: [
      { name: "admissionBanner", label: "Blinking banner in the top bar", type: "text", help: "Leave empty to hide it.", placeholder: "Admission Open 2027–28" },
      { name: "admissionCtaTitle", label: "Admission band heading (home page)", type: "text" },
      { name: "admissionCtaText", label: "Admission band text", type: "textarea" },
      { name: "registrationUrl", label: "Online registration link", type: "url" },
      { name: "parentPortalUrl", label: "Parent portal (ERP) login link", type: "url" },
      { name: "facebook", label: "Facebook page", type: "url", half: true },
      { name: "instagram", label: "Instagram", type: "url", half: true },
      { name: "youtube", label: "YouTube channel", type: "url", half: true },
    ],
  },
];

export const MPD_FIELDS: { title: string; fields: Field[] }[] = [
  {
    title: "D. Staff (Teaching)",
    fields: [
      { name: "totalTeachers", label: "Total no. of teachers", type: "text", half: true },
      { name: "pgt", label: "PGT", type: "text", half: true },
      { name: "tgt", label: "TGT", type: "text", half: true },
      { name: "prt", label: "PRT", type: "text", half: true },
      { name: "teacherSectionRatio", label: "Teachers section ratio", type: "text", placeholder: "1.5 : 1", half: true },
      { name: "specialEducator", label: "Details of special educator", type: "text", half: true },
      { name: "counsellor", label: "Details of counsellor and wellness teacher", type: "text" },
    ],
  },
  {
    title: "E. School Infrastructure",
    fields: [
      { name: "campusArea", label: "Total campus area (in sq. metres)", type: "text", half: true },
      { name: "internet", label: "Internet facility (Y/N)", type: "select", options: [["Yes", "Yes"], ["No", "No"]], half: true },
      { name: "classrooms", label: "No. and size of classrooms (in sq. metres)", type: "text", placeholder: "60 rooms, 50 sq. m each" },
      { name: "laboratories", label: "No. and size of laboratories incl. computer labs (in sq. metres)", type: "text" },
      { name: "girlsToilets", label: "No. of girls' toilets", type: "text", half: true },
      { name: "boysToilets", label: "No. of boys' toilets", type: "text", half: true },
      { name: "inspectionVideo", label: "YouTube link of the school inspection video", type: "url" },
    ],
  },
];
