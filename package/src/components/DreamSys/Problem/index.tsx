"use client";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import content from "@/data/content.json";
import { useHasMounted } from "@/hooks/useHasMounted";

const ProblemSection = () => {
  const { problem } = content.home;
  const hasMounted = useHasMounted();

  return (
    <section className="py-20 bg-white">
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
          <h2 className="md:text-40 text-28 font-bold text-midnight_text mb-6">
            {problem.title}
          </h2>
          <p className="text-19 text-muted max-w-3xl mx-auto mb-8">
            {problem.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {problem.problems.map((problemText, index) => (
            <motion.div
              key={index}
              {...(hasMounted
                ? {
                    initial: { opacity: 0, y: 20 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true },
                    transition: { duration: 0.5, delay: index * 0.1 }
                  }
                : {}
              )}
              className="bg-orange-50 p-6 rounded-xl border-2 border-orange-200"
            >
              <div className="flex items-start gap-4">
                <Icon
                  icon="mdi:alert-circle-outline"
                  className="text-orange-600 flex-shrink-0 mt-1"
                  width="28"
                  height="28"
                />
                <p className="text-16 text-midnight_text font-medium">
                  {problemText}
                </p>
              </div>
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
          className="bg-gradient-to-r from-orange-50 to-amber-50 p-8 rounded-2xl border border-orange-200 mb-8"
        >
          <h3 className="text-24 font-bold text-midnight_text mb-4 flex items-center gap-2">
            <Icon icon="mdi:lightbulb-on-outline" className="text-orange-600" width="28" height="28" />
            {problem.reality.title}
          </h3>
          <p className="text-18 text-midnight_text mb-6">
            {problem.reality.text}
          </p>
        </motion.div>

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
          className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-200"
        >
          <h3 className="text-24 font-bold text-midnight_text mb-4 flex items-center gap-2">
            <Icon icon="mdi:rocket-launch-outline" className="text-green-600" width="28" height="28" />
            {problem.solution.title}
          </h3>
          <p className="text-18 text-midnight_text">
            {problem.solution.text} <span className="font-bold text-primary">{problem.solution.highlight}</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
