import { useDeferredValue, useMemo, useState } from "react";

export function useFilters(
  items: {
    id: string;
    name: string;
    onDelete?: () => void;
  }[]
) {
  const [q, setQ] = useState("");
  const defferedQ = useDeferredValue(q);

  const filteredList = useMemo(
    () =>
      items.filter((item) =>
        item.name.toLowerCase().includes(defferedQ.toLowerCase())
      ),
    [items, q]
  );

  return [
    filteredList,
    {
      q,
      setQ,
    },
  ] as const;
}
