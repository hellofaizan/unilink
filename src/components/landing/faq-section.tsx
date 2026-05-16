"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BlurFade } from "@/components/ui/blur-fade";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "What is Unilink?",
    a: "Unilink is a link-in-bio platform that lets you share all your important links, social profiles, and content from one beautiful, mobile-friendly page.",
  },
  {
    q: "Is Unilink free to use?",
    a: "Yes. You can get started on the free plan with unlimited links, social connections, and basic analytics. Premium features are available on paid plans.",
  },
  {
    q: "How do I get my custom URL?",
    a: "After signing up, choose a unique username during onboarding or in profile settings. Your public page will be available at your chosen handle.",
  },
  {
    q: "Can I track who visits my page?",
    a: "Your analytics dashboard shows page visits, link clicks, referrers, devices, and geographic data so you can understand your audience.",
  },
  {
    q: "Which social platforms are supported?",
    a: "Unilink supports 40+ platforms including YouTube, Instagram, X, Spotify, GitHub, Twitch, LinkedIn, and many more—with branded icons on your profile.",
  },
  {
    q: "Can I reorder my links?",
    a: "Absolutely. Use drag-and-drop in the dashboard to reorder links, collections, and social icons. Changes appear on your live page instantly.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="w-full py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 md:px-8">
        <BlurFade inView className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            FAQ
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Questions? We&apos;ve got answers.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Everything you need to know before launching your page.
          </p>
        </BlurFade>

        <BlurFade inView delay={0.15} className="mt-12">
          <Accordion
            type="single"
            collapsible
            className="w-full rounded-2xl border border-border/60 bg-card px-2 md:px-4"
          >
            {faqs.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`item-${i}`}
                className={cn("px-2 md:px-4", i === 0 && "border-t-0")}
              >
                <AccordionTrigger className="text-left text-base font-medium hover:no-underline md:text-lg">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </BlurFade>
      </div>
    </section>
  );
}
