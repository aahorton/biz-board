import { useDeferredValue, useMemo, useState } from "react";

export function useFilters<T extends { name: string }>(items: T[]) {
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
