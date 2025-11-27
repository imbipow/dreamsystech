import HeroSub from "@/components/SharedComponents/HeroSub";
import PackagesSection from "@/components/DreamSys/Packages";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | DreamSys Technologies",
  description: "Choose from our digital growth packages designed to help your business succeed online. No lock-in contracts.",
};

const Services = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/services", text: "Services" },
  ];
  return (
    <>
      <HeroSub
        title="Our Services"
        description="Simple plans designed to grow your business. Choose the package that fits your needs."
        breadcrumbLinks={breadcrumbLinks}
      />
      <PackagesSection />
    </>
  );
};

export default Services;
