export interface Portfolio {
  name: string;
  description: string;
  url?: string;
  images?: File[] | string[];
  stacks: string[];
  project_type: string;
  role: string;
  highlight?: boolean;
}

export interface PortfolioData extends Omit<Portfolio, "images" | "stacks"> {
  id: string;
  images: string[];
  stacks: StackData[];
}
