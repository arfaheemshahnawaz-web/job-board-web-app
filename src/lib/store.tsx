export type Role = "jobseeker" | "employer";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  company?: string;
  title?: string;
}

const users: User[] = [
  {
    id: 1,
    name: "Alex",
    email: "alex@email.com",
    password: "123456",
    role: "jobseeker",
  },
  {
    id: 2,
    name: "Jane",
    email: "jane@company.com",
    password: "123456",
    role: "employer",
  },
];

export function validateCredentials(
  email: string,
  password: string
): User | null {
  return (
    users.find(
      (user) =>
        user.email === email &&
        user.password === password
    ) ?? null
  );
}

export function setSession(user: User): void {
  localStorage.setItem("user", JSON.stringify(user));
}

export function createAccount(
  user: Omit<User, "id">
): User {
  const newUser: User = {
    id: Date.now(),
    ...user,
  };

  users.push(newUser);
  return newUser;
}