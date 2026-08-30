/**
 * Google Apps Script to save Enquiry Data into Google Sheet
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open Google Sheets (https://sheets.new)
 * 2. Click "Extensions" -> "Apps Script"
 * 3. Delete any code in Code.gs and paste this ENTIRE code
 * 4. Click "Deploy" (top right) -> "New deployment"
 * 5. Select type: "Web app" (click gear icon next to 'Select type')
 * 6. Set:
 *    - Description: Enquiry Webhook
 *    - Execute as: "Me" (your email)
 *    - Who has access: "Anyone" (CRITICAL: Must be "Anyone" so the website can post data)
 * 7. Click "Deploy", authorize access with your Google account.
 * 8. Copy the "Web app URL" (ends with /exec)
 * 9. Paste that URL in your .env.local file as:
 *    GOOGLE_SHEET_WEBHOOK_URL="https://script.google.com/macros/s/your-id/exec"
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // If sheet is empty, create formatted headers automatically
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Date & Time",
        "Brand",
        "Customer Name",
        "Phone Number",
        "Email Address",
        "Address",
        "Service Requested",
        "Source"
      ]);
      
      var headerRange = sheet.getRange(1, 1, 1, 8);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#1e293b"); // Slate Navy
      headerRange.setFontColor("#ffffff");
      sheet.setFrozenRows(1);
    }
    
    var data = JSON.parse(e.postData.contents);
    
    // Add enquiry row to Google Sheet
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      data.brand || "General",
      data.name || "",
      "'" + (data.phone || ""), // Prepending single quote so phone number keeps leading 0/formatting
      data.email || "",
      data.address || "",
      data.service || "",
      data.source || "Website Form"
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "Enquiry saved successfully" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
