"use client";

import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Cpu,
  Laptop,
  Monitor,
  MonitorSmartphone,
  Smartphone,
  Tablet,
} from "lucide-react";
import { PieChart } from "@mui/x-charts/PieChart";

type DeviceDatum = {
  device: string | null;
  _count?: {
    id: number;
  };
  count?: number;
};

export default function Devices({ data }: { data: DeviceDatum[] }) {
  const normalized = [...data]
    .map((item) => {
      const key = (item.device || "unknown").toLowerCase();
      const value = item._count?.id ?? item.count ?? 0;
      const label = key.charAt(0).toUpperCase() + key.slice(1);

      return {
        device: item.device || "Unknown",
        key,
        value,
        label,
      };
    })
    .sort((a, b) => b.value - a.value);

  const total = normalized.reduce((acc, curr) => acc + curr.value, 0);

  const percentage = (value: number) => {
    if (!total) return "0.0";
    return ((value / total) * 100).toFixed(0);
  };

  const icons = (deviceKey: string) => {
    switch (deviceKey.toLowerCase()) {
      case "mobile":
        return <Smartphone className="h-4 w-4" />;
      case "desktop":
        return <Monitor className="h-4 w-4" />;
      case "tablet":
        return <Tablet className="h-4 w-4" />;
      case "laptop":
        return <Laptop className="h-4 w-4" />;
      default:
        return <MonitorSmartphone className="h-4 w-4" />;
    }
  };

  const customPalette = [
    "#ffc758",
    "#495afb",
    "#f35865",
    "#44ce8d",
    "#2731C8",
    "#03008D",
  ];

  return (
    <Card className="flex flex-col border border-border/60 shadow-sm pt-0">
      <CardContent className="flex flex-col gap-4 pt-0">
        <div className="flex flex-col items-center text-start">
          <div className="w-full flex gap-2 items-center mt-4 font-medium">
            <Cpu className="h-5 w-5" />
            Devices
          </div>
          <div className="flex items-center pt-0">
            <PieChart
              className="flex relative items-center"
              hideLegend={true}
              series={[
                {
                  data: normalized,
                  innerRadius: 40,
                  outerRadius: 100,
                  paddingAngle: 2,
                  cornerRadius: 8,
                  startAngle: -90,
                  endAngle: 90,
                  cx: 150,
                  cy: 125,
                },
              ]}
              colors={customPalette}
              width={270}
              height={150}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 text-xs">
          {normalized.map((item) => (
            <div
              key={item.device}
              className="flex items-center justify-between rounded-sm px-2 py-1 hover:bg-muted/60"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor:
                      customPalette[
                        normalized.indexOf(item) % customPalette.length
                      ],
                  }}
                />
                {icons(item.key)}
                <span className="capitalize text-muted-foreground">
                  {item.device}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm">
                  {item.value.toLocaleString()}
                </span>
                <Separator orientation="vertical" className="h-4" />
                <span className="w-8 text-right text-[10px] text-muted-foreground">
                  {percentage(item.value)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
