type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

type UserT = {
  username: string;
  name: string;
  passwordHash: string;
  blogs: Blogs[];
};

type User = Optional<UserT, "blogs" | "passwordHash">;

export { User };
