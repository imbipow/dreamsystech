import ContactForm from "@/components/Contact/Form";
import ContactFAQ from "@/components/DreamSys/ContactFAQ";
import React from "react";
import PageHeader from "@/components/SharedComponents/PageHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | DreamSys Technologies",
  description: "Get in touch with DreamSys Technologies. Whether you have a quick question or want a full strategy session, we are here to help.",
};

const page = () => {
  return (
    <>
      <PageHeader
        title="Let's Grow Your Business Together"
        description="Get in touch with our team. Whether you have a quick question or want a full digital strategy session, we're here to help. Based in Truganina, servicing all of Australia."
        gradient="orange"
      />
      <ContactFAQ />
      <ContactForm />
    </>
  );
};

export default page;
