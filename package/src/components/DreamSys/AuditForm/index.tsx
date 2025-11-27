"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import content from "@/data/content.json";
import { useHasMounted } from "@/hooks/useHasMounted";

const AuditForm = () => {
  const hasMounted = useHasMounted();
  const { hero, form, benefits } = content.audit;

  const [formData, setFormData] = useState({
    firstName: "",
    businessName: "",
    websiteUrl: "",
    email: "",
    phone: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Send email via FormSubmit.co
    const formSubmitEmail = process.env.NEXT_PUBLIC_FORM_EMAIL || "your-email@example.com";

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${formSubmitEmail}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.firstName,
          businessName: formData.businessName,
          websiteUrl: formData.websiteUrl,
          email: formData.email,
          phone: formData.phone,
          _subject: "New Audit Request from DreamSys Website",
          _template: "table"
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert("Failed to submit form. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Failed to submit form. Please try again.");
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="md:text-50 text-35 font-bold text-midnight_text mb-6">
            {hero.title}
          </h1>
          <p className="text-20 text-muted max-w-3xl mx-auto">
            {hero.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Form Section */}
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
            className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-200"
          >
            {!isSubmitted ? (
              <>
                <h3 className="text-28 font-bold text-midnight_text mb-6">
                  {form.title}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {form.fields.map((field) => (
                    <div key={field.id}>
                      <label htmlFor={field.id} className="block text-16 font-medium text-midnight_text mb-2">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </label>
                      <input
                        type={field.type}
                        id={field.id}
                        name={field.id}
                        value={formData[field.id as keyof typeof formData]}
                        onChange={handleChange}
                        required={field.required}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 bg-orange-500 text-white py-4 px-8 rounded-lg border-2 border-orange-500 hover:bg-orange-600 transition-all font-bold text-17 shadow-lg"
                  >
                    <Icon icon="mdi:video-check" width="24" height="24" />
                    {form.submitButton}
                    <Icon icon="solar:alt-arrow-right-linear" width="20" height="20" />
                  </button>

                  <p className="text-13 text-center text-muted">
                    {form.disclaimer}
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon icon="mdi:check-circle" className="text-green-600" width="48" height="48" />
                </div>
                <h3 className="text-28 font-bold text-midnight_text mb-4">
                  {form.successTitle}
                </h3>
                <p className="text-18 text-muted">
                  {form.successMessage}
                </p>
              </div>
            )}
          </motion.div>

          {/* Benefits Section */}
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
          >
            <h3 className="text-28 font-bold text-midnight_text mb-8">
              {benefits.title}
            </h3>

            <div className="space-y-6">
              {benefits.items.map((benefit, index) => (
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
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon
                        icon={benefit.icon}
                        className="text-white"
                        width="24"
                        height="24"
                      />
                    </div>
                    <div>
                      <h4 className="text-20 font-bold text-midnight_text mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-16 text-muted">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-start gap-3">
                <Icon icon="mdi:information" className="text-primary flex-shrink-0 mt-1" width="24" height="24" />
                <p className="text-16 text-midnight_text">
                  {benefits.note}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AuditForm;
