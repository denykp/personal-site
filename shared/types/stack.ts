export interface Stack {
  name: string;
  url: string;
  logo?: File | string;
  color?: string;
  highlight?: boolean;
}

export interface StackData extends Omit<Stack, "logo"> {
  id: string;
  logo: string;
}
