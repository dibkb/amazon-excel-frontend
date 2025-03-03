import { useEffect } from "react";

import { useState } from "react";

export const useFetchLocation = () => {
  const [location, setLocation] = useState<{
    city: string;
    country: string;
    latitude: string;
    longitude: string;
  } | null>(null);
  useEffect(() => {
    const fetchLocation = async () => {
      const ip = await fetch("https://api.ipify.org?format=json", {
        cache: "no-store",
      });
      const ipData = await ip.json();
      const response = await fetch(`/api/get-ip?ip=${ipData.ip}`);
      const data = await response.json();
      setLocation(data);
    };
    fetchLocation();
  }, []);
  if (!location) {
    return {
      city: "Unknown",
      country: "Unknown",
      latitude: "Unknown",
      longitude: "Unknown",
    };
  }
  return location;
};
