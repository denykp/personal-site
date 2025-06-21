export interface Portfolio {
  name: string;
  images: string[];
  description?: string;
  url: string;
  stacks: string[];
  project_type: "company" | "independent";
}

export const listPortfolio: Portfolio[] = [
  {
    name: "AHM Loyalty Management System",
    images: [
      "/images/ahm/Screenshot 2025-06-21 082854.png",
      "/images/ahm/Screenshot 2025-06-21 082937.png",
      "/images/ahm/Screenshot 2025-06-21 082619.png",
      "/images/ahm/Screenshot 2025-06-21 082725.png",
    ],
    description:
      "This web application is used for managing loyalty programs for all AHM dealers across Indonesia. Including vouchers, points, and other promotions that can be adjusted for certain dealers or for all dealers. It also has reporting system to view customers interest to the promotions. I work on the frontend side using Next.js.",
    url: "",
    stacks: [
      "React",
      "Next",
      "Material UI",
      "TypeScript",
      "Axios",
      "Tanstack Query",
      "Tanstack Table",
      "React Hook Form",
    ],
    project_type: "company",
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
    url: "",
    stacks: [
      "Vue",
      "Nuxt",
      "JavaScript",
      "Axios",
      "Vuetify",
      "Vuex",
      "Vuelidate",
    ],
    project_type: "company",
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
    url: "https://applycreditcard.bni.co.id",
    stacks: [
      "Vue",
      "Nuxt",
      "Tailwind CSS",
      "TypeScript",
      "Axios",
      "Vuex",
      "Pinia",
      "Vee-Validate",
    ],
    project_type: "company",
  },
  {
    name: "CIMB Niaga Mortgage",
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
    url: "https://apply.cimbniaga.co.id/kpr/form",
    stacks: ["Vue", "Nuxt", "JavaScript", "Axios", "Vuex", "Vuelidate"],
    project_type: "company",
  },
  {
    name: "Grocery Planning App",
    images: [],
    description:
      "This web application helps you create grocery shopping lists effortlessly. Start by inputting menus and their ingredients as master data. Then, plan your meals, such as for the next few days, by assigning menus to each specific day. The app will automatically generate a comprehensive list of needed ingredients, ensuring you don’t overlook anything during your grocery shopping. It also has a PWA feature, so you can install it on your phone to make it easier for you to access the app. This app was developed using Nuxt 3 as the frontend, ExpressJS as the backend, and MySQL as the database.",
    url: "",
    stacks: [
      "Vue",
      "Nuxt",
      "TypeScript",
      "Express.js",
      "MySQL",
      "Vee-Validate",
    ],
    project_type: "independent",
  },
  {
    name: "Ayodya Dashboard Reporting",
    images: [],
    description:
      "This is an extension of the existing Ayodya program, specifically designed to generate reports. Developed as a full-stack solution with Nuxt 3, it integrates seamlessly with the existing SQL Server database.",
    url: "",
    stacks: ["Vue", "Nuxt", "TypeScript", "MS SQL Server"],
    project_type: "independent",
  },
  {
    name: "Iziklaim",
    images: [],
    description:
      "It is a product to simplify the process of claiming insurance. Integrating data from hospitals and insurance digitally so the patients or their families do not have to bring papers back and forth between the hospital and insurance for the claiming process. We have a feature to read the data from the scanned insurance form and insert it into the database, so the insurance agent does not need to insert it manually.",
    url: "",
    stacks: ["Vue", "JavaScript", "Axios", "Vuex", "Vuexy", "Vee-Validate"],
    project_type: "company",
  },
  {
    name: "Bayarind Single Dashboard",
    images: [],
    description:
      "It is a product mainly used for internal purposes. It is used to do disbursement or reconciliation with the merchant that using our payment gateway. Merchant also has access to the site to check their reconciliation data to make sure they pay the right amount or in case they want to request an adjustment if they think the data do not seem right.",
    url: "",
    stacks: ["Vue", "TypeScript", "Axios", "Vuex", "Vee-Validate"],
    project_type: "company",
  },
  {
    name: "Bayarind Company Profile",
    images: [],
    description:
      " It is a company profile site that is used to give information to merchants if they want to know about our payment gateway service or anyone who might need it. It provides information about our product and fee, job vacancies, the latest news about stuff related to the payment gateway, and many more.",
    url: "",
    stacks: ["Vue", "Nuxt", "JavaScript", "Axios"],
    project_type: "company",
  },
  {
    name: "Retail and Inventory",
    images: [],
    description:
      "It is a product used in many stores to manage their sales and inventory. It provides several reports, including sales, inventory, and accounting, to give them insight into their store income and expenses.",
    url: "",
    stacks: ["VB6", "MS SQL Server", "Crystal Report"],
    project_type: "company",
  },
  {
    name: "Paper Factory Manufacture",
    images: [],
    description:
      "It is a product to help maintain the factory to keep track of their manufacturing process and sales of their product. It also helps maintain their inventory control so they can manage their product stock better.",
    url: "",
    stacks: ["VB6", "MS SQL Server", "Crystal Report"],
    project_type: "company",
  },
  {
    name: "Electrical Contractor",
    images: [],
    description:
      "It is a product to record projects requested by their client and keep track of the progress. It also has an accounting and inventory management system to help control their expense and the products or tools that are being used in certain projects by technicians.",
    url: "",
    stacks: ["VB6", "MS SQL Server", "Crystal Report"],
    project_type: "company",
  },
  {
    name: "HM Sampoerna-Modist Project",
    images: [],
    description:
      "It is a web app system that is used to record feedback data from buyers when a sales transaction occurs by sales who visit a location, such as cafes, restaurants, tourist attractions, and so on.",
    url: "",
    stacks: ["Angular", "JavaScript"],
    project_type: "company",
  },
  {
    name: "Kosmetikatama Super Indah (Inez Cosmetics)- Purchasing",
    images: [],
    description:
      "Added a tracking feature to find out the progress of purchasing raw materials. Starting from purchase requests, purchase orders, and purchasing, to receiving.",
    url: "",
    stacks: ["VB.Net", "MS SQL Server"],
    project_type: "company",
  },
  {
    name: "Kosmetikatama Super Indah (Inez Cosmetics)- Order dan Sales",
    images: [],
    description:
      "Developing a web service to receive and store data on orders and sales made by Beauty Advisors (BA) in various store locations. The system also records stock data and provides reports on transactions conducted by BAs",
    url: "",
    stacks: ["VB.Net", "MS SQL Server"],
    project_type: "company",
  },
  {
    name: "Mobile Attendance System",
    images: [],
    description:
      "It is a presence system that can be used on android devices. Attendance is done by taking selfies and saving the coordinates of the user's location which are then sent to the web service. To check the photo and the coordinates of the presence is done using a web application. This system was developed with Android Java for the user interface, Nest.js framework for the backend, PostgreSQL for the database, and React.js for the reporting system.",
    url: "",
    stacks: ["Android", "Java", "React", "Nest", "PostgreSQL"],
    project_type: "company",
  },
];
