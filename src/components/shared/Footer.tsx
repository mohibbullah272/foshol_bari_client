import React from "react";
import Logo from "../Logo";


interface Footer7Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

const defaultSections = [
  {
    title: "Quick Links",
    links: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Projects", href: "/projects" },
      { name: "Contact", href: "/contact" },
     
    ],
  },

  {
    title: "Contact",
    links: [
      { name: "25/7/1 Zigatola  Dhaka Bangladesh", href: "/" },
      { name: "০১৯১২-৯৫৩২১৮", href: "/" },
      { name: "fosholbariagro@gmail.com", href: "/" },
    ],
  },
];





const Footer = async({

  sections = defaultSections,
  description = "আপনার বিনিয়োগে গড়ে উঠুক আগামী দিনের ফসল",

  copyright = "© 2025 ফসল বাড়ি All rights reserved.",
 
}: Footer7Props) => {

  return (
    <section className="py-32">
      <div className="px-10">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            {/* Logo */}
            <div className="flex items-center gap-2 lg:justify-start">
         <Logo></Logo>
              <h2 className="text-xl font-semibold">ফসল বাড়ি</h2>
            </div>
            <p className="text-muted-foreground max-w-[70%] text-sm">
              {description}
            </p>
 
          </div>
          <div className="grid w-full gap-6 md:grid-cols-3 lg:gap-20">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="text-muted-foreground space-y-3 text-sm">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="hover:text-primary font-medium"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="text-muted-foreground mt-8  flex flex-col justify-between items-center text-center  gap-4 border-t py-8 text-xs font-medium md:flex-row md:items-center md:justify-center md:text-left">
          <p className="order-2 lg:order-1 ">{copyright}</p>
   
        </div>
      </div>
    </section>
  );
};

export { Footer };
