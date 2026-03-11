"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

const chartConfig = {
  visits: {
    label: "Page Views",
  },
  views: {
    label: "Views",
    color: "var(--chart-1)",
  },
  unique: {
    label: "Unique",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

export default function PageVisitGraph({
  className,
  data,
}: {
  className?: string;
  data: Array<{ date: string; views: number; unique: number }>;
}) {
  const parsedData = React.useMemo(() => {
    return [...data]
      .reverse()
      .map((item) => {
        const [year, month, day] = item.date.split("-").map(Number);
        const date = new Date(year, month - 1, day);
        return {
          ...item,
          date,
        };
      });
  }, [data]);

  const total = React.useMemo(
    () => ({
      views: data.reduce((acc, curr) => acc + curr.views, 0),
      unique: data.reduce((acc, curr) => acc + curr.unique, 0),
    }),
    [data],
  );

  return (
    <Card className="py-2 sm:py-0 w-full">
      <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row w-full">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle>Analytics</CardTitle>
          <CardDescription>
            Total visitors for the last 1 month
          </CardDescription>
        </div>
        <div className="flex">
          {(["views", "unique"] as const).map((metric) => (
            <div
              key={metric}
              className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
            >
              <span className="text-xs font-medium uppercase text-muted-foreground">
                {chartConfig[metric].label}
              </span>
              <span className="text-lg leading-none font-bold sm:text-3xl">
                {total[metric].toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-4">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto md:h-62.5 h-48 w-full"
        >
          <LineChart
            accessibilityLayer
            data={parsedData}
            margin={{
              left: 15,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={10}
              tickFormatter={(value) => {
                if (value instanceof Date) {
                  return value.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-37.5"
                  labelFormatter={(_, payload) => {
                    if (!payload?.length) return "";
                    const first = payload[0];
                    const rawDate =
                      (first.payload as any)?.date ??
                      (first.payload as any)?.dateString;

                    const date =
                      rawDate instanceof Date
                        ? rawDate
                        : rawDate
                        ? new Date(rawDate)
                        : null;

                    if (!date || isNaN(date.getTime())) return "";

                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            {/* Visible line: Views */}
            <Line
              dataKey="views"
              type="monotone"
              stroke={`var(--color-views)`}
              strokeWidth={2}
              dot={false}
            />
            {/* Invisible line used only so the tooltip can also show Unique counts */}
            <Line
              dataKey="unique"
              type="monotone"
              stroke={`var(--color-unique)`}
              strokeWidth={0}
              dot={false}
              strokeOpacity={0}
              activeDot={false as any}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
