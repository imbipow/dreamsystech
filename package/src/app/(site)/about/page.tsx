import PageHeader from "@/components/SharedComponents/PageHeader";
import AboutStory from "@/components/DreamSys/AboutStory";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | DreamSys Technologies",
  description: "We bridge the gap between hard work and digital success. Your local digital partner in Truganina, Melbourne.",
};

const About = () => {
  return (
    <>
      <PageHeader
        title="About DreamSys Technologies"
        description="Your trusted digital partner helping local businesses transform hard work into online success. Based in Truganina, serving all of Australia."
        gradient="blue"
      />
      <AboutStory />
    </>
  );
};

export default About;
