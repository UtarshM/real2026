import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { purpose, propertyType, category, bhk, city, locality, minBudget, maxBudget, name, phone, email, contactTime, notes } = body;

    if (!name || !phone || !email) {
      return NextResponse.json(
        { success: false, error: "Name, phone number, and email are required fields." },
        { status: 400 }
      );
    }

    const requirementRecord = {
      id: "req_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5),
      purpose: purpose || "BUY",
      propertyType: propertyType || "RESIDENTIAL",
      category: category || "Apartment",
      bhk: bhk || "3 BHK",
      city: city || "Ahmedabad",
      locality: locality || "Bopal",
      minBudget: minBudget ? parseFloat(minBudget) : 5000000,
      maxBudget: maxBudget ? parseFloat(maxBudget) : 15000000,
      name,
      phone,
      email,
      contactTime: contactTime || "Anytime",
      notes: notes || "",
      status: "NEW",
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: "Your property requirement has been registered successfully! Our specialist team will get in touch shortly.",
      data: requirementRecord,
    });
  } catch (error) {
    console.error("Error saving requirement:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process requirement submission" },
      { status: 500 }
    );
  }
}
