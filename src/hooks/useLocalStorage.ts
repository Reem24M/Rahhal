import { useEffect, useState } from "react";

export function useLocalStorage(initialState: string, key: string) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [key, value],
  );
  return [value, setValue];
}
