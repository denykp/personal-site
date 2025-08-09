export interface Stack {
  name: string;
  url: string;
  logo?: File;
  color?: string;
}

export interface StackData extends Omit<Stack, "logo"> {
  id: string;
  logo: string;
}
