"use client";

import { AnalyticsShowcase } from "@/components/landing/analytics-showcase";
import { BentoGridSection } from "@/components/landing/bento-grid-section";
import { CtaBanner } from "@/components/landing/cta-banner";
import { FaqSection } from "@/components/landing/faq-section";
import { HeroShowcase } from "@/components/landing/hero-showcase";
import { HowItWorksSection } from "@/components/landing/how-it-works";
import { IntegrationsSection } from "@/components/landing/integrations-section";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHeader } from "@/components/landing/landing-header";
import { LandingHero } from "@/components/landing/landing-hero";
import { MarqueeSection } from "@/components/landing/marquee-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { PricingStrip } from "@/components/landing/pricing-strip";

export default function LandingPageClient() {
  return (
    <main className="flex w-full flex-col overflow-x-hidden">
      <LandingHeader />
      <LandingHero />
      <HeroShowcase />
      <MarqueeSection />
      <IntegrationsSection />
      <BentoGridSection />
      <AnalyticsShowcase />
      <HowItWorksSection />
      <PricingSection />
      <FaqSection />
      <CtaBanner />
      <LandingFooter />
    </main>
  );
}
