import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

export const remove_nulls = <T extends object>(item: T): Partial<T> => {
  const newObject: Partial<T> = {};
  for (const key in item) {
    if (item.hasOwnProperty(key) && item[key] !== null) {
      newObject[key] = item[key];
    }
  }
  return newObject;
};

export const useSearchParams = () => {
  let [search, setSearch] = useState<string | null>(null);
  return { search, setSearch };
};

export const help_mutate = useMutation({
  mutationFn: (fn: Function) => fn(),
});
