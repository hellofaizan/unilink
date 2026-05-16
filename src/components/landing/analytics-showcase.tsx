"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Globe2, Link2, MousePointerClick, Users } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartData = [
  { day: "Mon", views: 420, clicks: 89 },
  { day: "Tue", views: 580, clicks: 124 },
  { day: "Wed", views: 510, clicks: 98 },
  { day: "Thu", views: 720, clicks: 156 },
  { day: "Fri", views: 890, clicks: 201 },
  { day: "Sat", views: 1100, clicks: 278 },
  { day: "Sun", views: 980, clicks: 245 },
];

const chartConfig = {
  views: { label: "Page views", color: "var(--chart-1)" },
  clicks: { label: "Link clicks", color: "var(--chart-4)" },
} satisfies ChartConfig;

const stats = [
  { label: "Page views", value: "12.4k", icon: Users, change: "+18%" },
  { label: "Link clicks", value: "3.2k", icon: MousePointerClick, change: "+24%" },
  { label: "Top country", value: "US", icon: Globe2, change: "32%" },
  { label: "Active links", value: "18", icon: Link2, change: "Live" },
];

const breakdowns = [
  {
    title: "Top referrers",
    items: [
      { name: "Instagram", pct: 42 },
      { name: "X / Twitter", pct: 28 },
      { name: "Direct", pct: 18 },
      { name: "Google", pct: 12 },
    ],
  },
  {
    title: "Devices",
    items: [
      { name: "Mobile", pct: 68 },
      { name: "Desktop", pct: 26 },
      { name: "Tablet", pct: 6 },
    ],
  },
  {
    title: "Top locations",
    items: [
      { name: "United States", pct: 35 },
      { name: "United Kingdom", pct: 14 },
      { name: "India", pct: 12 },
      { name: "Canada", pct: 9 },
    ],
  },
];

export function AnalyticsShowcase() {
  return (
    <section id="analytics" className="w-full border-y border-border/40 bg-muted/20 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <BlurFade inView>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Analytics
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Statistics at a glance
            </h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              See what&apos;s working with visits, clicks, referrers, and
              geography right in your dashboard.
            </p>
          </div>
        </BlurFade>

        <BlurFade inView delay={0.1} className="mt-12">
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
            <div className="grid grid-cols-2 gap-px border-b border-border/60 bg-border/40 sm:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col gap-2 bg-card px-5 py-5 sm:px-6 sm:py-6"
                >
                  <div className="flex items-center justify-between">
                    <stat.icon className="h-4 w-4 text-primary" />
                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      {stat.change}
                    </span>
                  </div>
                  <span className="text-2xl font-bold tracking-tight sm:text-3xl">
                    {stat.value}
                  </span>
                  <span className="text-xs text-muted-foreground sm:text-sm">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 md:p-6">
              <p className="mb-4 text-sm font-medium text-muted-foreground">
                Last 7 days
              </p>
              <ChartContainer config={chartConfig} className="h-[280px] w-full">
                <AreaChart data={chartData} margin={{ left: 0, right: 8, top: 8 }}>
                  <defs>
                    <linearGradient id="fillViews" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="var(--color-views)"
                        stopOpacity={0.35}
                      />
                      <stop
                        offset="100%"
                        stopColor="var(--color-views)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} strokeDasharray="4 4" />
                  <XAxis
                    dataKey="day"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis tickLine={false} axisLine={false} width={36} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="var(--color-views)"
                    fill="url(#fillViews)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="clicks"
                    stroke="var(--color-clicks)"
                    fill="transparent"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </div>
        </BlurFade>        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {breakdowns.map((block, i) => (
            <BlurFade key={block.title} inView delay={0.05 * i}>
              <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
                <h3 className="font-semibold">{block.title}</h3>
                <ul className="mt-4 space-y-3">
                  {block.items.map((row) => (
                    <li key={row.name}>
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="text-muted-foreground">{row.name}</span>
                        <span className="font-medium">{row.pct}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${row.pct}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
