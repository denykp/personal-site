export interface Portfolio {
  name: string;
  images: string[];
  description?: string;
  url: string;
  stacks: string[];
}

export const listPortfolio: Portfolio[] = [
  {
    name: "AHM Loyalty Management System",
    images: [
      "/images/bni/18.1 LEADS.png",
      "/images/bni/18.5 LEADS Pop up (Add Leads - Details) - Filled.png",
      "/images/bni/18.7 LEADS Pop up (Add Leads - Color theme) - Filled.png",
      "/images/bni/Banner.png",
      "/images/bni/Cards 2.png",
      "/images/bni/Cards.png",
      "/images/bni/Cards-1.png",
      "/images/bni/Default - Banner.png",
      "/images/bni/Default - Cards.png",
      "/images/bni/Default - Cards-1.png",
      "/images/bni/Default - Cards-2.png",
      "/images/bni/Default - Form.png",
      "/images/bni/Default - Leads.png",
      "/images/bni/Edit Lead.png",
      "/images/bni/Form.png",
      "/images/bni/Leads.png",
    ],
    description:
      "This web application is used for managing loyalty programs for all AHM dealers across Indonesia. Including vouchers, points, and other promotions that can be adjusted for certain dealers or for all dealers. It also has reporting system to view customers interest to the promotions. I work on the frontend side using Next.js.",
    url: "https://www.astra.com",
    stacks: ["Vue", "Nuxt", "Tailwind CSS", "TypeScript"],
  },
  {
    name: "Trakindo Digital Document Center",
    images: [
      "/images/trakindo/Screenshot 2025-06-19 181136.png",
      "/images/trakindo/Screenshot 2025-05-06 055600.png",
      "/images/trakindo/Screenshot 2025-05-06 055949.png",
      "/images/trakindo/Screenshot 2025-06-19 181216.png",
    ],
    description:
      " It is an internal webapp used by this company to digitalize their documents and simplify their inter-branch document signature. In this webapp, users can upload and sign documents assigned to them and download them after the signature process is completed. I work on the frontend side using Nuxt.js.",
    url: "#",
    stacks: ["Vue", "Nuxt", "Tailwind CSS", "TypeScript"],
  },
  {
    name: "BNI Credit Card",
    images: [
      "/images/bni/18.1 LEADS.png",
      "/images/bni/18.5 LEADS Pop up (Add Leads - Details) - Filled.png",
      "/images/bni/18.7 LEADS Pop up (Add Leads - Color theme) - Filled.png",
      "/images/bni/Banner.png",
      "/images/bni/Cards 2.png",
      "/images/bni/Cards.png",
      "/images/bni/Cards-1.png",
      "/images/bni/Default - Banner.png",
      "/images/bni/Default - Cards.png",
      "/images/bni/Default - Cards-1.png",
      "/images/bni/Default - Cards-2.png",
      "/images/bni/Default - Form.png",
      "/images/bni/Default - Leads.png",
      "/images/bni/Edit Lead.png",
      "/images/bni/Form.png",
      "/images/bni/Leads.png",
    ],
    description:
      "This web application is used by customers or prospective customers of Bank BNI who want to apply for a credit card online. This application has a landing and dashboard side, both of which are still in 1 source code using Nuxt.js",
    url: "https://www.astra.com",
    stacks: ["Vue", "Nuxt", "Tailwind CSS", "TypeScript"],
  },
  {
    name: "Mortgage",
    images: [
      "/images/mortgage/Admin Page - Checker Pop Up Detail (Direct Marketing).png",
      "/images/mortgage/Admin Page - Checker Pop Up Detail (Others Category).png",
      "/images/mortgage/Admin Page - Detail pengajuan.png",
      "/images/mortgage/Admin Page - Direct Marketing Edit.png",
      "/images/mortgage/Admin Page - Maker Approval.png",
      "/images/mortgage/Admin Page - Maker Pop Up Detail.png",
      "/images/mortgage/Admin Page - Others POJK TnC Edit.png",
      "/images/mortgage/Admin Page - POJK 7.png",
      "/images/mortgage/Form Cetak-1.png",
      "/images/mortgage/S&K - Alt.1.png",
      "/images/mortgage/Admin Page - Checker Approval.png",
    ],
    description:
      "This webapp is used by customers or prospective customers of CIMB Niaga who want to apply for home financing online, and also for CIMB Niaga officer to check applicants data. This application has a landing and dashboard side, which are still in 1 source code using Nuxt.js",
    url: "https://www.astra.com",
    stacks: ["Vue", "Nuxt", "Tailwind CSS", "TypeScript"],
  },
];
