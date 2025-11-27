"use client";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import content from "@/data/content.json";
import { useHasMounted } from "@/hooks/useHasMounted";

const AboutStory = () => {
  const { intro, story, philosophy, founder } = content.about;
  const hasMounted = useHasMounted();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="md:text-50 text-35 font-bold text-midnight_text mb-6">
            {intro.title}
          </h1>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            {...(hasMounted
              ? {
                  initial: { opacity: 0, x: -30 },
                  whileInView: { opacity: 1, x: 0 },
                  viewport: { once: true },
                  transition: { duration: 0.6 }
                }
              : {}
            )}
          >
            <h2 className="text-35 font-bold text-midnight_text mb-6">
              {story.title}
            </h2>
            <div className="space-y-4 text-18 text-muted leading-relaxed">
              {story.paragraphs.map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>

          <motion.div
            {...(hasMounted
              ? {
                  initial: { opacity: 0, x: 30 },
                  whileInView: { opacity: 1, x: 0 },
                  viewport: { once: true },
                  transition: { duration: 0.6 }
                }
              : {}
            )}
            className="relative"
          >
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/hero/about.jpg"
                alt="DreamSys Technologies Team"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>

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
          className="mb-16"
        >
          <h3 className="text-35 font-bold text-midnight_text mb-12 text-center">
            {philosophy.title}
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {philosophy.items.map((item, index) => (
              <motion.div
                key={index}
                {...(hasMounted
                  ? {
                      initial: { opacity: 0, y: 20 },
                      whileInView: { opacity: 1, y: 0 },
                      viewport: { once: true },
                      transition: { duration: 0.5, delay: index * 0.15 }
                    }
                  : {}
                )}
                className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border border-blue-200 text-center"
              >
                <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Icon
                    icon={item.icon}
                    className="text-white"
                    width="32"
                    height="32"
                  />
                </div>
                <h4 className="text-22 font-bold text-midnight_text mb-4">
                  {item.title}
                </h4>
                <p className="text-16 text-muted">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

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
          className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-3xl p-12 text-center shadow-2xl"
        >
          <div className="max-w-2xl mx-auto">
            <div className="w-24 h-24 rounded-full mx-auto mb-6 overflow-hidden border-4 border-white border-opacity-30 shadow-xl">
              <Image
                src="/images/search/profile.png"
                alt="Founder"
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="text-28 font-bold text-white mb-4">
              {founder.title}
            </h3>
            <p className="text-19 text-white text-opacity-90 italic leading-relaxed">
              "{founder.quote}"
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutStory;
