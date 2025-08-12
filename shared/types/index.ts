export * from "./stack";
export * from "./portfolio";

export interface Menu {
  name: string;
  label: string;
}

export interface User {
  name: string;
  username: string;
  password: string;
}

export type FormMode = "add" | "edit" | null;
