import ContactForm from "@/components/Contact/Form";
import ContactFAQ from "@/components/DreamSys/ContactFAQ";
import React from "react";
import HeroSub from "@/components/SharedComponents/HeroSub";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | DreamSys Technologies",
  description: "Get in touch with DreamSys Technologies. Whether you have a quick question or want a full strategy session, we are here to help.",
};

const page = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/contact", text: "Contact" },
  ];
  return (
    <>
      <HeroSub
        title="Contact Us"
        description="Let's discuss how we can help grow your business online. We're based in Truganina, Victoria and service all of Australia."
        breadcrumbLinks={breadcrumbLinks}
      />
      <ContactFAQ />
      <ContactForm />
    </>
  );
};

export default page;
