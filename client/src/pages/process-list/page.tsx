import { useFilters } from "./model/use-filters";
import { useList } from "./model/use-list";
import { Card } from "./ui/card";
import { CreateForm } from "./ui/create-form";
import { Filters } from "./ui/filters";
import { Root } from "./ui/root";

export function Page() {
  const list = useList();
  const [filteredList, filters] = useFilters(list.items);

  return (
    <Root
      isLoading={list.isLoading}
      createForm={<CreateForm onSubmit={list.create} />}
      filters={<Filters q={filters.q} onQChange={filters.setQ} />}
      cards={filteredList.map((item) => (
        <Card
          key={item.id}
          id={item.id}
          name={item.name}
          onDelete={item.onDelete}
        />
      ))}
    />
  );
}
