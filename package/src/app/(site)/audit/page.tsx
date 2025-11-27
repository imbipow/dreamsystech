import AuditForm from "@/components/DreamSys/AuditForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Digital Health Check | DreamSys Technologies",
  description: "Get a free, personalized video analysis of your website and Google presence. See exactly what's holding your business back online.",
};

const Audit = () => {
  return (
    <>
      <div className="pt-24"></div>
      <AuditForm />
    </>
  );
};

export default Audit;
