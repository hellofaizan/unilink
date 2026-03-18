import React from "react";
import { currentUser } from "@/server/user";
import {
  ViewsByCountry,
  ViewsByDevice,
  ViewsByReferrer,
  ViewsPast30Days,
} from "@/action/getAnalytics";
import PageVisitGraph from "./components/graph";
import Devices from "./components/devices";
import Referrer from "./components/referrer";
import Country from "./components/country";

export default async function page() {
  const user = await currentUser();
  const data = await ViewsPast30Days({ userId: user?.id || "" });

  const devicedata = await ViewsByDevice({ userId: user?.id || "" });
  const referrerdata = await ViewsByReferrer({ userId: user?.id || "" });
  const countrydata = await ViewsByCountry({ userId: user?.id || "" });

  return (
    <div className="flex max-w-280 mx-auto flex-col gap-6 md:max-w-300">
      <PageVisitGraph className="w-full" data={data || []} />
      <div className="grid min-h-75 w-full grid-cols-1 gap-2 md:grid-cols-3">
        <Devices data={devicedata || []} />
        <Referrer data={referrerdata || []} />
        <Country data={countrydata || []} />
      </div>
    </div>
  );
}
