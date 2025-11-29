import PageHeader from "@/components/SharedComponents/PageHeader";
import PackagesSection from "@/components/DreamSys/Packages";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | DreamSys Technologies",
  description: "Choose from our digital growth packages designed to help your business succeed online. No lock-in contracts.",
};

const Services = () => {
  return (
    <>
      <PageHeader
        title="Digital Growth Packages"
        description="Simple, transparent plans designed to grow your business. Choose the package that fits your needs. No lock-in contracts, just results."
        gradient="green"
      />
      <PackagesSection />
    </>
  );
};

export default Services;
