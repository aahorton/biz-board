import { useDeferredValue, useState } from "react";

export function useFilters(
  items: {
    id: string;
    name: string;
    onDelete?: () => void;
  }[]
) {
  const [q, setQ] = useState("");
  const defferedQ = useDeferredValue(q);

  const filteredList = items.filter((item) =>
    item.name.toLowerCase().includes(defferedQ.toLowerCase())
  );

  return [
    filteredList,
    {
      q,
      setQ,
    },
  ] as const;
}
