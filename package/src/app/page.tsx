import React from "react";
import { Metadata } from "next";
import DreamSysHero from "@/components/DreamSys/Hero";
import ProblemSection from "@/components/DreamSys/Problem";
import ServicesPreview from "@/components/DreamSys/ServicesPreview";
import CTASection from "@/components/DreamSys/CTA";

export const metadata: Metadata = {
  title: "DreamSys Technologies - Your Digital Property Manager",
  description: "Stop losing local customers to your competitors. We manage, fix, and rank your digital presence so you show up #1 on Google Maps.",
};

export default function Home() {
  return (
    <main>
      <DreamSysHero />
      <ProblemSection />
      <ServicesPreview />
      <CTASection />
    </main>
  );
}
