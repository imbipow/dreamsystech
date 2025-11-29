"use client";
import React, { FC } from "react";
import { motion } from "motion/react";
import { useHasMounted } from "@/hooks/useHasMounted";

interface PageHeaderProps {
  title: string;
  description: string;
  gradient?: "blue" | "orange" | "green";
}

const PageHeader: FC<PageHeaderProps> = ({
  title,
  description,
  gradient = "blue"
}) => {
  const hasMounted = useHasMounted();

  const gradientClasses = {
    blue: "from-blue-900 via-blue-800 to-blue-900",
    orange: "from-orange-600 via-orange-500 to-orange-600",
    green: "from-green-600 via-green-500 to-green-600"
  };

  return (
    <section className={`relative pt-44 pb-24 bg-gradient-to-br ${gradientClasses[gradient]} overflow-hidden`}>
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            {...(hasMounted
              ? {
                  initial: { opacity: 0, y: 30 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.6 }
                }
              : {}
            )}
            className="md:text-60 sm:text-50 text-40 text-white mb-6 font-bold leading-tight"
          >
            {title}
          </motion.h1>

          <motion.p
            {...(hasMounted
              ? {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.6, delay: 0.2 }
                }
              : {}
            )}
            className="text-20 text-white text-opacity-90 leading-relaxed"
          >
            {description}
          </motion.p>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 80C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
};

export default PageHeader;
