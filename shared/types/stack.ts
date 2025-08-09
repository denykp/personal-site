export interface Stack {
  name: string;
  url: string;
  logo?: File | string;
  color?: string;
}

export interface StackData extends Stack {
  id: string;
}
