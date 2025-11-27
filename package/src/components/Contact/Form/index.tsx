"use client";
import React, { useState } from "react";
import Image from "next/image";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    specialist: "",
    date: "",
    time: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          specialist: formData.specialist,
          date: formData.date,
          time: formData.time,
          _subject: "New Consultation Request from DreamSys Website",
          _template: "table"
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            specialist: "",
            date: "",
            time: ""
          });
        }, 5000);
      } else {
        alert("Failed to submit form. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Failed to submit form. Please try again.");
    }
  };

  return (
    <section className="pb-24 bg-white">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
        <div className="grid md:grid-cols-12 grid-cols-1 gap-8">
          <div className="col-span-6">
            <h2 className="max-w-72 text-40 font-bold mb-9">
              Get Online Consultation
            </h2>

            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                <div className="text-green-600 text-50 mb-4">✓</div>
                <h3 className="text-24 font-bold text-green-800 mb-2">
                  Thank You!
                </h3>
                <p className="text-16 text-green-700">
                  Your consultation request has been submitted successfully. We'll get back to you soon!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-wrap w-full m-auto justify-between">
                <div className="sm:flex gap-3 w-full">
                  <div className="mx-0 my-2.5 flex-1">
                    <label
                      htmlFor="firstName"
                      className="pb-3 inline-block text-17"
                    >
                      First Name*
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full text-17 px-4 rounded-lg py-2.5 border-border border-solid border transition-all duration-500 focus:border-primary focus:border-solid focus:outline-0"
                      type="text"
                    />
                  </div>
                  <div className="mx-0 my-2.5 flex-1">
                    <label
                      htmlFor="lastName"
                      className="pb-3 inline-block text-17"
                    >
                      Last Name*
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full text-17 px-4 py-2.5 rounded-lg border-border border-solid border transition-all duration-500 focus:border-primary focus:border-solid focus:outline-0"
                      type="text"
                    />
                  </div>
                </div>
                <div className="sm:flex gap-3 w-full">
                  <div className="mx-0 my-2.5 flex-1">
                    <label
                      htmlFor="email"
                      className="pb-3 inline-block text-17"
                    >
                      Email address*
                    </label>
                    <input
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      type="email"
                      className="w-full text-17 px-4 py-2.5 rounded-lg border-border border-solid border transition-all duration-500 focus:border-primary focus:border-solid focus:outline-0"
                    />
                  </div>
                  <div className="mx-0 my-2.5 flex-1">
                    <label
                      htmlFor="specialist"
                      className="pb-3 inline-block text-17"
                    >
                      Service*
                    </label>
                    <select
                      id="specialist"
                      name="specialist"
                      value={formData.specialist}
                      onChange={handleChange}
                      required
                      className="w-full text-17 px-4 py-2.5 rounded-lg border-border border-solid border transition-all duration-500 focus:border-primary focus:border-solid focus:outline-0"
                    >
                      <option value="">Choose a service</option>
                      <option value="SEO Optimization">SEO Optimization</option>
                      <option value="Google Ads">Google Ads</option>
                      <option value="Social Media Marketing">Social Media Marketing</option>
                      <option value="Web Development">Web Development</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>
                </div>
                <div className="sm:flex gap-3 w-full">
                  <div className="mx-0 my-2.5 flex-1">
                    <label htmlFor="date" className="pb-3 inline-block text-17">
                      Preferred Date*
                    </label>
                    <input
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="w-full text-17 px-4 rounded-lg py-2.5 outline-hidden border-border border-solid border transition-all duration-500 focus:border-primary focus:border-solid focus:outline-0"
                      type="date"
                    />
                  </div>
                  <div className="mx-0 my-2.5 flex-1">
                    <label htmlFor="time" className="pb-3 inline-block text-17">
                      Preferred Time*
                    </label>
                    <input
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="w-full text-17 px-4 rounded-lg py-2.5 border-border outline-hidden border-solid border transition-all duration-500 focus:border-primary focus:border-solid focus:outline-0"
                      type="time"
                    />
                  </div>
                </div>
                <div className="mx-0 my-2.5 w-full">
                  <button
                    type="submit"
                    className="bg-primary rounded-lg text-white py-4 px-8 mt-4 inline-block hover:bg-blue-700 transition-all"
                  >
                    Make an appointment
                  </button>
                </div>
              </form>
            )}
          </div>
          <div className="col-span-6">
            <Image
              src="/images/contact-page/contact-us.png"
              alt="Contact"
              width={1300}
              height={0}
              quality={100}
              style={{ width: "100%", height: "auto" }}
              className="bg-no-repeat bg-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
