import dotenv from "dotenv";
import { NextRequest, NextResponse } from "next/server";
dotenv.config();

export async function GET(req: NextRequest) {
  const ip = req.nextUrl.searchParams.get("ip");
  const locationResponse = await fetch(
    `https://ipinfo.io/${ip}?token=${process.env.NEXT_PUBLIC_IPINFO_TOKEN}`
  );
  const locationData = await locationResponse.json();

  return new NextResponse(
    JSON.stringify({
      city: locationData.city,
      country: locationData.country_name,
      latitude: locationData.loc.split(",")[0],
      longitude: locationData.loc.split(",")[1],
    })
  );
}
