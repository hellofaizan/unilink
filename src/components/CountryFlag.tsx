"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Globe2Icon } from "lucide-react";

export default function CountryFlag({ countryName }: { countryName: string }) {
  const [countryCode, setCountryCode] = useState<string>("");
  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${countryName}`)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          const countryData = response.data[0];
          setCountryCode(countryData.cca2);
        }
      })
      .catch((error) => {
        console.error("Error fetching country data:", error);
      });
  });

  if (countryName == "United States") {
    return (
      <img
        src={`https://flagsapi.com/US/flat/64.png`}
        className="h-5 w-6 rounded-md"
        alt={countryCode}
        title={`${countryName} (${countryCode})`}
      />
    );
  }

  if (countryCode) {
    return (
      <img
        src={`https://flagsapi.com/${countryCode}/flat/64.png`}
        className="h-5 w-6 rounded-md"
        alt={countryCode}
        title={`${countryName} (${countryCode})`}
      />
    );
  }
  return <Globe2Icon className="h-5 w-6 text-muted-foreground" />;
}
