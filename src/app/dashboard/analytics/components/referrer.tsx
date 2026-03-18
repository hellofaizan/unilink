import React from "react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, Link2 } from "lucide-react";
import Link from "next/link";

type ReferrerDatum = {
  referrer: string | null;
  _count?: {
    id: number;
  };
};

export default function Referrer({ data }: { data: ReferrerDatum[] }) {
  const linkIcon = (link: string) => {
    try {
      link = link.replace(/^(https?:\/\/)?(www\.)?/, "");
      return (
        <img
          src={`https://icons.duckduckgo.com/ip3/${link}.ico`}
          className="h-5 w-5 rounded-md"
          alt={`favicon for ${link}`}
        />
      );
    } catch (error) {
      return (
        <img
          src="/favicon.ico"
          className="h-5 w-5 rounded-md"
          alt={`favicon for ${link}`}
        />
      );
    }
  };

  const percentage = (count: number) => {
    const total = data.reduce(
      (acc: number, item: any) => acc + item._count.id,
      0,
    );
    return total ? ((count / total) * 100).toFixed(0) : "0";
  };
  return (
    <Card className="flex flex-col border border-border/60 shadow-sm pt-0">
      <CardContent className="flex flex-col gap-4 pt-0">
        <div className="flex flex-col items-center text-start">
          <div className="w-full flex gap-2 items-center mt-4 font-medium">
            <ArrowUpRight className="h-5 w-5" />
            Referrers
          </div>
          <div className="flex items-center flex-col gap-2 pt-2 w-full">
            <div className="grid grid-cols-12 border-b px-2 py-2 text-xs uppercase w-full text-muted-foreground">
              <div className="col-span-7">Sources</div>
              <div className="col-span-3 text-right">Clicks</div>
              <div className="col-span-2 text-right">%age</div>
            </div>

            {data.length < 1 && (
              <div className="flex h-20 w-full items-center justify-center text-sm text-muted-foreground">
                No referrer data available.
              </div>
            )}

            {data.map((item, index) => (
              <Link
                href={`https://${item.referrer || "#"}`}
                key={index}
                className="grid grid-cols-12 items-center w-full px-2 py-1 rounded-md hover:bg-muted/60 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="col-span-7 flex items-center gap-2">
                  {linkIcon(item.referrer || "")}
                  <span className="truncate text-md">{item.referrer || "Direct"}</span>
                </div>
                <div className="col-span-3 text-right">
                  {item._count?.id.toLocaleString() || "0"}
                </div>
                <div className="col-span-2 text-right text-sm text-muted-foreground">
                  {percentage(item._count?.id || 0)}%
                </div>
              </Link>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
