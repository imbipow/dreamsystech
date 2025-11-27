"use client";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import content from "@/data/content.json";
import { useHasMounted } from "@/hooks/useHasMounted";

const ContactFAQ = () => {
  const hasMounted = useHasMounted();
  const { intro, details, faq } = content.contact;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="md:text-40 text-28 font-bold text-midnight_text mb-4">
            {intro.title}
          </h2>
          <p className="text-19 text-muted max-w-3xl mx-auto">
            {intro.subtitle}
          </p>
        </motion.div>

        {/* Contact Details */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {details.map((detail, index) => (
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
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border border-blue-200 text-center"
            >
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Icon
                  icon={detail.icon}
                  className="text-white"
                  width="32"
                  height="32"
                />
              </div>
              <h3 className="text-20 font-bold text-midnight_text mb-3">
                {detail.title}
              </h3>
              {detail.link ? (
                <a
                  href={detail.link}
                  className="text-16 text-primary hover:text-blue-700 font-medium"
                >
                  {detail.content}
                </a>
              ) : (
                <p className="text-16 text-midnight_text font-medium">
                  {detail.content}
                </p>
              )}
              {detail.subContent && (
                <p className="text-14 text-muted mt-2">
                  {detail.subContent}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
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
        >
          <h3 className="text-35 font-bold text-midnight_text mb-10 text-center">
            {faq.title}
          </h3>

          <div className="max-w-4xl mx-auto space-y-6">
            {faq.items.map((item, index) => (
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
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon
                      icon="mdi:help-circle"
                      className="text-primary"
                      width="20"
                      height="20"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-18 font-bold text-midnight_text mb-2">
                      Q: {item.question}
                    </h4>
                    <p className="text-16 text-muted">
                      A: {item.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactFAQ;
