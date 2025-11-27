"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import content from "@/data/content.json";
import { useHasMounted } from "@/hooks/useHasMounted";

const DreamSysHero = () => {
  const { hero } = content.home;
  const hasMounted = useHasMounted();

  const leftAnimation = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const rightAnimation = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
  };

  return (
    <section className="relative pt-44 pb-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) relative z-1 md:max-w-(--breakpoint-md) px-4">
        <div className="grid grid-cols-12 items-center gap-8">
          <motion.div
            {...(hasMounted ? leftAnimation : { initial: { opacity: 1, x: 0 } })}
            className="lg:col-span-7 col-span-12 text-center lg:text-left"
          >
            <h1 className="md:text-50 sm:text-40 text-35 text-white mb-6 font-bold leading-tight">
              {hero.title}
            </h1>
            <p className="text-20 text-white text-opacity-90 mb-8 leading-relaxed">
              {hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
              <Link
                href={hero.primaryButton.url}
                className="text-17 flex gap-2 items-center bg-orange-500 text-white py-4 px-8 rounded-lg border-2 border-orange-500 hover:bg-orange-600 hover:border-orange-600 transition-all font-semibold shadow-lg"
              >
                {hero.primaryButton.text}
                <Icon icon="solar:alt-arrow-right-linear" width="20" height="20" />
              </Link>
              <Link
                href={hero.secondaryButton.url}
                className="text-17 flex gap-2 items-center bg-transparent text-white py-4 px-8 rounded-lg border-2 border-white hover:bg-white hover:text-blue-900 transition-all font-semibold"
              >
                {hero.secondaryButton.text}
                <Icon icon="solar:alt-arrow-right-linear" width="20" height="20" />
              </Link>
            </div>

            {/* Trust Bar */}
            <div className="mt-12 pt-8 border-t border-white border-opacity-20">
              <p className="text-14 text-white text-opacity-70 mb-4 text-center lg:text-left">
                {hero.trustBar.text}
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
                {hero.trustBar.partners.map((partner, index) => (
                  <div key={index} className="flex items-center gap-2 text-white text-opacity-80">
                    <Icon icon={partner.icon} width="24" height="24" />
                    <span className="text-13 font-medium">{partner.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            {...(hasMounted ? rightAnimation : { initial: { opacity: 1, x: 0 } })}
            className="lg:col-span-5 col-span-12 flex justify-center"
          >
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-3xl blur-3xl opacity-20"></div>
              <Image
                src="/images/hero/hero-image.png"
                alt="Digital Success"
                width={400}
                height={500}
                className="relative z-10 rounded-2xl shadow-2xl"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DreamSysHero;
