/* ===================================================================
   METRO PERFORMANCE DASHBOARD — CONFIG
   This is the ONLY file you should need to edit after deployment.

   1. Deploy the Apps Script project in /apps-script/Code.gs as a
      Web App (see /docs/SETUP.md) and paste the resulting URL below.
   2. Optionally adjust the auto-refresh interval.
   =================================================================== */
const CONFIG = {
  // Paste your Google Apps Script Web App URL here.
  // It looks like: https://script.google.com/macros/s/AKfycb.../exec
 DATA_SOURCE_URL: "https://script.google.com/macros/s/AKfycbwJhF8X14DsbwBr4kL6lULcfmWYZC1NVD6LdmhlXHTFCKugRJ5jme-L8favIZSmwPlB/exec",
  // How often (in minutes) the dashboard silently re-fetches data in
  // the background so open tabs pick up sheet edits automatically.
  // Set to 0 to disable auto-refresh (data still loads fresh on every
  // page load / manual browser refresh).
  REFRESH_INTERVAL_MINUTES: 15,

  APP_TITLE: "Metro by T-Mobile — Refund Dashboard"
};
