import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    bizName: process.env.BUSINESS_NAME || "Your Business",
    twilioConfigured: Boolean(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER),
    twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER || null,
    databaseConfigured: Boolean(process.env.DATABASE_URL),
  });
}
