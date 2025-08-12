export interface Portfolio {
  name: string;
  images?: FileList | string[];
  description: string;
  url: string;
  stacks: string[];
  project_type: string;
}

export interface PortfolioData extends Omit<Portfolio, "images"> {
  id: string;
  images: string[];
}
