import { ChangeEvent, useState } from "react";

export function useTextInput(defaultValue = "") {
  const [value, set] = useState(defaultValue);

  function onChange(e: ChangeEvent<HTMLInputElement>): void {
    set(e.target.value);
  }

  return {
    value,
    set,
    bind: {
      value,
      onChange,
    },
  };
}
