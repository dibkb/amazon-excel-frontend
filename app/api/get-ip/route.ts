export async function GET() {
  const ip = await fetch("https://api.ipify.org?format=json", {
    cache: "no-store",
  });
  const ipData = await ip.json();

  // Get location data from ipapi.co
  const locationResponse = await fetch(`https://ipapi.co/${ipData.ip}/json/`);
  const locationData = await locationResponse.json();

  return new Response(
    JSON.stringify({
      city: locationData.city,
      country: locationData.country_name,
      latitude: locationData.latitude,
      longitude: locationData.longitude,
    })
  );
}
