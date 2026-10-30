/**
 * Google Apps Script — Web App endpoint for Sevan restaurant orders.
 *
 * SETUP INSTRUCTIONS:
 * ───────────────────
 * 1. Open Google Sheets → Extensions → Apps Script.
 * 2. Replace the default Code.gs content with this entire file.
 * 3. Click "Deploy" → "New deployment".
 * 4. Set type = "Web app".
 * 5. Set "Execute as" = Me (your account).
 * 6. Set "Who has access" = Anyone.
 * 7. Click "Deploy" and copy the Web App URL.
 * 8. Paste the URL into `src/components/Checkout.jsx` as the value
 *    of `GOOGLE_SCRIPT_URL`.
 *
 * The spreadsheet should have these column headers in row 1:
 *   Order ID | Order Date & Time | Customer Name | Phone Number |
 *   Ordered Items | Customizations | Quantity | Subtotals |
 *   Total Amount | Payment Method | Payment Status | Order Status
 */

// ──────────────────────────────────────────
// The Sheet ID is extracted from the URL you provided.
const SPREADSHEET_ID = '1ZIId-GQL0KQLKqNA5FF1BTMGScp-hBUpQBefB9WivDs';
const SHEET_NAME = 'Sheet1'; // Change if your tab has a different name

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);

    // If headers don't exist yet, create them
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Order ID',
        'Order Date & Time',
        'Customer Name',
        'Phone Number',
        'Ordered Items',
        'Customizations',
        'Quantity',
        'Subtotals',
        'Total Amount',
        'Payment Method',
        'Payment Status',
        'Order Status',
      ]);
    }

    sheet.appendRow([
      data.orderId,
      data.orderDateTime,
      data.customerName,
      data.phone,
      data.orderedItems,
      data.customizations,
      data.quantities,
      data.itemSubtotals,
      data.totalAmount,
      data.paymentMethod,
      data.paymentStatus,
      data.orderStatus,
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ status: 'success', orderId: data.orderId })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'error', message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (for testing)
function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: 'ok',
      message: 'Sevan order endpoint is active.',
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

