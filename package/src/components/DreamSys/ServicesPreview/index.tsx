"use client";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import content from "@/data/content.json";
import { useHasMounted } from "@/hooks/useHasMounted";

const ServicesPreview = () => {
  const { servicesPreview } = content.home;
  const hasMounted = useHasMounted();

  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    orange: "from-orange-500 to-orange-600"
  };

  return (
    <section className="py-20 bg-gray-50">
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
          className="text-center mb-12"
        >
          <h2 className="md:text-40 text-28 font-bold text-midnight_text mb-4">
            {servicesPreview.title}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {servicesPreview.services.map((service, index) => (
            <motion.div
              key={index}
              {...(hasMounted
                ? {
                    initial: { opacity: 0, y: 30 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true },
                    transition: { duration: 0.5, delay: index * 0.15 }
                  }
                : {}
              )}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${colorClasses[service.color as keyof typeof colorClasses]} rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                <Icon
                  icon={service.icon}
                  className="text-white"
                  width="32"
                  height="32"
                />
              </div>
              <h3 className="text-22 font-bold text-midnight_text mb-4">
                {service.title}
              </h3>
              <p className="text-16 text-muted leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...(hasMounted
            ? {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { duration: 0.6 }
              }
            : {}
          )}
          className="text-center mt-12"
        >
          <Link
            href={servicesPreview.ctaButton.url}
            className="inline-flex items-center gap-2 bg-primary text-white py-4 px-8 rounded-lg hover:bg-blue-700 transition-all font-semibold text-17 shadow-lg"
          >
            {servicesPreview.ctaButton.text}
            <Icon icon="solar:alt-arrow-right-linear" width="20" height="20" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPreview;
