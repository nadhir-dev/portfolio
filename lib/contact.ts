export type ContactState = {
  success: boolean;
  message: string;
  errors?: Partial<Record<"name" | "email" | "message", string>>;
};

export const initialContactState: ContactState = {
  success: false,
  message: "",
};
