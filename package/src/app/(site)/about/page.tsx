import HeroSub from "@/components/SharedComponents/HeroSub";
import AboutStory from "@/components/DreamSys/AboutStory";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | DreamSys Technologies",
  description: "We bridge the gap between hard work and digital success. Your local digital partner in Truganina, Melbourne.",
};

const About = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/about", text: "About Us" },
  ];
  return (
    <>
      <HeroSub
        title="About DreamSys"
        description="Your trusted digital partner helping local businesses succeed online."
        breadcrumbLinks={breadcrumbLinks}
      />
      <AboutStory />
    </>
  );
};

export default About;
