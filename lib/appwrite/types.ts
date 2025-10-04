export type CreateUserParams = {
  email: string;
  password: string;
  name: string;
};

export type SignInParams = {
  email: string;
  password: string;
};

export type GetMenuParams = {
  category: string;
  query: string;
};
