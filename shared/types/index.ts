export * from "./stack";
export * from "./portfolio";

export interface Menu {
  name: string;
  label: string;
}

export interface UserData {
  name: string;
  username: string;
}

export type FormMode = "add" | "edit" | null;

export interface LoginData {
  username: string;
  password: string;
}
