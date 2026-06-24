import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(req, { params }) {
  const { id } = params;
  const body = await req.json();
  const data = {};

  if (typeof body.autoTexts === "boolean") data.autoTexts = body.autoTexts;
  if (typeof body.reengageStatus === "string") data.reengageStatus = body.reengageStatus;

  if (Object.keys(data).length > 0) {
    await db.client.update({ where: { id }, data });
  }

  if (body.appointmentStatus) {
    await db.appointment.update({ where: { clientId: id }, data: { status: body.appointmentStatus } });
  }

  const fresh = await db.client.findUnique({
    where: { id },
    include: { appointment: true, history: { orderBy: { date: "asc" } }, messages: { orderBy: { createdAt: "asc" } } },
  });
  return NextResponse.json(fresh);
}

export async function DELETE(req, { params }) {
  const { id } = params;
  await db.client.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
