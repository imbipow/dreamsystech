import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { footerLinks } from "@/app/api/data";
import content from "@/data/content.json";

const Footer = () => {
  const { site, footer } = content;

  return (
    <footer className="pt-8 mt-14 bg-midnight_text relative after:content-[''] after:absolute after:bg-[url('/images/footer/bgline.png')] after:bg-no-repeat after:w-52 after:h-24 after:right-0 after:top-28 xl:after:block after:hidden">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-2">
        <div className="flex lg:items-center justify-between lg:flex-row flex-col border-b border-dark_border pb-14 mb-16 ">
          <div className="flex sm:flex-nowrap flex-wrap gap-6">
            <div className="flex items-center text-foottext text-16">
              <Icon icon="weui:location-outlined" className="w-7 h-7 mr-3" />
              <div className="flex flex-col">
                <span>{site.location}</span>
                <span>{site.serviceArea}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-foottext">
              <Icon icon="majesticons:phone-retro-line" className="w-7 h-7" />
              <Link href={`tel:${site.phone}`} className="text-16 hover:text-primary">
                <span>{site.phone}</span>
              </Link>
            </div>
            <div className="flex items-center text-foottext gap-2">
              <Icon icon="clarity:email-line" className="w-7 h-7" />
              <Link
                href={`mailto:${site.email}`}
                className="inline-flex items-center text-16 hover:text-primary"
              >
                <span>{site.email}</span>
              </Link>
            </div>
          </div>
          <div className="flex gap-4 mt-4 lg:mt-0">
            {footer.social.map((social, index) => (
              <Link key={index} href={social.url} className="text-muted hover:text-primary">
                <Icon icon={social.icon} width="32" height="32" />
              </Link>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-12 sm:mb-16 mb-8 pt-8 gap-4 relative before:content-[''] before:absolute before:w-20 before:h-20 before:bg-[url('/images/footer/bgcir.png')] before:bg-no-repeat before:-left-36 before:bottom-9 lg:before:block before:hidden">
          <div className="md:col-span-3 col-span-6 mb-4 md:mb-0">
            <h4 className="text-18 text-white dark:text-white mb-3">
              Services
            </h4>
            <ul>
              {footer.services.map((service, index) => (
                <li key={index} className="pb-3">
                  <Link href={service.url} className="text-foottext text-16 hover:text-primary">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 col-span-6 mb-4 md:mb-0">
            <h4 className="text-18 text-white dark:text-white mb-3">
              Quick Links
            </h4>
            <ul>
              {footer.quickLinks.map((link, index) => (
                <li key={index} className="pb-3">
                  <Link href={link.url} className="text-foottext text-16 hover:text-primary">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-6 col-span-12">
            <h4 className="text-18 text-white font-bold mb-3">{footer.about.title}</h4>
            <p className="text-foottext text-16 leading-relaxed mb-6">
              {footer.about.description}
            </p>
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-all font-semibold text-16"
            >
              Get Free Audit
              <Icon icon="solar:alt-arrow-right-linear" width="20" height="20" />
            </Link>
          </div>
        </div>
        <div className="flex items-center sm:flex-row flex-col justify-between py-10 mt-8">
          <p className="text-16 text-foottext sm:mb-0 mb-4">
            {footer.copyright}
          </p>
          <div className="flex gap-4">
            {footer.legal.map((item, index) => (
              <Link key={index} href={item.url} className="text-foottext hover:text-primary">
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
