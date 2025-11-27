"use client";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import content from "@/data/content.json";
import { useHasMounted } from "@/hooks/useHasMounted";

const PackagesSection = () => {
  const hasMounted = useHasMounted();
  const { intro, packages } = content.services;

  const getButtonColorClasses = (color: string) => {
    switch (color) {
      case "green":
        return "bg-green-600 border-green-600 hover:bg-green-700";
      case "orange":
        return "bg-orange-600 border-orange-600 hover:bg-orange-700";
      default:
        return "bg-primary border-primary hover:bg-blue-700";
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="md:text-50 text-35 font-bold text-midnight_text mb-4">
            {intro.title}
          </h1>
          <p className="text-20 text-muted">
            {intro.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {packages.map((pkg, index) => (
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
              className={`bg-white rounded-2xl p-8 shadow-xl border-2 ${
                pkg.popular
                  ? "border-green-500 relative transform lg:scale-105"
                  : "border-gray-200"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-500 text-white px-6 py-2 rounded-full text-14 font-bold shadow-lg">
                    RECOMMENDED
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <p className="text-13 text-muted uppercase tracking-widest font-semibold mb-2">
                  {pkg.name}
                </p>
                <h3 className="text-24 font-bold text-midnight_text mb-4">
                  {pkg.title}
                </h3>
                <div className="flex items-end justify-center mb-3">
                  <span className="text-48 font-bold text-primary">
                    {pkg.price}
                  </span>
                  <span className="text-18 text-muted ml-2 mb-2">
                    {pkg.period}
                  </span>
                </div>
                <p className="text-14 text-muted italic">
                  Best For: {pkg.bestFor}
                </p>
              </div>

              <div className="border-t border-gray-200 pt-6 mb-6">
                <ul className="space-y-4">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Icon
                        icon="mdi:check-circle"
                        className="text-green-500 flex-shrink-0 mt-0.5"
                        width="20"
                        height="20"
                      />
                      <span className="text-16 text-midnight_text">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/audit"
                className={`w-full flex items-center justify-center gap-2 text-white py-4 px-6 rounded-lg border-2 transition-all font-semibold text-17 shadow-lg ${getButtonColorClasses(pkg.buttonColor)}`}
              >
                {pkg.buttonText}
                <Icon icon="solar:alt-arrow-right-linear" width="20" height="20" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
