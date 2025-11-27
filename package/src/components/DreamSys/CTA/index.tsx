"use client";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import content from "@/data/content.json";
import { useHasMounted } from "@/hooks/useHasMounted";

const CTASection = () => {
  const hasMounted = useHasMounted();
  const { cta } = content.home;

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
        <motion.div
          {...(hasMounted
            ? {
                initial: { opacity: 0, y: 30 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { duration: 0.6 }
              }
            : {}
          )}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="md:text-40 text-28 font-bold text-white mb-6">
            {cta.title}
          </h2>
          <p className="text-19 text-white text-opacity-90 mb-8 leading-relaxed">
            {cta.subtitle}
          </p>
          <Link
            href={cta.button.url}
            className="inline-flex items-center gap-3 bg-orange-500 text-white py-5 px-10 rounded-lg border-2 border-orange-500 hover:bg-orange-600 hover:border-orange-600 transition-all font-bold text-18 shadow-2xl"
          >
            <Icon icon="mdi:video-check" width="28" height="28" />
            {cta.button.text}
            <Icon icon="solar:alt-arrow-right-linear" width="24" height="24" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
