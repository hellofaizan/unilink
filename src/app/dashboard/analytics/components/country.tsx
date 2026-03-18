import CountryFlag from "@/components/CountryFlag";
import { Card, CardContent } from "@/components/ui/card";
import { Globe2 } from "lucide-react";
import React from "react";

type CountryDatum = {
  country: string | null;
  _count?: {
    id: number;
  };
  count?: number;
};

export default function Country({ data }: { data: CountryDatum[] }) {
  console.log("Country data:", data);

  const percentage = (count: number) => {
    const total = data.reduce(
      (acc: number, item: any) => acc + item._count.id,
      0,
    );
    return total ? ((count / total) * 100).toFixed(0) : "0";
  };
  return (
    <Card className="flex flex-col border shadow-sm pt-0">
      <CardContent className="flex flex-col gap-4 pt-0">
        <div className="flex flex-col items-center text-start">
          <div className="w-full flex gap-2 items-center mt-4 font-medium">
            <Globe2 className="h-5 w-5" />
            Country
          </div>
          <div className="flex items-center flex-col gap-2 pt-2 w-full">
            <div className="grid grid-cols-12 border-b px-2 py-2 text-xs uppercase w-full text-muted-foreground">
              <div className="col-span-7">Country</div>
              <div className="col-span-3 text-right">Count</div>
              <div className="col-span-2 text-right">%age</div>
            </div>

            {data.length < 1 && (
              <div className="flex h-20 w-full items-center justify-center text-sm text-muted-foreground">
                No country data available.
              </div>
            )}

            {data.map((item, index) => (
              <div
                className="grid grid-cols-12 items-center w-full px-2 py-1 rounded-md hover:bg-muted/60 transition-colors"
                key={index}
              >
                <div className="col-span-7 flex items-center gap-2">
                  <CountryFlag countryName={item.country || "Unknown"} />
                  <span className="truncate text-md">{item.country || "Unknown"}</span>
                </div>
                <div className="col-span-3 text-right">
                  {item._count?.id || 0}
                </div>
                <div className="col-span-2 text-right text-sm text-muted-foreground">
                  {percentage(item._count?.id || 0)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
