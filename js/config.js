/* ============================================================
   IC Portal — Central configuration
   ------------------------------------------------------------
   This is the ONLY file you should need to edit when connecting
   real Google Sheets. Every page reads its data source from here.

   HOW TO CONNECT A GOOGLE SHEET
   ------------------------------------------------------------
   1. Build a small Google Apps Script "Web App" for each sheet
      (see README.md → "Connecting Google Sheets" for the exact
      script to paste in). Deploy it and copy the /exec URL.
   2. Paste that URL as the matching endpoint below, replacing
      the "local" placeholder.
   3. Set the matching USE_LOCAL_DATA flag (below) to false.
   That's it — no other file needs to change.
   ============================================================ */

const IC_CONFIG = {

  // Committee contact links — replace placeholders with real values.
  // Until real links are supplied, these stay as clearly marked placeholders.
  committee: {
    email: "internshipcommittee@iimrohtak.ac.in", // TODO: confirm official IC email
    emailIsPlaceholder: true,
    linkedin: "https://www.linkedin.com/company/ic-iim-rohtak/", // TODO: confirm official IC LinkedIn URL
    linkedinIsPlaceholder: true
  },

  // Logo asset used across the site (sidebar + homepage 3D signature).
  logo: "assets/logo.png",

  // While true, the data-adapter reads bundled local JSON files in /data
  // (works with zero setup, perfect for GitHub Pages + previewing).
  // Flip to false per-source once that source's Apps Script endpoint is live.
  useLocalData: {
    courses: true,
    caseStudies: true,
    githubRepos: true,
    resources: true,
    competitions: true,
    liveProjects: true
  },

  // Local fallback / demo data (bundled with the site, edited by hand
  // only until the real Google Sheet endpoint below is wired up).
  localPaths: {
    courses:        "data/courses.json",
    caseStudies:    "data/case-studies.json",
    githubRepos:    "data/github-repos.json",
    resources:      "data/resources.json",
    competitions:   "data/competitions.json",
    liveProjects:   "data/live-projects.json"
  },

  // Real Google Apps Script Web App endpoints go here.
  // Each should return a JSON array of row objects (see README.md
  // for the exact column headers expected for each sheet).
  endpoints: {
    courses:        "", // e.g. "https://script.google.com/macros/s/XXXX/exec?sheet=courses"
    caseStudies:    "",
    githubRepos:    "",
    resources:      "",
    competitions:   "",
    liveProjects:   ""
  }
};
