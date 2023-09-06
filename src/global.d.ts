declare global {
  interface Paginated<T> {
    count: number;
    previous: string | null;
    next: string | null;
    results: Array<T>;
  }

  type ModifyType<T, R> = Omit<T, keyof R> & R;

  interface UserInfo {
    id: number;
    name: string;
    email: string;
    created: string;
    modified: string;
    is_active: boolean;
  }
}

export {};
