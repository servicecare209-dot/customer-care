import { NextResponse } from 'next/server';
import { brandBookingSchema } from '@/lib/validations/bookingSchema';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const validation = brandBookingSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { brand, name, email, phone, address, service } = validation.data;
    
    // Format timestamp in IST (Indian Standard Time)
    const timestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });

    const leadData = {
      Timestamp: timestamp,
      Brand: brand || body.brand || 'General',
      Name: name,
      Phone: phone,
      Email: email,
      Address: address,
      Service: service,
      Source: body.source || 'Website Lead Form',
    };

    console.log('[BOOK-SERVICE API] New lead enquiry received:', leadData);

    // Pick webhook URL dynamically from .env
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL || process.env.SHEETDB_URL;
    let sheetSaved = false;
    let webhookResult = null;

    if (webhookUrl) {
      try {
        const isSheetDB = webhookUrl.includes('sheetdb.io');
        const payload = isSheetDB ? { data: [leadData] } : leadData;

        const sheetRes = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(payload),
          redirect: 'follow',
        });

        if (sheetRes.ok) {
          sheetSaved = true;
          webhookResult = await sheetRes.json().catch(() => ({}));
          console.log('[BOOK-SERVICE API] Successfully recorded in Google Sheet via Webhook:', webhookResult);
        } else {
          const errorText = await sheetRes.text();
          console.error('[BOOK-SERVICE API] Google Sheet Webhook returned error status:', sheetRes.status, errorText);
        }
      } catch (sheetErr) {
        console.error('[BOOK-SERVICE API] Network error forwarding enquiry to Google Sheet:', sheetErr);
      }
    } else {
      console.warn('[BOOK-SERVICE API] Warning: GOOGLE_SHEET_WEBHOOK_URL is not configured in .env');
    }

    return NextResponse.json({
      success: true,
      message: 'Service request submitted successfully! Our team will contact you shortly.',
      sheetSaved,
      data: leadData,
    });
  } catch (error) {
    console.error('[BOOK-SERVICE API] Internal server error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong while processing your request.',
      },
      { status: 500 }
    );
  }
}
